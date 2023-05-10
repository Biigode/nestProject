import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from '../entities/task.entity';

export type TaskDocument = HydratedDocument<TaskSchema>;

@Schema()
export class TaskSchema implements Task {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const TaskSchemaFactory = SchemaFactory.createForClass(TaskSchema);
