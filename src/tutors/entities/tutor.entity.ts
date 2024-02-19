import { IsEmail, Max, Min } from 'class-validator';
import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { ReviewsEntity } from 'src/reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tutors')
export class TutorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'tutor' })
  role: 'tutor';

  @Max(40)
  @Column()
  name: string;

  @IsEmail()
  @Column()
  email: string;

  @Min(6)
  @Max(30)
  @Column()
  password: string;

  @Column({ default: null })
  avatarUrl: string;

  @Column()
  @Column({ default: '' })
  description: string;

  @Min(0)
  @Max(5)
  @Column({ default: 0 })
  rating: number;

  @OneToMany(() => ReviewsEntity, (reviews) => reviews.recipient)
  reviews: ReviewsEntity[];

  @Column()
  calendar: string;

  // @Column()
  // students: number;

  @Column()
  messages: string;

  @OneToMany(() => LessonEntity, (lesson) => lesson.tutor)
  lessons: LessonEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
