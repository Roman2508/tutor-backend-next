import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StudentEntity } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private repository: Repository<StudentEntity>,
  ) {}

  findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async create(dto: AuthDto) {
    const salt = await genSalt(10);

    const newUser = this.repository.create({
      password: await hash(dto.password, salt),
      userRole: dto.userRole as 'student',
      email: dto.email,
      name: dto.name,
    });

    const user = await this.repository.save(newUser);

    const { password: pass, ...result } = user;

    return result;
  }
}
