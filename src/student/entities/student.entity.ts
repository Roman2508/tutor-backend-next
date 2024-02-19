import { IsEmail, Max, Min } from 'class-validator';
import { ReviewsEntity } from 'src/reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'student' })
  role: 'student';

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

  @Column({ default: '' })
  avatarUrl: string;

  @Column()
  calendar: string;

  @Column()
  messages: string;

  @Column()
  lessons: string;

  @OneToMany(() => ReviewsEntity, (reviews) => reviews.sender)
  reviews: ReviewsEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
