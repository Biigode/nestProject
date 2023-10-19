import axios from "axios";
import { useCallback, useContext } from "react";
import { UserContext } from "../page";

interface IUseUpdateUsers {
  execute: (tasks: Array<string>) => Promise<void>;
}

export const useUpdateUsers = (): IUseUpdateUsers => {
  const { user, setUser } = useContext(UserContext);
  const execute = useCallback(
    async (tasks: Array<string>): Promise<void> => {
      await axios.patch(
        `http://localhost:3000/users/${user?.email}`,
        { tasks },
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        }
      );

      setUser({ ...user, shouldUpdate: !user?.shouldUpdate });
    },
    [setUser, user]
  );

  return { execute };
};
