import { ITask } from "./itasks";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  tasks: Array<ITask>;
}
