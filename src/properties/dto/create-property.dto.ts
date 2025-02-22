import { IsString, IsNumber } from "class-validator";

export class CreatePropertyDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price_per_night: number;

    @IsString()
    location: string;

    @IsNumber()
    hostId: number;
}