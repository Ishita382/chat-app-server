import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthLeads } from './entities/auth-lead.entity';

@Module({
  imports: [SequelizeModule.forFeature([AuthLeads]), UsersModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class AuthModule {}
