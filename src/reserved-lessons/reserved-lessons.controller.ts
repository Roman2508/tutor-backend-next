import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservedLessonsService } from './reserved-lessons.service';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';
import { FilterReservedLessonDto } from './dto/filter-reserved-lessons.dto';

@Controller('reserved-lessons')
export class ReservedLessonsController {
  constructor(
    private readonly reservedLessonsService: ReservedLessonsService,
  ) {}

  @Post()
  create(@Body() dto: CreateReservedLessonDto) {
    return this.reservedLessonsService.create(dto);
  }

  @Get('')
  findAll(@Body() dto: FilterReservedLessonDto) {
    return this.reservedLessonsService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedLessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReservedLessonDto) {
    return this.reservedLessonsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedLessonsService.remove(+id);
  }
}
