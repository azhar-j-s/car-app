import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Role } from 'src/config/enums/role.enum';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
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

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ unique: false })
  @ApiProperty()
  password: string;

  @Column({
    allowNull: true,
    type: DataType.ARRAY(DataType.ENUM(...Object.values(Role))),
  })
  @ApiProperty()
  @IsOptional()
  roles: Role[];
}
