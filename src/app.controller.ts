import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface ITask {
  id: string;
  name: string;
}

const tasks: Array<ITask> = [];

@Controller('tasks')
export class AppController {
  @Post()
  create(@Body() task: ITask) {
    const { name } = task;
    tasks.push({ id: uuidv4(), name });
    return 'Task created';
  }

  @Get()
  findAll(@Query('name') name?: string) {
    return name?.length
      ? tasks.filter((task) => task.name.includes(name))
      : tasks;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return tasks.find((task) => task.id === id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTask: ITask) {
    const { name } = updateTask;
    const taskPosition = tasks.findIndex((task) => task.id === id);
    tasks.splice(taskPosition, 1, { id, name });

    return `Task ${id} updated`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const taskPosition = tasks.findIndex((task) => task.id === id);
    tasks.splice(taskPosition, 1);
    return `Task ${id} removed`;
  }
}
