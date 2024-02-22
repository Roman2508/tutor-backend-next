import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservedLessonDto {
  @ApiProperty()
  theme: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  status: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  startAt: Date;
}
