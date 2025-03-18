import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { Student } from '../student/entities/student.entity';
import { RegisterStudentsRequestDto } from './dto/request/register-student-teacher.dto';
import { SuspendStudentRequestDto } from './dto/request/suspend-student-teacher.dto';
import { ERROR_MESSAGES } from '../constants';
import { GetCommonStudentsResponseDto } from './dto/response/get-common-student-teacher.dto';
import { RetrieveNotificationsResponseDto } from './dto/response/retrieve-notification-response.dto';
import { RetrieveNotificationRequestDto } from './dto/request/retrieve-notification-request.dto';
import RequestUtils from '../utils/request/index';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  registerStudents = async (
    registerStudentsDto: RegisterStudentsRequestDto,
  ): Promise<void> => {
    const { teacher: teacherEmail, students: studentEmails } =
      registerStudentsDto;

    let teacher = await this.teacherRepository.findOne({
      where: { email: teacherEmail },
      relations: ['students'],
    });

    if (!teacher) {
      teacher = this.teacherRepository.create({
        email: teacherEmail,
        students: [],
      });
    }

    if (teacher.students.some((s) => studentEmails.includes(s.email))) {
      throw new HttpException(
        ERROR_MESSAGES.STUDENT_ALREADY_REGISTERED,
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const email of studentEmails) {
      let student = await this.studentRepository.findOne({ where: { email } });
      if (!student) {
        student = this.studentRepository.create({ email });
        await this.studentRepository.save(student);
      }
      if (!teacher.students.some((s) => s.email === email)) {
        teacher.students.push(student);
      }
    }

    await this.teacherRepository.save(teacher);
  };
  async getCommonStudents(
    teacherEmails: string[],
  ): Promise<GetCommonStudentsResponseDto> {
    const teacher = await this.teacherRepository.find({
      where: { email: In(teacherEmails) },
    });

    const existingTeachers = teacher.map((teacher) => teacher.email);

    const notExistingTeachers = teacherEmails.filter(
      (teacherEmail) => !existingTeachers.includes(teacherEmail),
    );

    if (notExistingTeachers.length) {
      throw new HttpException(
        ERROR_MESSAGES.NO_TEACHER_PROVIDED,
        HttpStatus.NOT_FOUND,
      );
    }

    const students = await this.studentRepository.find({
      relations: ['teachers'],
      where: {
        teachers: {
          email: In(teacherEmails),
        },
      },
    });

    const commonStudents = students.filter(
      (student) =>
        student.teachers.length === teacherEmails.length &&
        student.teachers.every((teacher) =>
          teacherEmails.includes(teacher.email),
        ),
    );

    return { student: commonStudents.map((student) => student.email) };
  }

  suspendStudent = async (
    suspendStudentDto: SuspendStudentRequestDto,
  ): Promise<void> => {
    const { student: studentEmail } = suspendStudentDto;
    const student = await this.studentRepository.findOne({
      where: { email: studentEmail },
    });

    if (!student) {
      throw new HttpException(
        ERROR_MESSAGES.STUDENT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (student.isSuspended) {
      throw new HttpException(
        ERROR_MESSAGES.STUDENT_SUSPEND,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.studentRepository.save({ ...student, isSuspended: true });
  };

  retrieveNotifications = async (
    retrieveNotification: RetrieveNotificationRequestDto,
  ): Promise<RetrieveNotificationsResponseDto> => {
    const { teacher, notification } = retrieveNotification;

    const mentionedStudents =
      RequestUtils.extractMentionedStudents(notification);
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const validMentionedStudents = mentionedStudents.filter((email) =>
      gmailRegex.test(email),
    );

    const commonStudents = await this.getCommonStudents([teacher]);

    const combinedEmails = Array.from(
      new Set([...commonStudents.student, ...validMentionedStudents]),
    );

    const studentEntities = await this.studentRepository.find({
      where: { email: In(combinedEmails) },
    });

    const activeStudents = studentEntities
      .filter((student) => !student.isSuspended)
      .map((student) => student.email);

    return { recipients: activeStudents };
  };
}
