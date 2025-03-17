// teacher-seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../../../teachers/entities/teacher.entity';

@Injectable()
export class TeacherSeedService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async run() {
    const teachers = [
      { email: 'teacherken@gmail.com', isSuspended: false },
      { email: 'teacherjoe@gmail.com', isSuspended: false },
    ];

    for (const teacherData of teachers) {
      const teacherExists = await this.teacherRepository.findOne({
        where: { email: teacherData.email },
      });
      if (!teacherExists) {
        const teacher = this.teacherRepository.create(teacherData);
        await this.teacherRepository.save(teacher);
      }
    }
  }
}
