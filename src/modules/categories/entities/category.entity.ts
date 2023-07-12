import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Car } from 'src/modules/cars/entities/car.entity';

@Table({
  tableName: 'categories',
})
export class Category extends Model<Category> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty()
  id: string;

  @Column
  @ApiProperty()
  name: string;

  @HasMany(() => Car)
  car: Car[];
}
