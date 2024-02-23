import { Injectable } from '@nestjs/common';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DialogEntity } from './entities/dialog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DialogsService {
  constructor(
    @InjectRepository(DialogEntity)
    private repository: Repository<DialogEntity>,
  ) {}

  create(dto: CreateDialogDto) {
    const dialog = this.repository.create({
      tutor: { id: dto.tutor },
      student: { id: dto.student },
    });

    return this.repository.save(dialog);
  }

  findAll() {
    return `This action returns all dialogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dialog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dialog`;
  }
}
