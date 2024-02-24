import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReservedLessonsService } from './reserved-lessons.service';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';
import { FilterReservedLessonDto } from './dto/filter-reserved-lessons.dto';

@Controller('reserved-lessons')
@ApiTags('reserved-lessons')
export class ReservedLessonsController {
  constructor(
    private readonly reservedLessonsService: ReservedLessonsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateReservedLessonDto) {
    return this.reservedLessonsService.create(dto);
  }

  @Post('/get')
  findAll(@Body() dto: FilterReservedLessonDto) {
    return this.reservedLessonsService.findAll(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedLessonsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReservedLessonDto) {
    return this.reservedLessonsService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedLessonsService.remove(+id);
  }
}
