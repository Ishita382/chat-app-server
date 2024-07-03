import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthLeads } from './entities/auth-lead.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [SequelizeModule.forFeature([AuthLeads]), UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
