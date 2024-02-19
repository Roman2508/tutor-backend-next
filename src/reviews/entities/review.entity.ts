import { Max, Min } from 'class-validator';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class ReviewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudentEntity, (student) => student.reviews)
  sender: StudentEntity;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.reviews)
  recipient: TutorEntity;

  @Column()
  message: string;

  @Min(0)
  @Max(5)
  @Column()
  rating: number;
}
