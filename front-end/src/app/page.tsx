"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Footer } from "./components/footer";
import { Input } from "./components/input";
import { Login } from "./components/login";
import { Tasks } from "./components/tasks";
import { IUser } from "./interfaces/IUser";
import "./page.styles.css";

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

  return (
    <>
      {!user ? (
        <Login email={email} setEmail={setEmail} handleLogin={handleLogin} />
      ) : (
        <main className="flex min-h-screen flex-col justify-between items-center p-24">
          <div className="container">
            <p className="italic font-sans font-light text-3xl">
              Cadastre uma tarefa
            </p>
            <Input
              handleAddTask={handleAddTask}
              setTask={setTask}
              task={task}
            />
            <Tasks user={user} handleRemoveTask={handleRemoveTask} />
          </div>
          <Footer />
        </main>
      )}
    </>
  );
}
