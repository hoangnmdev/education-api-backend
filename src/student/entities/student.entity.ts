/* istanbul ignore file */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity('students')
export class Student {
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

  @Column({ name: 'is_suspended', type: 'tinyint', default: false })
  isSuspended: boolean;

  @ManyToMany(() => Teacher, (teacher) => teacher.students)
  teachers: Teacher[];
}
