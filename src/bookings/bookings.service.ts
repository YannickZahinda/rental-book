import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingRepository.create(createBookingDto);
    return await this.bookingRepository.save(booking);
  }

  async findOne(id: number): Promise<Booking | null> {
    return await this.bookingRepository.findOne({ where: { id } });
  }

  async updateStatus(
    id: number,
    status: 'pending' | 'confirmed' | 'canceled',
  ): Promise<Booking | null> {
    await this.bookingRepository.update(id, { status });
    return this.findOne(id);
  }

  async findByUser(userId: number): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { renter: { id: userId } },
    });
  }
}
