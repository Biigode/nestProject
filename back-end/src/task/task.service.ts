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
    const { name, id } = taskDto;
    const createdTask = await this.taskModel.create<TaskDocument>({
      name,
      id: id ? id : uuidv4(),
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
    const updatedTask = await this.taskModel
      .findOneAndUpdate({ id }, { name })
      .exec();
    if (updatedTask) return true;
    await updatedTask.save();
    return false;
  }

  async remove(id: string): Promise<boolean> {
    const deleted = await this.taskModel.findOneAndDelete({ id }).exec();
    if (deleted) return true;
    return false;
  }
}
