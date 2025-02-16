import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePropertyDto} from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
    constructor(
        @InjectRepository(Property) private propertyRepository: Repository<Property>,
    ){}

    async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
        const property = this.propertyRepository.create(createPropertyDto);
        return await this.propertyRepository.save(property)
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
