import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { ChatController } from './chat.controller';
import { Chat } from './entities/chat.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthLeads } from 'src/auth/entities/auth-lead.entity';
import { User } from 'src/users/entities/users.enitity';

@Module({
  imports: [
    // SequelizeModule.forFeature([AuthLeads]),
    // UsersModule,
    // JwtModule.register({
    //   global: true,
    //   secret: applicationConfig.jwt.secret,
    //   signOptions: {
    //     expiresIn: applicationConfig.jwt.expiresIn,
    //     issuer: applicationConfig.jwt.issuer,
    //     algorithm: applicationConfig.jwt.algorithm,
    //   },
    // }),
    SequelizeModule.forFeature([Chat]),
    SequelizeModule.forFeature([AuthLeads]),
    SequelizeModule.forFeature([User]),
    AuthModule,
  ],
  providers: [
    ChatGateway,
    ChatService,
    AuthService,
    UsersService,

    // AuthService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [ChatController],
  exports: [],
})
export class ChatModule {}
