import { Property } from "src/properties/property.entity";
import { AfterInsert, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['renter', 'host'], default: 'renter' })
  role: 'renter' | 'host';

  @Column({nullable: true})
  refreshToken?: string;

  @OneToMany(() => Property, (property) => property.host)
  properties: Property[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id)
  }
}
