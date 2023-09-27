"use client";
import { IUser } from "@/app/interfaces/IUser";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "./styles.css";

interface ITasksProps {
  user: IUser;
  handleRemoveTask: (id: string) => Promise<void>;
}

export const Tasks = ({ user, handleRemoveTask }: ITasksProps): JSX.Element => {
  return (
    <div className="tarefas-container">
      {user?.tasks?.map((tarefa) => (
        <div
          className="flex flex-row border-b w-full justify-between items-center"
          key={tarefa._id}
        >
          <p className="font-sans font-light text-xl">{tarefa.name}</p>
          <div className="flex flex-row w-14 justify-between">
            <button
              className="rounded-md text-white h-6 w-6"
              onClick={handleRemoveTask.bind(null, tarefa._id)}
            >
              <CheckIcon className="h-full w-full text-slate-400" />
            </button>
            <button
              className="rounded-md text-white h-6 w-6"
              onClick={handleRemoveTask.bind(null, tarefa._id)}
            >
              <XMarkIcon className="h-full w-full text-slate-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
