import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class CommonPaginationQueryRequestDto {
  @ApiProperty({
    description: 'Default limit is 10.',
    required: false,
  })
  limit: number;

  @ApiProperty({
    description: 'Default offset is 0',
    required: false,
  })
  offset: number;

  @ApiProperty({
    description: 'order by the field name, default is createdAt',
    required: false,
  })
  @IsOptional()
  orderBy?: string;

  @ApiProperty({
    description: 'order ASC/DESC, default DESC',
    required: false,
  })
  // @IsEnum(Order)
  // @IsOptional()
  // order?: Order;
  @ApiProperty({
    description: 'Search ',
    required: false,
  })
  search?: string;
}
