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

    async findByEmail(email: string): Promise <User | null> {
        return await this.userRepository.findOne( {where: {email}})
    }

    async updateRole(id: number, role: 'renter' | 'host'): Promise<User | null> {
        await this.userRepository.update(id, {role});
        return this.findOne(id)
    }

    async saveRefreshToken(userId: number, refreshToken: string) {
        if (!userId){
            throw new Error("User ID is missing. Cannot save refresh token");
        }
        await this.userRepository.update(userId, { refreshToken })
    }
}
