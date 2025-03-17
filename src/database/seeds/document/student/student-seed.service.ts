import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../../student/entities/student.entity';

@Injectable()
export class StudentSeedService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async run() {
    const students = [
      { email: 'studentjon@gmail.com', isSuspended: false },
      { email: 'studenthon@gmail.com', isSuspended: false },
      { email: 'commonstudent1@gmail.com', isSuspended: false },
      { email: 'commonstudent2@gmail.com', isSuspended: false },
      { email: 'student_only_under_teacher_ken@gmail.com', isSuspended: false },
      { email: 'studentmary@gmail.com', isSuspended: false },
      { email: 'studentbob@gmail.com', isSuspended: false },
      { email: 'studentagnes@gmail.com', isSuspended: false },
      { email: 'studentmiche@gmail.com', isSuspended: false },
    ];

    for (const studentData of students) {
      const studentExists = await this.studentRepository.findOne({
        where: { email: studentData.email },
      });
      if (!studentExists) {
        const student = this.studentRepository.create(studentData);
        await this.studentRepository.save(student);
      }
    }
  }
}
