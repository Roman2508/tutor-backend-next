import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('student')
@ApiTags('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findByEmail(@Body() email: string) {
    return this.studentService.findByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.studentService.findById(+id);
  }

  @Post()
  create(@Body() dto: AuthDto) {
    return this.studentService.create(dto);
  }
}
