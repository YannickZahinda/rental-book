import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/guards/JwtGuard/jwt.auth.guard';

@Controller('bookings')
export class BookingsController {
    constructor(
        private readonly bookingService: BookingsService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Req() req,@Body() createBookingDto: CreateBookingDto) {
        const user = req.user;

        if(req.user.role !== 'renter') {
            throw new ForbiddenException('Only renters can book properties')
        }
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
