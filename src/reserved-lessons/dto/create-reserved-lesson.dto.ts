import { ApiProperty } from '@nestjs/swagger';

export class CreateReservedLessonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  status?: 'planned' | 'conducted';

  @ApiProperty()
  duration: number;

  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  tutor: number;

  @ApiProperty()
  student: number;
}
