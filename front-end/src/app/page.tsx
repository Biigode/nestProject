"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { Footer } from "./components/footer";
import { Input } from "./components/input";
import { Login } from "./components/login";
import { Tasks } from "./components/tasks";
import { IUser } from "./interfaces/IUser";
import "./page.styles.css";

interface IUserContextValue {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContextValue>({
  user: null,
  setUser: () => {},
});

const Home = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const handleUpdatePageData = async (): Promise<void> => {
      const data = await axios.get(
        `http://localhost:3000/users/${user?.email}`,
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        }
      );

      setUser({
        ...data.data,
        accessToken: user?.accessToken,
        shouldUpdate: !user?.shouldUpdate,
      });
    };
    if (user?.email && user.accessToken && user?.shouldUpdate)
      handleUpdatePageData();
  }, [user]);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!user ? (
        <Login />
      ) : (
        <main className="flex min-h-screen flex-col justify-between items-center p-24">
          <div className="container">
            <p className="italic font-sans font-light text-3xl">
              Cadastre uma tarefa
            </p>
            <Input />
            <Tasks />
          </div>
          <Footer />
        </main>
      )}
    </UserContext.Provider>
  );
};

export default Home;
