import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('tutors')
@ApiTags('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  findByEmail(@Body() email: string) {
    return this.tutorsService.findByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tutorsService.findById(+id);
  }

  @Post()
  create(@Body() dto: AuthDto) {
    return this.tutorsService.create(dto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
  //   return this.tutorsService.update(+id, updateTutorDto);
  // }
}
