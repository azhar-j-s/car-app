import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    description: 'car color',
    required: true,
  })
  @IsString()
  color: string;

  @ApiProperty({
    description: 'car model',
    required: true,
  })
  @IsNumber()
  model: number;

  @ApiProperty({
    description: 'car making company',
    required: true,
  })
  @IsString()
  make: string;

  @IsNumber()
  @ApiProperty({
    description: 'registration No',
    required: true,
  })
  registrationNo: string;

  @IsString()
  @ApiProperty({
    description: 'category id',
    required: true,
  })
  categoryId: string;
}
