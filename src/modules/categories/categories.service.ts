import { Car } from 'src/modules/cars/entities/car.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { Repository } from 'sequelize-typescript';
import { log } from 'util';
import { CommonPaginationQueryRequestDto } from 'src/config/dto/common-pagination-query.request.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }

  async findAll(filters: CommonPaginationQueryRequestDto) {
    return await this.categoryRepository.findAndCountAll({
      order: [['name', 'ASC']],
      limit: filters.limit ? (filters.limit == -1 ? null : filters.limit) : 10,
      offset: filters.offset ?? 0,
      include: {
        model: Car,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const res = await this.categoryRepository.update(updateCategoryDto, {
      where: {
        id,
      },
    });
    return res[0]
      ? { message: 'updated successfully' }
      : { message: 'Failed to update record' };
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
