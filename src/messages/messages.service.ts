import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private repository: Repository<MessageEntity>,
  ) {}
  async createMessage(dto: CreateMessageDto): Promise<MessageEntity> {
    const messsage = this.repository.create({
      sender: { id: dto.sender },
      dialog: { id: dto.dialog },
      userRole: dto.userRole,
      text: dto.text,
    });

    await this.repository.save(messsage);

    return this.repository.findOne({
      where: { id: messsage.id },
      relations: { sender: true, dialog: true },
      select: {
        sender: { id: true, name: true },
        dialog: { id: true },
      },
    });
  }

  async updateIsReading(id: number): Promise<MessageEntity> {
    const messsage = await this.repository.findOne({ where: { id } });

    if (!messsage) new NotFoundException('Повідомлення не знайдено');

    return this.repository.save({ ...messsage, isReaded: true });
  }

  // find messages by dialog id
  async getMessages(id: number): Promise<MessageEntity[]> {
    return await this.repository.find({
      where: { dialog: { id } },
      relations: { sender: true, dialog: true },
      select: {
        sender: { id: true, name: true },
        dialog: { id: true },
      },
      order: { sendAt: 'ASC' },
    });
  }

  removeMessage(id: number): Promise<number> {
    return;
  }
}
