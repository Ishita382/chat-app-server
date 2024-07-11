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

  async findOne({
    id,
    name,
    email,
  }: {
    id?: string;
    name?: string;
    email?: string;
  }) {
    let where = {};
    if (id) {
      where = {
        ...where,
        id: id,
      };
    }

    if (name) {
      where = {
        ...where,
        name: name,
      };
    }

    if (email) {
      where = { ...where, email: email };
    }

    const user = await this.userModel.findOne({
      where,
    });

    return user;
  }
}
