import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private repository: Repository<LessonEntity>,
  ) {}

  create(dto: CreateLessonDto) {
    const lesson = this.repository.create({ ...dto, tutor: { id: dto.tutor } });
    return this.repository.save(lesson);
  }

  findAll(id: number) {
    return this.repository.find({
      where: {
        tutor: { id: id },
      },
      relations: { tutor: true },
      select: {
        tutor: {
          id: true,
          name: true,
        },
      },
    });
  }

  async update(id: number, dto: UpdateLessonDto) {
    const lesson = await this.repository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException('Урок не знайдено');
    }

    return this.repository.save({
      ...lesson,
      ...dto,
    });
  }

  async remove(id: number) {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Групу не знайдено');
    }

    return id;
  }
}
