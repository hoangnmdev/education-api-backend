import { Test, TestingModule } from '@nestjs/testing';
import { TeacherSeedService } from '../teacher-seed.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from '../../../../../teachers/entities/teacher.entity';
import { Repository } from 'typeorm';

describe('TeacherSeedService', () => {
  let service: TeacherSeedService;
  let teacherRepository: Repository<Teacher>;

  const teacherRepositoryMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherSeedService,
        {
          provide: getRepositoryToken(Teacher),
          useValue: teacherRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TeacherSeedService>(TeacherSeedService);
    teacherRepository = module.get<Repository<Teacher>>(
      getRepositoryToken(Teacher),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should not create or save any teacher if both already exist', async () => {
    (teacherRepository.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'teacherken@gmail.com',
      isSuspended: false,
    });
    await service.run();

    const createSpy = jest.spyOn(teacherRepository, 'create');
    const saveSpy = jest.spyOn(teacherRepository, 'save');

    expect(createSpy).not.toHaveBeenCalled();
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('should create and save a teacher if one of them does not exist', async () => {
    (teacherRepository.findOne as jest.Mock).mockImplementation(
      ({ where: { email } }) => {
        if (email === 'teacherken@gmail.com') {
          return Promise.resolve({
            id: 1,
            email: 'teacherken@gmail.com',
            isSuspended: false,
          });
        }
        return Promise.resolve(null);
      },
    );

    const newTeacher = { email: 'teacherjoe@gmail.com', isSuspended: false };
    (teacherRepository.create as jest.Mock).mockReturnValue(newTeacher);
    (teacherRepository.save as jest.Mock).mockResolvedValue({
      id: 2,
      ...newTeacher,
    });

    await service.run();

    const createSpy = jest.spyOn(teacherRepository, 'create');
    const saveSpy = jest.spyOn(teacherRepository, 'save');

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      email: 'teacherjoe@gmail.com',
      isSuspended: false,
    });
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(newTeacher);
  });
});
