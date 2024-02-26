import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { TutorEntity } from './entities/tutor.entity';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(TutorEntity)
    private repository: Repository<TutorEntity>,
  ) {}

  async create(dto: AuthDto) {
    const salt = await genSalt(10);

    const newUser = this.repository.create({
      password: await hash(dto.password, salt),
      userRole: dto.userRole as 'tutor',
      email: dto.email,
      name: dto.name,
    });

    const user = await this.repository.save(newUser);

    const { password: pass, ...result } = user;

    return result;
  }

  async findById(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) new NotFoundException();
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOneBy({ email });
    if (!user) new NotFoundException();
    return user;
  }

  // update(id: number, updateTutorDto: UpdateTutorDto) {
  //   return `This action updates a #${id} tutor`;
  // }
}
