import { jest } from '@jest/globals';
import { TeacherService } from '../teachers.service';
import { HttpException } from '@nestjs/common';
import { RegisterStudentsRequestDto } from '../dto/request/register-student-teacher.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { Student } from '../../student/entities/student.entity';
import { Teacher } from '../entities/teacher.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SuspendStudentRequestDto } from '../dto/request/suspend-student-teacher.dto';
import { RetrieveNotificationRequestDto } from '../dto/request/retrieve-notification-request.dto';
import RequestUtils from '../../utils/request';

describe('TeacherService', () => {
  let teacherService: TeacherService;
  let teacherRepository: Repository<Teacher>;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            some: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Student),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    teacherService = module.get<TeacherService>(TeacherService);
    teacherRepository = module.get<Repository<Teacher>>(
      getRepositoryToken(Teacher),
    );
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
    expect(teacherService).toBeDefined();
  });

  it('should be defined', () => {
    expect(TeacherService).toBeDefined();
  });

  describe('registerStudents', () => {
    it('should register students to an existing teacher', async () => {
      const teacherEmail = 'teacherken@gmail.com';
      const studentEmails = ['studentjon@gmail.com', 'studenthon@gmail.com'];

      const teacherMock: Teacher = {
        id: 1,
        email: teacherEmail,
        students: [],
      };

      const studentMockJon: Student = {
        id: 2,
        email: 'studentjon@gmail.com',
        isSuspended: false,
        teachers: [],
      };

      const studentMockHon: Student = {
        id: 3,
        email: 'studenthon@gmail.com',
        isSuspended: false,
        teachers: [],
      };

      jest.spyOn(teacherRepository, 'findOne').mockResolvedValue(teacherMock);

      jest
        .spyOn(studentRepository, 'findOne')
        .mockImplementation(
          (options: { where: { email: string } }): Promise<Student | null> => {
            const email = options.where.email;
            if (email === 'studentjon@gmail.com') {
              return Promise.resolve(studentMockJon);
            }
            if (email === 'studenthon@gmail.com') {
              return Promise.resolve(studentMockHon);
            }
            return Promise.resolve(null);
          },
        );

      jest.spyOn(teacherRepository, 'save').mockResolvedValue(teacherMock);

      const dto: RegisterStudentsRequestDto = {
        teacher: teacherEmail,
        students: studentEmails,
      };

      await teacherService.registerStudents(dto);

      const saveSpy = jest.spyOn(teacherRepository, 'save').mockResolvedValue({
        ...teacherMock,
        students: [studentMockJon, studentMockHon],
      });

      expect(saveSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          email: teacherEmail,
          students: expect.arrayContaining([
            expect.objectContaining({ email: 'studentjon@gmail.com' }),
            expect.objectContaining({ email: 'studenthon@gmail.com' }),
          ]) as unknown as Student[],
        }),
      );
    });

    it('should create a new teacher if one does not exist', async () => {
      const teacherEmail = 'newteacher@gmail.com';
      const studentEmails = ['studenta@gmail.com'];

      jest.spyOn(teacherRepository, 'findOne').mockResolvedValue(null);

      const newTeacher: Teacher = { id: 1, email: teacherEmail, students: [] };
      jest.spyOn(teacherRepository, 'create').mockReturnValue(newTeacher);

      const studentMock: Student = {
        id: 2,
        email: 'studenta@gmail.com',
        isSuspended: false,
        teachers: [],
      };
      jest.spyOn(studentRepository, 'findOne').mockResolvedValue(studentMock);

      jest.spyOn(teacherRepository, 'save').mockResolvedValue(newTeacher);

      const saveSpy = jest.spyOn(teacherRepository, 'save').mockResolvedValue({
        ...newTeacher,
        students: [studentMock],
      });

      const createSpy = jest
        .spyOn(teacherRepository, 'create')
        .mockReturnValue(newTeacher);

      const dto: RegisterStudentsRequestDto = {
        teacher: teacherEmail,
        students: studentEmails,
      };

      await teacherService.registerStudents(dto);

      expect(createSpy).toHaveBeenCalledWith({
        email: teacherEmail,
        students: [],
      });
      expect(saveSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          email: teacherEmail,
          students: expect.arrayContaining<Student>([
            expect.objectContaining<Student>({
              email: 'studenta@gmail.com',
              id: 2,
              isSuspended: false,
              teachers: [],
            }),
          ]) as unknown as Student[],
        }),
      );
    });

    it('should throw an error if the student is already registered', async () => {
      // Setup: teacher already has 'studenta@gmail.com' registered
      const teacherEmail = 'teacher@example.com';
      const studentEmail = 'studenta@gmail.com';

      const existingTeacher: Teacher = {
        id: 1,
        email: teacherEmail,
        students: [
          { id: 2, email: studentEmail, isSuspended: false, teachers: [] },
        ],
      };

      jest
        .spyOn(teacherRepository, 'findOne')
        .mockResolvedValue(existingTeacher);

      const dto: RegisterStudentsRequestDto = {
        teacher: teacherEmail,
        students: [studentEmail],
      };

      await expect(teacherService.registerStudents(dto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('getCommonStudents', () => {
    it('should return common students when all teachers exist', async () => {
      const teacherEmails = ['teacherken@gmail.com', 'teacherbob@gmail.com'];

      const teacher1: Teacher = {
        id: 1,
        email: 'teacherken@gmail.com',
        students: [],
      };
      const teacher2: Teacher = {
        id: 2,
        email: 'teacherbob@gmail.com',
        students: [],
      };
      jest
        .spyOn(teacherRepository, 'find')
        .mockResolvedValue([teacher1, teacher2]);

      const commonStudent1: Student = {
        id: 1,
        email: 'commonstudent1@gmail.com',
        isSuspended: false,
        teachers: [teacher1, teacher2],
      };
      const commonStudent2: Student = {
        id: 2,
        email: 'commonstudent2@gmail.com',
        isSuspended: false,
        teachers: [teacher1, teacher2],
      };
      const nonCommonStudent: Student = {
        id: 3,
        email: 'student_only_under_teacher_ken@gmail.com',
        isSuspended: false,
        teachers: [teacher1],
      };

      jest
        .spyOn(studentRepository, 'find')
        .mockResolvedValue([commonStudent1, commonStudent2, nonCommonStudent]);

      const result = await teacherService.getCommonStudents(teacherEmails);

      expect(result).toEqual({
        student: ['commonstudent1@gmail.com', 'commonstudent2@gmail.com'],
      });
    });

    it('should throw an error if one or more teachers do not exist', async () => {
      const teacherEmails = ['teacherken@gmail.com', 'teacherbob@gmail.com'];

      const teacher1: Teacher = {
        id: 1,
        email: 'teacherken@gmail.com',
        students: [],
      };
      jest.spyOn(teacherRepository, 'find').mockResolvedValue([teacher1]);

      await expect(
        teacherService.getCommonStudents(teacherEmails),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('suspendStudent', () => {
    it('should suspend a student', async () => {
      const suspendStudentDto: SuspendStudentRequestDto = {
        student: 'studentmary@gmail.com',
      };

      const student: Student = {
        id: 1,
        email: 'studentmary@gmail.com',
        isSuspended: false,
        teachers: [],
      };

      const findOneSpy = jest
        .spyOn(studentRepository, 'findOne')
        .mockResolvedValue(student);
      const saveSpy = jest
        .spyOn(studentRepository, 'save')
        .mockResolvedValue({ ...student, isSuspended: true });

      await teacherService.suspendStudent(suspendStudentDto);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: { email: 'studentmary@gmail.com' },
      });
      expect(saveSpy).toHaveBeenCalledWith({
        ...student,
        isSuspended: true,
      });
    });

    it('should throw an error if student does not exist', async () => {
      const suspendStudentDto: SuspendStudentRequestDto = {
        student: 'nonexistent@student.com',
      };

      jest.spyOn(studentRepository, 'findOne').mockResolvedValue(null);

      await expect(
        teacherService.suspendStudent(suspendStudentDto),
      ).rejects.toThrow(HttpException);
    });

    it('should throw an error if student is already suspended', async () => {
      const suspendStudentDto: SuspendStudentRequestDto = {
        student: 'studentmary@gmail.com',
      };

      const suspendedStudent: Student = {
        id: 1,
        email: 'studentmary@gmail.com',
        isSuspended: true,
        teachers: [],
      };

      jest
        .spyOn(studentRepository, 'findOne')
        .mockResolvedValue(suspendedStudent);

      await expect(
        teacherService.suspendStudent(suspendStudentDto),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('retrieveNotifications', () => {
    it('should return recipients combining mentioned and common students excluding suspended ones', async () => {
      const teacherEmail = 'teacherken@gmail.com';
      const notificationMessage =
        'Hello @studentmentioned@gmail.com, please check your notifications';
      const retrieveNotificationDto: RetrieveNotificationRequestDto = {
        teacher: teacherEmail,
        notification: notificationMessage,
      };

      jest
        .spyOn(RequestUtils, 'extractMentionedStudents')
        .mockReturnValue(['studentmentioned@gmail.com']);

      jest.spyOn(teacherService, 'getCommonStudents').mockResolvedValue({
        student: ['commonstudent1@gmail.com', 'commonstudent2@gmail.com'],
      });

      const activeStudent: Student = {
        id: 1,
        email: 'commonstudent1@gmail.com',
        isSuspended: false,
        teachers: [],
      };
      const suspendedStudent: Student = {
        id: 2,
        email: 'commonstudent2@gmail.com',
        isSuspended: true,
        teachers: [],
      };

      jest
        .spyOn(studentRepository, 'find')
        .mockResolvedValue([activeStudent, suspendedStudent]);

      const result = await teacherService.retrieveNotifications(
        retrieveNotificationDto,
      );

      expect(result).toEqual({
        recipients: expect.arrayContaining<string>([
          'commonstudent1@gmail.com',
        ]) as unknown as string[],
      });
      expect(result.recipients).not.toContain('commonstudent2@gmail.com');
    });
  });
});
