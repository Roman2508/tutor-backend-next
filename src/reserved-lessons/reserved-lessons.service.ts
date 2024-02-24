import { google } from 'googleapis';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';

import Meeting from './google-meet-api';
import { ReservedLessonEntity } from './entities/reserved-lesson.entity';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';
import { FilterReservedLessonDto } from './dto/filter-reserved-lessons.dto';

// const { OAuth2 } = google.auth;

// let oAuth2Client = new OAuth2('106796500830865427301');

// const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// //checking whether teacher is budy or not
// let result = await calendar.events.list({
//   calendarId: 'primary',
//   timeMin: end1,
//   timeMax: end2,
//   maxResults: 1,
//   singleEvents: true,
//   orderBy: 'startTime',
// });

@Injectable()
export class ReservedLessonsService {
  constructor(
    @InjectRepository(ReservedLessonEntity)
    private repository: Repository<ReservedLessonEntity>,
  ) {}

  async create(dto: CreateReservedLessonDto) {
    const lesson = this.repository.create({
      ...dto,
      tutor: { id: dto.tutor },
      student: { id: dto.student },
    });

    // Meeting({
    //   clientId: '106796500830865427301.apps.googleusercontent.com',
    //   clientSecret: 'diplom-tutor-app', // 'XXXXxxeh2mrCZ',
    //   refreshToken: '', // 'XXXXXXXXXCNfW2MMGvJUSk4V7LplXAXXXX',
    //   date: '2024-02-24',
    //   time: '20:00',
    //   summary: 'summary',
    //   location: 'location',
    //   description: 'description',
    // }).then(function (result) {
    //   console.log(result); // result is the final link
    // });

    return this.repository.save({ ...lesson, meetUrl: 'createMeetUrl()' });
  }

  async findAll(dto: FilterReservedLessonDto) {
    let options: FindOptionsWhereProperty<ReservedLessonEntity> = {};

    if (dto.name) {
      options = {
        name: ILike(`%${dto.name}%`),
      };
    }

    // [0] = fieldName; [1] = direction ASC or DESC
    const sortDirection = dto.sortBy.split('-');
    const skip = dto.currentPage * dto.pageSize - dto.pageSize;

    const [entities, count] = await this.repository.findAndCount({
      where: {
        ...options,
        tutor: { id: dto.tutor },
        student: { id: dto.student },
      },
      relations: { tutor: true, student: true },
      select: {
        tutor: { id: true, name: true },
        student: { id: true, name: true },
      },
      order: { [sortDirection[0]]: sortDirection[1].toUpperCase() },
      skip: skip,
      take: dto.pageSize,
    });

    return {
      entities,
      totalCount: count,
      page: dto.currentPage,
      size: dto.pageSize,
    };
  }

  // get full lesson
  findOne(id: number) {
    return this.repository.find({
      where: { id },
      relations: { tutor: true, student: true, files: true },
      select: {
        tutor: { id: true, name: true },
        student: { id: true, name: true },
        files: {
          id: true,
          originalName: true,
          authorRole: true,
          filename: true,
          mimetype: true,
          size: true,
        },
      },
    });
  }

  async update(id: number, dto: UpdateReservedLessonDto) {
    const lesson = await this.repository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException('Урок не знайдено');
    }

    return this.repository.save({
      ...lesson,
      ...dto,
    });
  }

  async remove(id: number) {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Урок не знайдено');
    }

    return id;
  }
}
