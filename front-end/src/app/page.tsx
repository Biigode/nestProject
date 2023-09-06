"use client";
import {
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./page.styles.css";

interface ITask {
  id: string;
  nome: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: uuidv4(), nome: task }]);
    setTask("");
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col justify-between items-center p-24">
      <div className="container">
        <p className="italic font-sans font-light text-3xl">
          Cadastre uma tarefa
        </p>
        <div className="input-div px-2">
          <input
            onChange={(e) => setTask(e.target.value)}
            value={task}
            className="bg-white border-none border-transparent w-full text-black rounded-md outline-none"
          />
          <button
            className=" text-white rounded-md h-8 w-8"
            onClick={handleAddTask}
          >
            <ArrowRightIcon className="h-full w-full text-slate-400" />
          </button>
        </div>
        <div className="tarefas-container">
          {tasks.map((tarefa) => (
            <div
              className="flex flex-row border-b w-full justify-between items-center"
              key={tarefa.id}
            >
              <p className="font-sans font-light text-xl">{tarefa.nome}</p>
              <div className="flex flex-row w-14 justify-between">
                <button
                  className="rounded-md text-white h-6 w-6"
                  onClick={handleRemoveTask.bind(null, tarefa.id)}
                >
                  <CheckIcon className="h-full w-full text-slate-400" />
                </button>
                <button
                  className="rounded-md text-white h-6 w-6"
                  onClick={handleRemoveTask.bind(null, tarefa.id)}
                >
                  <XMarkIcon className="h-full w-full text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[300px] after:translate-x-3/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]" */}
      <footer className="italic font-sans font-light text-lg">
        Made by bigas
      </footer>
    </main>
  );
}
