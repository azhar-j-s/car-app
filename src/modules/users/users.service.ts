import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: any): Promise<User> {
    const res = await this.userRepository.create({
      ...user,
    });
    return res;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(args: any): Promise<User> {
    const res = await this.userRepository.findOne<User>({
      where: { ...args },
    });
    return res;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
