import { TestBed } from '@automock/jest';
import { Model } from 'mongoose';
import { TaskSchema } from 'src/task/schemas/task.schema';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService unit spect', () => {
  let underTest: UsersService;
  let userSchema: jest.Mocked<Model<UserSchema>>;
  let taskSchema: jest.Mocked<Model<TaskSchema>>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UsersService).compile();
    underTest = unit;
    userSchema = unitRef.get('UserSchemaModel');
    taskSchema = unitRef.get('TaskSchemaModel');
  });

  it('should return all users', async () => {
    jest.spyOn(taskSchema, 'collection');
    jest.spyOn(userSchema, 'find').mockImplementation((): any => {
      return {
        exec: jest.fn().mockReturnValueOnce([
          {
            _id: '6487be2c950cf2462aa65333',
            name: 'Victor Almeida',
            email: 'victor.freitas08@gmail.com',
            tasks: ['645d93ba827822eda6d0e750'],
            createdAt: '2023-06-13T00:54:04.581Z',
            updatedAt: '2023-06-13T00:54:34.079Z',
            __v: 0,
          },
        ]),
      };
    });

    const allUsers = await underTest.findAll();
    expect(allUsers.length).toEqual(1);
  });
});
