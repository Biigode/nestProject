"use client";
import {
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./page.styles.css";

interface ITask {
  _id: string;
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
  const [task, setTask] = useState("");
  const [user, setUser] = useState<IUser>();
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [updateUserData, setUpdateUserData] = useState(false);

  useEffect(() => {
    const handleUpdatePageData = async (): Promise<void> => {
      const data = await axios.get(`http://localhost:3000/users/${email}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(data.data);
      setUpdateUserData((prev) => !prev);
    };
    if ((user || accessToken) && updateUserData) handleUpdatePageData();
  }, [updateUserData, accessToken, email, user]);

  const handleUpdateUserTasks = async (tasks: Array<string>): Promise<void> => {
    await axios.patch(
      `http://localhost:3000/users/${user?.email}`,
      { tasks },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    setUpdateUserData((prev) => !prev);
  };

  const handleAddTask = async (): Promise<void> => {
    if (!task.trim()) return;
    const newTask = { id: uuidv4(), name: task };
    const data = await axios.post(
      "http://localhost:3000/task",
      { ...newTask },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const newTasks = user?.tasks.map((task) => task._id) || [];
    newTasks.push(data.data._id);
    await handleUpdateUserTasks(newTasks);
    setTask("");
  };

  const handleRemoveTask = async (id: string): Promise<void> => {
    const removedTask = user?.tasks.filter((task) => task._id !== id);
    const removedTaskIds = removedTask?.map((task) => task._id) || [];
    await handleUpdateUserTasks(removedTaskIds);
  };

  const handleLogin = async (): Promise<void> => {
    if (!email.trim()) return;
    const data = await axios.post("http://localhost:3000/auth/login ", {
      email: email,
    });
    setAccessToken(data.data.access_token);
    setUpdateUserData((prev) => !prev);
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
              {user.tasks?.map((tarefa) => (
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
          </div>
          <footer className="italic font-sans font-light text-lg">
            Made by bigas
          </footer>
        </main>
      )}
    </>
  );
}
