"use client";
import { useUpdateUsers } from "@/app/hooks/useUpdateUsers";
import { UserContext } from "@/app/page";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

export const Input = (): JSX.Element => {
  const { user } = useContext(UserContext);
  const [task, setTask] = useState("");
  const { execute } = useUpdateUsers();

  const handleAddTask = async (): Promise<void> => {
    if (!task.trim()) return;
    const newTask = { id: uuidv4(), name: task };

    const data = await axios.post(
      "http://localhost:3000/task",
      { ...newTask },
      {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }
    );
    const newTasks = user?.tasks?.map((task) => task._id) || [];
    newTasks.push(data.data._id);
    await execute(newTasks);
    setTask("");
  };

  return (
    <div className="input-div px-2" data-testid="create-task-input-container">
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
