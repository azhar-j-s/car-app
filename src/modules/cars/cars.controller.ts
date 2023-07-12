import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultException } from 'src/config/exceptions/default.exception';
import { Roles } from 'src/config/decorators/roles.decorator';
import { Role } from 'src/config/enums/role.enum';
import { RolesGuard } from 'src/config/guards/roles.guard';

@ApiTags('cars')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 400, type: () => DefaultException })
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({
    description: 'This endpoint will create a car',
  })
  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carsService.create(createCarDto);
  }
  @Get()
  async findAll() {
    return this.carsService.findAll();
  }

  @ApiOperation({
    description: 'This Endpoint will update a car.',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return await this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
