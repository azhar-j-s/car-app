import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/car.entity';
import { RolesGuard } from 'src/config/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
