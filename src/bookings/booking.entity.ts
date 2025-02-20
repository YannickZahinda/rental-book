import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Property } from "src/properties/property.entity";
import { User } from "src/users/user.entity";

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property, { onDelete: 'CASCADE' })
  property: Property;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  renter: User;

  @Column({ type: 'date'})
  check_in: Date = new Date();

  @Column({ type: 'date' })
  check_out: Date;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'canceled'], default: 'pending' })
  status: 'pending' | 'confirmed' | 'canceled';
}
