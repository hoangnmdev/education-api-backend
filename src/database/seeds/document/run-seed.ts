/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { TeacherSeedService } from './teacher/teacher-seed.service';
import { StudentSeedService } from './student/student-seed.service';

import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  const teacherSeedService = app.get(TeacherSeedService);
  const studentSeedService = app.get(StudentSeedService);

  await teacherSeedService.run();
  await studentSeedService.run();

  await app.close();
};

void runSeed();
