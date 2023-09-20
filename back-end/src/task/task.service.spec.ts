import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: 'TaskSchemaModel',
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const taskDto: TaskDto = { name: 'Task 1', id: uuidv4() };

      jest
        .spyOn(service['taskModel'], 'create')
        .mockImplementation(() =>
          Promise.resolve({ ...taskDto, save: jest.fn() } as any),
        );

      const result = await service.create(taskDto);

      expect(service['taskModel'].create).toHaveBeenCalledWith({
        id: taskDto.id,
        name: taskDto.name,
      });
      expect({ name: result.name, id: result.id }).toEqual(taskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [{ id: uuidv4(), name: 'Task 1' }];
      jest
        .spyOn(service['taskModel'], 'find')
        .mockImplementationOnce((): any => {
          return { exec: jest.fn().mockResolvedValueOnce(tasks) };
        });

      const result = await service.findAll();

      expect(service['taskModel'].find).toHaveBeenCalled();
      expect(result).toEqual(tasks);
      expect(result).toHaveLength(tasks.length);
      expect(result[0].name).toEqual(tasks[0].name);
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const id = uuidv4();
      const task = { id, name: 'Task 1' };
      jest
        .spyOn(service['taskModel'], 'findOne')
        .mockImplementationOnce((): any => {
          return { exec: jest.fn().mockResolvedValueOnce(task) };
        });

      const result = await service.findOne(id);

      expect(service['taskModel'].findOne).toHaveBeenCalledWith({ id });
      expect(result).toEqual(task);
    });
  });

  describe('update', () => {
    it('should update a task by id', async () => {
      const id = uuidv4();
      const taskDto: TaskDto = { name: 'Task 1', id };

      jest
        .spyOn(service['taskModel'], 'findOneAndUpdate')
        .mockImplementationOnce((): any => {
          return {
            exec: jest.fn().mockResolvedValueOnce(taskDto),
            save: jest.fn(),
          };
        });

      const result = await service.update(id, taskDto);

      expect(service['taskModel'].findOneAndUpdate).toHaveBeenCalledWith(
        { id },
        { name: taskDto.name },
      );
      expect(result).toEqual(true);
    });
  });

  describe('remove', () => {
    it('should remove a task by id', async () => {
      const id = uuidv4();
      const taskDto: TaskDto = { name: 'Task 1', id };
      jest
        .spyOn(service['taskModel'], 'findOneAndDelete')
        .mockImplementationOnce((): any => {
          return { exec: jest.fn().mockResolvedValueOnce(taskDto) };
        });

      const result = await service.remove(id);

      expect(service['taskModel'].findOneAndDelete).toHaveBeenCalledWith({
        id,
      });
      expect(result).toEqual(true);
    });
  });
});
