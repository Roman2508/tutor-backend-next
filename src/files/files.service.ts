const fs = require('fs');
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

  async create(file: Express.Multer.File, headers: any, lessonId: number) {
    const token = headers.authorization.replace('Bearer ', '');
    const userData = this.authService.decodeToken(token);

    const item = await this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      lesson: { id: lessonId },
      user: { id: userData.id },
      authorRole: userData.userRole,
    });

    return this.repository.findOne({
      where: { id: item.id },
      select: {
        id: true,
        originalName: true,
        authorRole: true,
        createdAt: true,
        filename: true,
        mimetype: true,
        size: true,
      },
    });
  }

  findAll(lessonId: number) {
    return this.repository.findOneBy({ lesson: { id: lessonId } });
  }

  async remove(filename: string, id: number) {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Файл не знайдено');
    }

    await fs.promises.unlink(`uploads/${filename}`);

    return { id, filename };
  }
}
