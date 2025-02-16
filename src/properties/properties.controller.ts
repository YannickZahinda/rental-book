import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, Req } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('properties')
export class PropertiesController {
    constructor(private readonly propertiesService: PropertiesService){}

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    create(@Req() req, @Body() createPropertyDto: CreatePropertyDto) {
        if(req.user.role !== 'host') {
            throw new Error('Only hosts can create properties')
        }
        return this.propertiesService.create(createPropertyDto);
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
