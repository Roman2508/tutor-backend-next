import { Get, Post, Body, Param, UseGuards, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { StudentService } from './student.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('student')
@ApiTags('student')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findByEmail(@Body() email: string) {
    return this.studentService.findByEmail(email);
  }

  @Get('/me')
  getMe(@UserId() id: number) {
    return this.studentService.findById(id);
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
