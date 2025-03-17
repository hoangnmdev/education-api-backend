import { StudentSeedService } from '../student-seed.service';
import { Repository } from 'typeorm';
import { Student } from '../../../../../student/entities/student.entity';

describe('StudentSeedService', () => {
  let studentSeedService: StudentSeedService;
  let studentRepository: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(() => {
    studentRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    studentSeedService = new StudentSeedService(
      studentRepository as unknown as Repository<Student>,
    );
  });

  it('should create and save students if they do not exist', async () => {
    studentRepository.findOne.mockResolvedValue(null);
    studentRepository.create.mockImplementation(
      (studentData) => studentData as Student,
    );
    studentRepository.save.mockImplementation((student) =>
      Promise.resolve(student),
    );

    await studentSeedService.run();

    expect(studentRepository.findOne).toHaveBeenCalledTimes(9);
    expect(studentRepository.create).toHaveBeenCalledTimes(9);
    expect(studentRepository.save).toHaveBeenCalledTimes(9);
  });

  it('should not create or save a student if it already exists', async () => {
    const existingStudent = {
      email: 'studentjon@gmail.com',
      isSuspended: false,
    };
    studentRepository.findOne.mockImplementation(({ where: { email } }) => {
      return email === 'studentjon@gmail.com'
        ? Promise.resolve(existingStudent)
        : Promise.resolve(null);
    });
    studentRepository.create.mockImplementation(
      (studentData) => studentData as Student,
    );
    studentRepository.save.mockImplementation((student) =>
      Promise.resolve(student),
    );

    await studentSeedService.run();

    expect(studentRepository.findOne).toHaveBeenCalledTimes(9);
    expect(studentRepository.create).toHaveBeenCalledTimes(8);
    expect(studentRepository.save).toHaveBeenCalledTimes(8);
  });
});
