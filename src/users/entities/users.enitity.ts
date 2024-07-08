import {
  Column,
  CreatedAt,
  DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ underscored: true })
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false })
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
