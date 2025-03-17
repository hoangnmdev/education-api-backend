/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/database/config/database.config';
import { TypeOrmConfigService } from '../../typeorm-config.service';
import { TeacherSeedModule } from './teacher/teacher-seed.module';
import { StudentSeedModule } from './student/student-seed.module';

@Module({
  imports: [
    StudentSeedModule,
    TeacherSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class SeedModule {}
