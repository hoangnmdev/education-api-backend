/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TeacherStudentModule } from './teachers/teachers.module';
import { SeedModule } from './database/seeds/document/seed.module';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TeacherStudentModule,
    SeedModule,
  ],
})
export class AppModule {}
