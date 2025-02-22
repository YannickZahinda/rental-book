import { IsNumber } from "class-validator";

export class CreateBookingDto {
    @IsNumber()
    propertyId: number;

    @IsNumber()
    renterId: number

    check_in: Date;
    check_out: Date;
}