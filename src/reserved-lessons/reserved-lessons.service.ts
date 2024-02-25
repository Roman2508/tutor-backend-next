// import fs from 'fs/promises';
const path = require('path');
const fs = require('fs').promises;
import { google } from 'googleapis';
import { InjectRepository } from '@nestjs/typeorm';
import { authenticate } from '@google-cloud/local-auth';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';

import Meeting from './google-meet-api';
import { ReservedLessonEntity } from './entities/reserved-lesson.entity';
import { CreateReservedLessonDto } from './dto/create-reserved-lesson.dto';
import { UpdateReservedLessonDto } from './dto/update-reserved-lesson.dto';
import { FilterReservedLessonDto } from './dto/filter-reserved-lessons.dto';

const TOKEN_PATH = path.join(process.cwd(), 'src/reserved-lessons/token.json');
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  'src/reserved-lessons/client_secret.json',
);
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/meetings.space.created',
];

@Injectable()
export class ReservedLessonsService {
  constructor(
    @InjectRepository(ReservedLessonEntity)
    private repository: Repository<ReservedLessonEntity>,
  ) {}

  async loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const string = content.toString();
      const credentials = JSON.parse(string);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      // console.error('Помилка завантаження збережених облікових даних:', err);
      return null;
    }
  }

  async saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  async authorize() {
    let client: any = await this.loadSavedCredentialsIfExist();

    if (client) {
      return client;
    }

    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });

    if (client.credentials) {
      await this.saveCredentials(client);
    }
    return client;
  }

  async create(dto: CreateReservedLessonDto) {
    //   const lesson = this.repository.create({
    //     ...dto,
    //     tutor: { id: dto.tutor },
    //     student: { id: dto.student },
    //   });
    const auth = await this.authorize();

    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
      summary: 'Google I/O 2024',
      location: '800 Howard St., San Francisco, CA 94103',
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: '2024-02-25T09:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      conferenceData: {
        createWithGoogleMeet: true,
      },
      end: {
        dateTime: '2024-02-25T17:00:00-08:00',
        timeZone: 'America/Los_Angeles',
      },
      recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
      attendees: [
        { email: 'roma.250899@gmail.com' },
        // { email: 'sbrin@example.com' },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    // const result = await calendar.events.insert(
    //   {
    //     auth: auth,
    //     calendarId: 'primary',
    //     // @ts-ignore
    //     resource: event,
    //   },
    //   function (err, event) {
    //     if (err) {
    //       console.log(
    //         'There was an error contacting the Calendar service: ' + err,
    //       );
    //       return;
    //     }
    //     console.log('Event created: %s', event);
    //   },
    // );

    // Отримання посилання на Google Meet
    // @ts-ignore
    // const meetLink = result?.data.conferenceData.conferenceSolution.uri;

    // console.log(meetLink);

    const a = await calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      // conferenceDataVersion: 1,
      requestBody: {
        conferenceData: {
          // summary: '1',
          // description: '3',
          // location: 'America/Los_Angeles',
          // colorId: '7',
          // start: {
          //   datetime: new Date(),
          // },
          // end: {
          //   datetime: new Date(),
          // },
          // conferenceId: 'hangoutsMeet',

          createRequest: {
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    });

    console.log(a);

    // Meeting({
    //   clientId:
    //     '568916016031-1uff602tt5u2ppbmqunonbb8n1i0lkfg.apps.googleusercontent.com',
    //   clientSecret: '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', // 'XXXXxxeh2mrCZ',
    //   refreshToken: '', // 'XXXXXXXXXCNfW2MMGvJUSk4V7LplXAXXXX',
    //   date: '2024-02-24',
    //   time: '20:00',
    //   summary: 'summary',
    //   location: 'location',
    //   description: 'description',
    // }).then(function (result) {
    //   console.log(result); // result is the final link
    // });

    return true;

    // return this.repository.save({ ...lesson, meetUrl: 'createMeetUrl()' });
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
