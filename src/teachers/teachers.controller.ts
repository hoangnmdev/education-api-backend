import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { RegisterStudentsRequestDto } from './dto/request/register-student-teacher.dto';
import { SuspendStudentRequestDto } from './dto/request/suspend-student-teacher.dto';
import { GetCommonStudentsResponseDto } from './dto/response/get-common-student-teacher.dto';
import { HttpStatus } from '@nestjs/common';
import { RetrieveNotificationsResponseDto } from './dto/response/retrieve-notification-response.dto';
import { RetrieveNotificationRequestDto } from './dto/request/retrieve-notification-request.dto';

@Controller('/api')
export class TeacherStudentController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudents(
    @Body() registerStudentsDto: RegisterStudentsRequestDto,
  ): Promise<void> {
    await this.teacherService.registerStudents(registerStudentsDto);
  }

  @Get('/commonstudents')
  @HttpCode(HttpStatus.OK)
  async getCommonStudents(
    @Query('teacher', new ParseArrayPipe({ items: String })) teacher: string[],
  ): Promise<GetCommonStudentsResponseDto> {
    return await this.teacherService.getCommonStudents([...teacher]);
  }
  @Post('/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  async suspendStudent(
    @Body() suspendStudentDto: SuspendStudentRequestDto,
  ): Promise<void> {
    await this.teacherService.suspendStudent(suspendStudentDto);
  }

  @Post('/retrievefornotifications')
  @HttpCode(HttpStatus.OK)
  async retrieveNotifications(
    @Body() retrieveNotificationsDto: RetrieveNotificationRequestDto,
  ): Promise<RetrieveNotificationsResponseDto> {
    return await this.teacherService.retrieveNotifications(
      retrieveNotificationsDto,
    );
  }
}
