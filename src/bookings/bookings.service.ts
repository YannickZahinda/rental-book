import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { User } from 'src/users/user.entity';
import { Property } from 'src/properties/property.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { renterId, propertyId, check_in, check_out } = createBookingDto;
    const renter = await this.userRepo.findOne({ where: { id: renterId } });
    const property = await this.propertyRepo.findOne({
      where: { id: propertyId },
    });

    if (!renter) {
      throw new NotFoundException('Renter not found');
    }
    if (renter.role !== 'renter') {
      throw new ForbiddenException('Only Renters can book properties');
    }

    if (!property) {
      throw new NotFoundException('No property was found');
    }

    if (check_in >= check_out) {
      throw new BadRequestException(
        'Check-in date must be before check-out date',
      );
    }

    const existingBooking = await this.bookingRepository.findOne({
      where: {
        property: { id: propertyId },
        check_in: check_in,
        check_out: check_out,
      },
    });

    if (existingBooking) {
      throw new BadRequestException(
        'Property already booked for the selected dates',
      );
    }

    const booking = this.bookingRepository.create({
      renter,
      property,
      check_in: check_in,
      check_out: check_out,
      status: 'pending',
    });

    return await this.bookingRepository.save(booking);
  }

  async findOne(id: number): Promise<Booking | null> {
    return await this.bookingRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      relations: ['property', 'renter']
    });
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
      relations: ['property', 'renter']
    });
  }
}
