import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TutorsModule } from './tutors/tutors.module';
import { TutorEntity } from './tutors/entities/tutor.entity';
import { StudentModule } from './student/student.module';
import { FilesModule } from './files/files.module';
import { StudentEntity } from './student/entities/student.entity';
import { FileEntity } from './files/entities/file.entity';
import { LessonsModule } from './lessons/lessons.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LessonEntity } from './lessons/entities/lesson.entity';
import { ReviewsEntity } from './reviews/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'tai.db.elephantsql.com',
      port: 5432,
      username: 'rsmvjyrs',
      password: 'GVoDIuAEKabWtvvM_qB365yDOI_XiN8H',
      database: 'rsmvjyrs',
      entities: [
        TutorEntity,
        StudentEntity,
        FileEntity,
        LessonEntity,
        ReviewsEntity,
      ],
      synchronize: true,
    }),
    /* TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
    }), */
    TutorsModule,
    StudentModule,
    FilesModule,
    LessonsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
