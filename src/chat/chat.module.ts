import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

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
  ],
  providers: [
    ChatGateway,
    ChatService,
    // AuthService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [],
  exports: [],
})
export class ChatModule {}
