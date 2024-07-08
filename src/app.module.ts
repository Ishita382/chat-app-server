import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { applicationConfig } from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ChatGateway } from './chat/chat.gateway';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: applicationConfig.db.dialect,
      host: applicationConfig.db.host,
      username: applicationConfig.db.username,
      password: applicationConfig.db.password,
      database: applicationConfig.db.database,
      port: parseInt(applicationConfig.db.port, 10),
      logging: false,
      autoLoadModels: true,
      synchronize: true,
      ...(['qa', 'prod', 'staging'].includes(applicationConfig.app.env)
        ? {
            dialectOptions: {
              ssl: {
                rejectUnauthorized: false,
                sslmode: 'no-verify',
              },
            },
          }
        : {}),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
