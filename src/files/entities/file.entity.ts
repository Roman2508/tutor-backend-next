import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { ReservedLessonEntity } from 'src/reserved-lessons/entities/reserved-lesson.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  size: string;

  @Column()
  mimetype: string;

  @ManyToOne(() => ReservedLessonEntity, (lesson) => lesson.files)
  lesson: ReservedLessonEntity;

  @Column()
  authorRole: 'tutor' | 'student';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
