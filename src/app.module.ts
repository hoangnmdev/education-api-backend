/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TeacherStudentModule } from './teachers/teachers.module';
import { SeedModule } from './database/seeds/document/seed.module';

@Module({
  imports: [TeacherStudentModule, SeedModule],
})
export class AppModule {}
