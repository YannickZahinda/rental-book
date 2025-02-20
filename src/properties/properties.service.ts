import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePropertyDto} from './dto/create-property.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class PropertiesService {
    constructor(
        @InjectRepository(Property) private readonly propertyRepository: Repository<Property>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

    async create(propertyDto: CreatePropertyDto, hostId: number): Promise<Property> {
        const host = await this.userRepository.findOne({where: {id: hostId}});

        if(!host) {
            throw new NotFoundException('Host not found');
        }
        if(host.role !== 'host') {
            throw new ForbiddenException('Only host can create properties.');
        }
        const property = this.propertyRepository.create({...propertyDto, host});
        return  this.propertyRepository.save(property);
    }

    async findAll():Promise<Property[]> {
        return await this.propertyRepository.find()
    }

    async findOne(id: number): Promise<Property | null> {
        return await this.propertyRepository.findOne({where: {id}})
    }

    async update(id: number, updateData: Partial<CreatePropertyDto>) {
        await this.propertyRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.propertyRepository.delete(id)
    }
}
