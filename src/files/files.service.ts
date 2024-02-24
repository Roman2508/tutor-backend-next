import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FileEntity } from './entities/file.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
    private authService: AuthService,
  ) {}

  create(file: Express.Multer.File, headers: any, lessonId: number) {
    const token = headers.authorization.replace('Bearer ', '');
    const userData = this.authService.decodeToken(token);

    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      lesson: { id: lessonId },
      user: { id: userData.id },
      authorRole: userData.userRole,
    });
  }

  findAll(lessonId: number) {
    return this.repository.findOneBy({ lesson: { id: lessonId } });
  }

  async remove(id: number) {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Файл не знайдено');
    }

    return id;
  }
}
