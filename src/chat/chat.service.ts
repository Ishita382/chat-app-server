import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat)
    private readonly chatModule: typeof Chat,
    private readonly usersService: UsersService,
  ) {}
  // private messages: string[] = [];

  // addMessage(message: string) {
  //   this.messages.push(message);
  // }

  // getMessages() {
  //   return this.messages;
  // }

  async create({
    senderId,
    recipientId,
    content,
  }: {
    senderId?: string;
    recipientId?: string;
    content?: string;
  }) {
    const chat = await this.chatModule.create({
      senderId,
      recipientId,
      content,
    });
    return chat;
  }

  async findOne({ chatId }: { chatId: string }) {
    const chat = await this.chatModule.findOne({
      where: {
        chatId,
      },
    });

    return chat;
  }

  async findAll({
    senderId,
    recipientId,
  }: {
    senderId: string;
    recipientId: string;
  }) {
    const chats = await this.chatModule.findAll({
      where: [
        { sender: { id: senderId }, recipient: { id: recipientId } },
        { sender: { id: recipientId }, recipient: { id: senderId } },
      ],
      // relations: ['sender', 'recipient'],
      order: [['createdAt', 'ASC']],
    });
    return chats;
  }
}
