import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
@ApiTags('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  createMessage(@Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(dto);
  }

  @Post(':id')
  updateIsReading(@Param() id: string) {
    return this.messagesService.updateIsReading(+id);
  }

  @Get(':id')
  getMessages(@Param() params: { id: string }) {
    return this.messagesService.getMessages(+params.id);
  }

  @Delete(':id')
  removeMessage(@Param('id') id: string) {
    return this.messagesService.removeMessage(+id);
  }
}
