"use client";
import { UserContext } from "@/app/page";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useContext, useState } from "react";
import "./styles.css";

export const Login = (): JSX.Element => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");

  const handleLogin = async (): Promise<void> => {
    if (!email.trim()) return;
    const data = await axios.post("http://localhost:3000/auth/login", {
      email: email,
    });

    setUser({
      _id: "",
      email: email,
      name: "",
      tasks: [],
      accessToken: data.data.access_token,
      shouldUpdate: true,
    });
  };

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
        <button className="text-white rounded-md h-8 w-8" onClick={handleLogin}>
          <ArrowRightIcon className="h-full w-full text-slate-400" />
        </button>
      </div>
    </div>
  );
};
