import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { Car } from './entities/car.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    return await this.carRepository.create(createCarDto);
  }

  async findAll() {
    return await this.carRepository.findAll({
      include: { model: Category },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const res = await this.carRepository.update(updateCarDto, {
      where: {
        id,
      },
    });
    return res[0]
      ? { message: 'Updated record succesfully!' }
      : { message: 'Failed to update record!' };
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
