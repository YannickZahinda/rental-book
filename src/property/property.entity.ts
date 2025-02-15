import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  price_per_night: number;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.properties, { onDelete: 'CASCADE' })
  host: User;
}
