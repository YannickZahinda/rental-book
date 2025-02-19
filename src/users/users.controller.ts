import { Controller, Post, Body, Get, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtModule } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get('me')
    @UseGuards(JwtModule)
    getProfile(@Req() req) {
        return req.user;
    }

    @Post('/create')
    create(@Body() body: CreateUserDto){
        return this.usersService.create(body)
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findOne(id)
    }

    @Patch('id')
    updateRole(@Param('id') id: number, @Body() role: {role: 'renter' | 'host'}){
        return this.usersService.updateRole(id, role.role);
    }
}
