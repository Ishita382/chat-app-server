import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private activeUsers = new Map<string, string>();

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.activeUsers.delete(client.id);
    this.server.emit('activeUsers', Array.from(this.activeUsers.values()));
  }

  @SubscribeMessage('register')
  async handleRegister(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.usersService.findOne({ id: userId });
    if (user) {
      this.activeUsers.set(client.id, user.name);
      this.server.emit('activeUsers', Array.from(this.activeUsers.values()));
    }
    // this.activeUsers.set(client.id, username);
    // console.log(this.activeUsers, 'active users');
    // this.server.emit('activeUsers', Array.from(this.activeUsers.values()));
  }

  @SubscribeMessage('privateMessage')
  async handlePrivateMessage(
    @MessageBody() message: { to: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const fromUser = Array.from(this.activeUsers.entries()).find(
      ([id]) => id === client.id,
    )?.[0];
    const toUser = Array.from(this.activeUsers.entries()).find(
      ([id]) => id === message.to,
    )?.[0];

    if (fromUser && toUser) {
      const sender = await this.usersService.findOne({ id: fromUser });
      const recipient = await this.usersService.findOne({ id: toUser });
      await this.chatService.create({
        content: message.content,
        recipientId: recipient?.id,
        senderId: sender?.id,
      });
      const toSocketId = Array.from(this.activeUsers.entries()).find(
        ([id]) => id === message.to,
      )?.[0];
      if (toSocketId) {
        this.server.to(toSocketId).emit('privateMessage', {
          from: fromUser,
          content: message.content,
        });
      }
    }
    // const fromUser = this.activeUsers.get(client.id);
    // const toSocketId = Array.from(this.activeUsers.entries()).find(
    //   ([, username]) => username === message.to,
    // )?.[0];
    // if (toSocketId) {
    //   this.server.to(toSocketId).emit('privateMessage', {
    //     from: fromUser,
    //     content: message.content,
    //   });
    // }
  }
}
