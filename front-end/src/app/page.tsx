"use client";
import {
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./page.styles.css";

interface ITask {
  id: string;
  name: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  tasks: Array<ITask>;
}

export default function Home() {
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [task, setTask] = useState("");
  const [user, setUser] = useState<IUser>();
  const [email, setEmail] = useState("");

  const handleAddTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: uuidv4(), name: task }]);
    setTask("");
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleLogin = async (): Promise<void> => {
    if (!email.trim()) return;
    const data = await axios.post("http://localhost:3000/auth/login ", {
      email: email,
    });
    console.log(data.data.access_token);
    const userData = await axios.get(`http://localhost:3000/users/${email}`, {
      headers: { Authorization: `Bearer ${data.data.access_token}` },
    });
    setUser(userData.data);
  };

  const renderLogin = () => {
    return (
      <div className="flex min-h-screen flex-col justify-center items-center p-24">
        <p className="italic font-sans font-light text-3xl mb-10">
          Realize seu login
        </p>
        <div className="input-div px-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-white border-none border-transparent w-full text-black rounded-md outline-none"
          />
          <button
            className="text-white rounded-md h-8 w-8"
            onClick={handleLogin}
          >
            <ArrowRightIcon className="h-full w-full text-slate-400" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {!user ? (
        renderLogin()
      ) : (
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
                className="text-white rounded-md h-8 w-8"
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
                  <p className="font-sans font-light text-xl">{tarefa.name}</p>
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
          <footer className="italic font-sans font-light text-lg">
            Made by bigas
          </footer>
        </main>
      )}
    </>
  );
}
