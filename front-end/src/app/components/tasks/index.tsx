"use client";
import { ITask } from "@/app/interfaces/ITasks";
import { UserContext } from "@/app/page";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import "./styles.css";

interface ITasksProps {
  handleUpdateUserTasks: (tasks: Array<string>) => Promise<void>;
}

export const Tasks = ({ handleUpdateUserTasks }: ITasksProps): JSX.Element => {
  const { user, setUser } = useContext(UserContext);

  const handleRemoveTask = async (id: string): Promise<void> => {
    const removedTask = user?.tasks?.filter((task) => task._id !== id);
    const removedTaskIds = removedTask?.map((task) => task._id) || [];
    await handleUpdateUserTasks(removedTaskIds);
  };

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
