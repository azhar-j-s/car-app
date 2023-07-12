import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Min,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/config/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User name',
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'User Email',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User Password',
    required: true,
  })
  @IsNotEmpty()
  @Min(5)
  password: string;

  @IsOptional()
  @ApiProperty({
    description: 'User role',
    required: false,
  })
  @IsEnum(Role, { each: true })
  roles: Role[];
}
