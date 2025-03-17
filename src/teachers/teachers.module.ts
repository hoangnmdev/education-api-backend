/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Student } from 'src/student/entities/student.entity';
import { TeacherService } from './teachers.service';
import { TeacherStudentController } from './teachers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Student])],
  controllers: [TeacherStudentController],
  providers: [TeacherService],
})
export class TeacherStudentModule {}
