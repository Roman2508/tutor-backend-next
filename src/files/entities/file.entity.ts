import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => LessonEntity, (lesson) => lesson.files)
  lesson: LessonEntity;

  @Column()
  type: string;

  @ManyToOne(() => TutorEntity || StudentEntity)
  author: TutorEntity | StudentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
