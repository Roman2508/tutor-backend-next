import { Injectable } from '@nestjs/common';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservedLessonEntity } from './entities/reserved-lesson.entity';
import { Repository } from 'typeorm';
import { FilterReservedLessonDto } from './dto/filter-reserved-lessons.dto';

@Injectable()
export class ReservedLessonsService {
  constructor(
    @InjectRepository(ReservedLessonEntity)
    private repository: Repository<ReservedLessonEntity>,
  ) {}

  create(dto: CreateReservedLessonDto) {
    const lesson = this.repository.create({
      ...dto,
      tutor: { id: dto.tutor },
      student: { id: dto.student },
    });

    const createMeetUrl = () => {
      return 'https://meet.google.com/';
    };

    return this.repository.save({ ...lesson, meetUrl: createMeetUrl() });
  }

  findAll(dto: FilterReservedLessonDto) {
    const lesson = this.repository.find({
      where: {
        name: dto.name,
        tutor: { id: dto.tutor },
        student: { id: dto.student },
      },
      order: { name: 'asc' },
    });

    return `This action returns all reservedLessons`;
    /* 
    return {
      totalItems: total,
      items: languages,
      page,
      size
    };
    */
  }

  findOne(id: number) {
    return `This action returns a #${id} reservedLesson`;
  }

  update(id: number, dto: UpdateReservedLessonDto) {
    return `This action updates a #${id} reservedLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservedLesson`;
  }
}
