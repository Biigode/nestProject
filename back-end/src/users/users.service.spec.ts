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

  it('should create a user', async () => {
    jest.spyOn(userSchema, 'create').mockImplementation((): any => {
      return {
        name: 'Victor Almeida',
        email: 'victor.teste@teste.com',
        tasks: [],
        save: jest.fn(),
      };
    });
    const user = await underTest.create({
      name: 'Victor Almeida',
      email: 'victor.teste@teste.com',
    });

    expect(user.name).toBe('Victor Almeida');
    expect(user.email).toBe('victor.teste@teste.com');
    expect(user.tasks.length).toBeLessThanOrEqual(0);
  });

  it('should return all users', async () => {
    jest.spyOn(userSchema, 'find').mockImplementation((): any => {
      return {
        exec: jest.fn().mockReturnValueOnce([
          {
            _id: '6487be2c950cf2462aa65333',
            name: 'Victor Almeida',
            email: 'victor.teste@teste.com',
            tasks: ['645d93ba827822eda6d0e750'],
            createdAt: '2023-06-13T00:54:04.581Z',
            updatedAt: '2023-06-13T00:54:34.079Z',
            __v: 0,
          },
          {
            _id: '6487be2c950cf2462aa65333',
            name: 'João kebler',
            email: 'joao.kleber@teste.com',
            tasks: ['645d93ba827822eda6d0e750'],
            createdAt: '2023-06-13T00:54:04.581Z',
            updatedAt: '2023-06-13T00:54:34.079Z',
            __v: 0,
          },
        ]),
      };
    });

    const allUsers = await underTest.findAll();
    expect(allUsers.length).toEqual(2);
  });

  it('should return a user by email and populate his tasks', async () => {
    const mockPopulate = jest.fn();
    const execFunction = jest.fn().mockReturnValueOnce({
      _id: '6487be2c950cf2462aa65333',
      name: 'Victor Almeida',
      email: 'victor.teste@teste.com',
      tasks: [
        {
          _id: '645d93ba827822eda6d0e750',
          name: 'Comprar coca zero',
        },
      ],
      createdAt: '2023-06-13T00:54:04.581Z',
      updatedAt: '2023-06-13T00:54:34.079Z',
      __v: 0,
    });

    jest.spyOn(taskSchema, 'collection');
    jest.spyOn(userSchema, 'findOne').mockImplementation((): any => {
      return {
        populate: mockPopulate.mockImplementationOnce(() => {
          return {
            exec: execFunction,
          };
        }),
      };
    });
    const userByEmail = await underTest.findOne('victor.teste@teste.com');
    expect(userByEmail.name).toEqual('Victor Almeida');
    expect(userByEmail.email).toEqual('victor.teste@teste.com');
    expect(userByEmail.tasks[0]).toEqual({
      _id: '645d93ba827822eda6d0e750',
      name: 'Comprar coca zero',
    });
    expect(mockPopulate).toHaveBeenCalledWith('tasks', 'name', taskSchema);
  });

  it('Should update the user', async () => {
    jest.spyOn(userSchema, 'findOneAndUpdate').mockImplementation((): any => {
      return {
        exec: jest.fn().mockReturnValueOnce({
          _id: '6487be2c950cf2462aa65333',
          name: 'Victor Almeida',
          email: 'victor.teste@teste.com',
          tasks: [
            {
              _id: '645d93ba827822eda6d0e750',
              name: 'Comprar coca zero',
            },
          ],
          createdAt: '2023-06-13T00:54:04.581Z',
          updatedAt: '2023-06-13T00:54:34.079Z',
          __v: 0,
          save: jest.fn(),
        }),
      };
    });

    const updatedUser = await underTest.update('victor.freitas08@teste.com', {
      name: 'Victor Almeida',
      email: 'victor.freitas08@teste.com',
      tasks: [
        { id: '645d93ba827822eda6d0e750', name: 'Comprar coca zero' },
        { id: '645d93ba827822eda6d0e751', name: 'Comprar coca' },
      ],
    });

    expect(updatedUser).toBeTruthy();
  });

  it('Should not update the user', async () => {
    jest.spyOn(userSchema, 'findOneAndUpdate').mockImplementation((): any => {
      return {
        exec: jest.fn().mockReturnValueOnce(null),
      };
    });

    const updatedUser = await underTest.update('victor.freitas08@teste.com', {
      name: 'Victor Almeida',
      email: 'victor.freitas08@teste.com',
      tasks: [
        { id: '645d93ba827822eda6d0e750', name: 'Comprar coca zero' },
        { id: '645d93ba827822eda6d0e751', name: 'Comprar coca' },
      ],
    });

    expect(updatedUser).toBeFalsy();
  });

  it('Should remove the user', async () => {
    jest.spyOn(userSchema, 'findOneAndDelete').mockImplementation((): any => {
      return {
        exec: jest.fn().mockReturnValueOnce({
          _id: '6487be2c950cf2462aa65333',
          name: 'Victor Almeida',
          email: 'victor.freitas08@teste.com',
        }),
      };
    });

    const removedUser = await underTest.remove('victor.freitas08@teste.com');
    expect(removedUser).toBeTruthy();
    expect(userSchema.findOneAndDelete).toBeCalledWith({
      email: 'victor.freitas08@teste.com',
    });
  });

  it('Should not remove the user', async () => {
    jest.spyOn(userSchema, 'findOneAndDelete').mockImplementation((): any => {
      return {
        exec: jest.fn().mockReturnValueOnce(null),
      };
    });

    const removedUser = await underTest.remove('victor.freitas08@teste.com');
    expect(removedUser).toBeFalsy();
    expect(userSchema.findOneAndDelete).toBeCalledWith({
      email: 'victor.freitas08@teste.com',
    });
  });
});
