import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthLeads } from './entities/auth-lead.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { applicationConfig } from 'config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([AuthLeads]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: applicationConfig.jwt.secret,
      signOptions: {
        expiresIn: applicationConfig.jwt.expiresIn,
        issuer: applicationConfig.jwt.issuer,
        algorithm: applicationConfig.jwt.algorithm,
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
