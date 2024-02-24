import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(userRole: 'tutor' | 'student', id: number) {
    return this.repository.find({
      where: { [userRole]: { id } },
      relations: {
        tutor: true,
        student: true,
      },
      select: {
        tutor: { id: true, name: true },
        student: { id: true, name: true },
      },
    });
  }

  async remove(id: number) {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Діалог не знайдено');
    }

    return id;
  }
}
