import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from './dto/task.dto';

import { Task } from './entities/task.entity';
import { TaskDocument, TaskSchema } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskSchema.name) private taskModel: Model<TaskSchema>,
  ) {}

  async create(taskDto: TaskDto): Promise<Task> {
    const { name } = taskDto;
    const createdTask = await this.taskModel.create<TaskDocument>({
      name,
      id: uuidv4(),
    });
    createdTask.save();
    return createdTask;
  }

  async findAll(): Promise<Array<Task>> {
    return await this.taskModel.find<TaskDocument>().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findOne<TaskDocument>({ id }).exec();
  }

  async update(id: string, taskDto: TaskDto): Promise<any> {
    const { name } = taskDto;
    const { matchedCount, modifiedCount } = await this.taskModel
      .updateOne({id}, {name})
      .exec();
    if (matchedCount && modifiedCount) return true;
    return false;
  }

  async remove(id: string): Promise<boolean> {
    const { deletedCount } = await this.taskModel.deleteOne({ id }).exec();
    if (deletedCount) return true;
    return false;
  }
}
