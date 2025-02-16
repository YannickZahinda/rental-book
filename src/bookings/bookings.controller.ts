import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(
        private readonly bookingService: BookingsService
    ){}

    @Post('create')
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.create(createBookingDto)
    }

    @Get(':id') 
    findOne(@Param('id') id: number) {
        return this.bookingService.findOne(id);
    }

    @Patch(':id')
    updateStatus(@Param('id') id: number, @Body() status: { status: 'pending' | 'confirmed' | 'canceled' }) {
        return this.bookingService.updateStatus(id, status.status);
    }

    @Get('user/:userId')
    findByUser(@Param('userId') userId: number) {
        return this.bookingService.findByUser(userId);
    }
}
