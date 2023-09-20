import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from './dto/user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'UserSchemaModel',
          useValue: {},
        },
        {
          provide: 'TaskSchemaModel',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userDto: UserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
      const createdUser = { id: 1, ...userDto };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(userDto);

      expect(service.create).toHaveBeenCalledWith(userDto);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
      expect(result).toHaveLength(users.length);
      expect(result[0].name).toEqual(users[0].name);
      expect(result[0].email).toEqual(users[0].email);
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const email = 'john.doe@example.com';
      const user = { id: 1, name: 'John Doe', email };
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(email);

      expect(service.findOne).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user by email', async () => {
      const email = 'john.doe@example.com';
      const userDto: UserDto = { name: 'John Doe', email };
      
      jest.spyOn(service, 'update').mockResolvedValue(true);

      const result = await controller.update(email, userDto);

      expect(service.update).toHaveBeenCalledWith(email, userDto);
      expect(result).toBeTruthy();
    });
  });
  describe('remove', () => {
    it('should remove a user by email', async () => {
      const email = 'john.doe@example.com';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(email);

      expect(service.remove).toHaveBeenCalledWith(email);
      expect(result).toBeUndefined();
    });
  });
});
