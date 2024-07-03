import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/users.enitity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {}
