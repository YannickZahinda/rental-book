import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async create (createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async findOne(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: {id}})
    }

    async updateRole(id: number, role: 'renter' | 'host'): Promise<User | null> {
        await this.userRepository.update(id, {role});
        return this.findOne(id)
    }
}
