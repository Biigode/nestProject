"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import "./styles.css";

interface IInputProps {
  setTask: React.Dispatch<React.SetStateAction<string>>;
  task: string;
  handleAddTask: () => Promise<void>;
}

export const Input = ({
  handleAddTask,
  setTask,
  task,
}: IInputProps): JSX.Element => {
  return (
    <div className="input-div px-2">
      <input
        onChange={(e) => setTask(e.target.value)}
        value={task}
        className="bg-white border-none border-transparent w-full text-black rounded-md outline-none"
      />
      <button className="text-white rounded-md h-8 w-8" onClick={handleAddTask}>
        <ArrowRightIcon className="h-full w-full text-slate-400" />
      </button>
    </div>
  );
};
