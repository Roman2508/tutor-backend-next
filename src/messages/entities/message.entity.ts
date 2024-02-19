import { Max } from 'class-validator';
import { DialogEntity } from 'src/dialogs/entities/dialog.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Max(300)
  @Column()
  text: string;

  @ManyToOne(() => TutorEntity || StudentEntity)
  sender: TutorEntity | StudentEntity;

  @ManyToOne(() => DialogEntity, (dialog) => dialog.messages)
  dialog: DialogEntity;

  @CreateDateColumn()
  sendAt: Date;
}
