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

  private readonly tasks: Array<TaskDto> = [];
  async create(taskDto: TaskDto): Promise<Task> {
    const { name } = taskDto;

    const createdTask = await this.taskModel.create<TaskDocument>({
      name,
      id: uuidv4(),
    });

    return createdTask;
  }

  async findAll(): Promise<Array<Task>> {
    return this.taskModel.find<TaskDocument>().exec();
  }

  findOne(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, taskDto: TaskDto) {
    const { name } = taskDto;
    const taskPosition = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(taskPosition, 1, { id, name });

    return `Task ${id} updated`;
  }

  remove(id: string) {
    const taskPosition = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(taskPosition, 1);
    return `Task ${id} removed`;
  }
}
