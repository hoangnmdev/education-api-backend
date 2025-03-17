import { Test, TestingModule } from '@nestjs/testing';
import { TeacherStudentController } from '../teachers.controller';
import { TeacherService } from '../teachers.service';
import { GetCommonStudentsResponseDto } from '../dto/response/get-common-student-teacher.dto';
import { SuspendStudentRequestDto } from '../dto/request/suspend-student-teacher.dto';
import { RetrieveNotificationRequestDto } from '../dto/request/retrieve-notification-request.dto';
import { RetrieveNotificationsResponseDto } from '../dto/response/retrieve-notification-response.dto';

describe('TeacherStudentController;', () => {
  let teacherController: TeacherStudentController;
  let teacherService: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherStudentController],
      providers: [
        {
          provide: TeacherService,
          useValue: {
            registerStudents: jest.fn(),
            suspendStudent: jest.fn(),
            getCommonStudents: jest.fn(),
            retrieveNotifications: jest.fn(),
          },
        },
      ],
    }).compile();

    teacherController = module.get<TeacherStudentController>(
      TeacherStudentController,
    );
    teacherService = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(teacherController).toBeDefined();
  });

  it('should call registerStudent in TeacherService with the correct data', async () => {
    const mockDto = {
      teacher: 'teacherken@gmail.com',
      students: ['studentjon@gmail.com'],
    };
    jest.spyOn(teacherService, 'registerStudents').mockResolvedValue(undefined);

    await teacherController.registerStudents(mockDto);

    expect(teacherService.registerStudents).toHaveBeenCalledWith(mockDto);
  });

  it('should call getCommonStudent in TeacherService with the correct data', async () => {
    const mockEmails = ['teacherken@gmail.com', 'teacherjoe@gmail.com'];
    const mockResponse: GetCommonStudentsResponseDto = {
      student: ['commonstudent1@gmail.com', 'commonstudent2@gmail.com'],
    };
    jest
      .spyOn(teacherService, 'getCommonStudents')
      .mockResolvedValue(mockResponse);

    const result = await teacherController.getCommonStudents(mockEmails);

    expect(result).toEqual(mockResponse);
  });

  it('should call suspendStudent in TeacherService with the correct data', async () => {
    const mockRequest: SuspendStudentRequestDto = {
      student: 'studentmary@gmail.com',
    };
    jest.spyOn(teacherService, 'suspendStudent').mockResolvedValue(undefined);

    await teacherController.suspendStudent(mockRequest);

    expect(teacherService.suspendStudent).toHaveBeenCalledWith(mockRequest);
  });

  it('should call retrieveNotifications in TeacherService with the correct data', async () => {
    const mockRequest: RetrieveNotificationRequestDto = {
      teacher: 'teacherken@gmail.com',
      notification:
        'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com',
    };
    const mockResponse: RetrieveNotificationsResponseDto = {
      recipients: [
        'studentbob@gmail.com',
        'studentagnes@gmail.com',
        'studentmiche@gmail.com',
      ],
    };
    jest
      .spyOn(teacherService, 'retrieveNotifications')
      .mockResolvedValue(mockResponse);

    const result = await teacherController.retrieveNotifications(mockRequest);

    expect(teacherService.retrieveNotifications).toHaveBeenCalledWith(
      mockRequest,
    );

    expect(result).toEqual(mockResponse);
  });
});
