import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservedLessonsService } from './reserved-lessons.service';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';

@Controller('reserved-lessons')
export class ReservedLessonsController {
  constructor(private readonly reservedLessonsService: ReservedLessonsService) {}

  @Post()
  create(@Body() createReservedLessonDto: CreateReservedLessonDto) {
    return this.reservedLessonsService.create(createReservedLessonDto);
  }

  @Get()
  findAll() {
    return this.reservedLessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedLessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservedLessonDto: UpdateReservedLessonDto) {
    return this.reservedLessonsService.update(+id, updateReservedLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedLessonsService.remove(+id);
  }
}
