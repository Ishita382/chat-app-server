import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class AuthLeads extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column(DataType.TEXT)
  verificationToken: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
