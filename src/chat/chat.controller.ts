import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class UsersController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  addMessage(
    @Body() body: { senderId: string; recipientId: string; content: string },
  ) {
    const chat = this.chatService.create({
      content: body.content,
      recipientId: body.recipientId,
      senderId: body.senderId,
    });
    console.log(chat, 'created chat');
    return chat;
  }

  @Get('message')
  getMessage(@Body() body: { chatId: string }) {
    const chat = this.chatService.findOne({ chatId: body.chatId });
    console.log(chat, 'get one chat');
  }

  @Get('messages')
  getMessages(@Body() body: { senderId: string; recipientId: string }) {
    const chats = this.chatService.findAll({
      recipientId: body.recipientId,
      senderId: body.senderId,
    });

    console.log(chats, 'get all chats');
    return chats;
  }
}
