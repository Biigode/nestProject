import { ITask } from "./ITasks";

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  tasks?: Array<ITask>;
  accessToken?: string;
  shouldUpdate?: boolean;
}
