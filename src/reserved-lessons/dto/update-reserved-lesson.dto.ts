import { PartialType } from '@nestjs/swagger';
import { CreateReservedLessonDto } from './create-reserved-lesson.dto';

export class UpdateReservedLessonDto extends PartialType(CreateReservedLessonDto) {}
