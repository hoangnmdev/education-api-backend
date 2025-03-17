/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherSeedService } from './teacher-seed.service';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  providers: [TeacherSeedService],
  exports: [TeacherSeedService],
})
export class TeacherSeedModule {}
