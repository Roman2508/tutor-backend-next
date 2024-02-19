import { Injectable } from '@nestjs/common';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';

@Injectable()
export class ReservedLessonsService {
  create(createReservedLessonDto: CreateReservedLessonDto) {
    return 'This action adds a new reservedLesson';
  }

  findAll() {
    return `This action returns all reservedLessons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservedLesson`;
  }

  update(id: number, updateReservedLessonDto: UpdateReservedLessonDto) {
    return `This action updates a #${id} reservedLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservedLesson`;
  }
}
