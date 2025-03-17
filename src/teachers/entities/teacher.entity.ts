/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @ManyToMany(() => Student, (student) => student.teachers)
  @JoinTable()
  students: Student[];
}
