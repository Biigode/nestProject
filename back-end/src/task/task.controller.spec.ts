import { TestBed } from '@automock/jest';
import { TaskDto } from './dto/task.dto';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

jest.mock('./task.service');

describe('TaskController', () => {
  let underTest: TaskController;
  let taskService: jest.Mocked<TaskService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(TaskController).compile();
    underTest = unit;
    taskService = unitRef.get(TaskService);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const taskDto: TaskDto = { name: 'Task 1', id: '1' };

      jest.spyOn(taskService, 'create').mockResolvedValue(taskDto);

      const result = await underTest.create(taskDto);

      expect(taskService.create).toHaveBeenCalledWith(taskDto);
      expect(result).toEqual(taskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [{ id: '1', name: 'Task 1' }];
      jest.spyOn(taskService, 'findAll').mockResolvedValue(tasks);

      const result = await underTest.findAll();

      expect(taskService.findAll).toHaveBeenCalled();
      expect(result).toEqual(tasks);
      expect(result).toHaveLength(tasks.length);
      expect(result[0].name).toEqual(tasks[0].name);
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const id = '1';
      const task = { id, name: 'Task 1' };
      jest.spyOn(taskService, 'findOne').mockResolvedValue(task);

      const result = await underTest.findOne(id);

      expect(taskService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(task);
    });
  });

  describe('update', () => {
    it('should update a task by id', async () => {
      const id = '1';
      const taskDto: TaskDto = { name: 'Task 1', id: '1' };

      jest.spyOn(taskService, 'update').mockResolvedValue(true);

      const result = await underTest.update(id, taskDto);

      expect(taskService.update).toHaveBeenCalledWith(id, taskDto);
      expect(result).toBeTruthy();
    });
  });
});
