import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { TutorsService } from './tutors.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('tutors')
@ApiTags('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  findByEmail(@Body() email: string) {
    return this.tutorsService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/me')
  getMe(@UserId() id: number) {
    return this.tutorsService.findById(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tutorsService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: AuthDto) {
    return this.tutorsService.create(dto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
  //   return this.tutorsService.update(+id, updateTutorDto);
  // }
}
