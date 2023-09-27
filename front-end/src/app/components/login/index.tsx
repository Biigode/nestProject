"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import "./styles.css";

interface ILoginProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => Promise<void>;
}

export const Login = ({
  email,
  handleLogin,
  setEmail,
}: ILoginProps): JSX.Element => {
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
