import { MessageEntity } from 'src/messages/entities/message.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dialogs')
export class DialogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.dialogs)
  tutor: TutorEntity;

  @ManyToOne(() => StudentEntity, (student) => student.dialogs)
  student: StudentEntity;

  @OneToMany(() => MessageEntity, (message) => message.dialog)
  messages: MessageEntity[];
}
