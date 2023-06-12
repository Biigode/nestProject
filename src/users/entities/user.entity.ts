import { Task } from 'src/task/entities/task.entity';

export class User {
  name: string;
  email: string;
  tasks?: Array<Task>;
}
