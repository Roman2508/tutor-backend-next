import { ApiProperty } from '@nestjs/swagger';

export class FilterReservedLessonDto {
  //   @ApiProperty()
  //   filter: {
  //     name: string;
  //     student?: number;
  //     tutor?: number;
  //   };

  //   @ApiProperty()
  //   sort: 'popular' | 'price-desc' | 'price-asc' | 'reviews' | 'rating';

  //   @ApiProperty()
  //   search: string;

  //   @ApiProperty()
  //   pagination: {
  //     currentPage: number;
  //     pageSize: number;
  //   };

  @ApiProperty()
  name: string;

  @ApiProperty()
  student?: number;

  @ApiProperty()
  tutor?: number;

  @ApiProperty()
  sortBy: 'popular' | 'price-desc' | 'price-asc' | 'reviews' | 'rating';

  @ApiProperty()
  search: '';

  @ApiProperty({ default: 1 })
  currentPage: number;

  @ApiProperty({ default: 20 })
  pageSize: number;
}
