import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('properties')
export class PropertiesController {
    constructor(private readonly propertiesService: PropertiesService){}

    @Post('create')
    create(@Body() createPropertyDto: CreatePropertyDto) {
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
