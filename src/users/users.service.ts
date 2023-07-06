import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskSchema } from 'src/task/schemas/task.schema';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserDocument, UserSchema } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
    @InjectModel(TaskSchema.name) private taskModel: Model<TaskSchema>,
  ) {}
  async create(createUserDto: UserDto): Promise<User> {
    const createdUser = await this.userModel.create<UserDocument>(
      createUserDto,
    );
    createdUser.save();
    return createdUser;
  }

  async findAll(): Promise<Array<User>> {
    return await this.userModel.find<UserDocument>().exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel
      .findOne<UserDocument>({ email: email })
      .populate('tasks', 'name', this.taskModel)
      .exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne<UserDocument>({ email: email }).exec();
  }

  async update(email: string, updateUserDto: UserDto): Promise<boolean> {
    const { modifiedCount, matchedCount } = await this.userModel
      .updateOne({ email: email }, updateUserDto)
      .exec();
    if (matchedCount && modifiedCount) return true;
    return false;
  }

  async remove(email: string): Promise<boolean> {
    const { deletedCount } = await this.userModel
      .deleteOne({ email: email })
      .exec();
    if (deletedCount) return true;
    return false;
  }
}
