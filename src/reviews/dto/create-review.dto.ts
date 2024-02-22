import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  sender: number;

  @ApiProperty()
  recipient: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  rating: number;
}
