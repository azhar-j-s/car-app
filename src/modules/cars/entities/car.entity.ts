import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/modules/categories/entities/category.entity';

@Table({
  tableName: 'cars',
})
export class Car extends Model<Car> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty()
  id: string;

  @Column
  @ApiProperty()
  color: string;

  @Column
  @ApiProperty()
  model: number;

  @Column
  @ApiProperty()
  make: string;

  @Column
  @ApiProperty()
  registrationNo: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;
}
