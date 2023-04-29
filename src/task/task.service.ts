import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private readonly tasks: Array<CreateTaskDto> = [];
  create(createTaskDto: CreateTaskDto): string {
    const { name } = createTaskDto;
    this.tasks.push({ id: uuidv4(), name });
    return 'This action adds a new task';
  }

  findAll(): Array<CreateTaskDto> {
    return this.tasks;
  }

  findOne(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const { name } = updateTaskDto;
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
