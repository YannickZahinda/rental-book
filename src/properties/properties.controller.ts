import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/JwtGuard/jwt.auth.guard';

@Controller('properties')
export class PropertiesController {
    constructor(private readonly propertiesService: PropertiesService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Req() req, @Body() createPropertyDto: CreatePropertyDto) {
        const user = req.user;

        console.log("User from Token:", user);
        if(req.user.role !== 'host') {
            throw new ForbiddenException('Only hosts can create properties');
        }
        return this.propertiesService.create(createPropertyDto, user.id);
    }

    @Get()
    findAll() {
        return this.propertiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.propertiesService.findOne(id)
    }

    @Patch(':id') 
    update (@Param('id') id: number, @Body() updatePropertyDto: Partial<CreatePropertyDto>){
        return this.propertiesService.update(id, updatePropertyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.propertiesService.remove(id);
    }
}
