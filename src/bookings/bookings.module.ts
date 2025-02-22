import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { User } from 'src/users/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Property } from 'src/properties/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Property]), AuthModule],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
