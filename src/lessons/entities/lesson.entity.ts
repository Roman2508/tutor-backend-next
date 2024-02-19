import { FileEntity } from 'src/files/entities/file.entity';
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

@Entity('lessons')
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.lessons)
  tutor: TutorEntity;

  // Статус уроку
  @Column({ default: 'planned' })
  status: 'planned' | 'archived' | 'completed';

  // Тривалість уроку в хвилинах
  @Column()
  duration: number;

  // Початок уроку:
  @Column()
  startAt: Date;

  @OneToMany(() => FileEntity, (file) => file.lesson, { onDelete: 'CASCADE' })
  files: FileEntity[];

  @Column()
  meetUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
