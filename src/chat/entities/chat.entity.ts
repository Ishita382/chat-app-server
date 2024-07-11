import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/users.enitity';
import { ManyToOne } from 'typeorm';

@Table
export class Chat extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true, allowNull: false })
  id: number;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  recipient: User;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @CreatedAt
  createdAt: Date;
}
