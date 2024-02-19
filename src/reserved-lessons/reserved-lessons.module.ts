import { Module } from '@nestjs/common';
import { ReservedLessonsService } from './reserved-lessons.service';
import { ReservedLessonsController } from './reserved-lessons.controller';

@Module({
  controllers: [ReservedLessonsController],
  providers: [ReservedLessonsService],
})
export class ReservedLessonsModule {}
