import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/users.enitity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = await this.userModel.create({
      name,
      email,
      password,
    });

    return user;
  }

  async findOne({ email }: { email: string }) {
    const user = await this.userModel.findOne({
      where: { email },
    });

    return user;
  }
}
