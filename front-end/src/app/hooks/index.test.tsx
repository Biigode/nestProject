import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { IUser } from "../interfaces/IUser";
import { UserContext } from "../page";
import { useUpdateUsers } from "./useUpdateUsers";

const setUserMock = jest.fn();
const userMock: IUser = {
  _id: "6487be2c950cf2462aa65333",
  name: "Victor Almeida",
  email: "victor.teste@teste.com",
  tasks: [
    {
      _id: "64f90f3488589bfdbd9cf4e0",
      id: "44ce762c-f6c1-46ec-b5e9-856305549116",
      name: "Comprar coca",
    },
  ],
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODdiZTJjOTUwY2YyNDYyYWE2NTMzMzMiLCJpYXQiOjE2MjMxNjY2NzQsImV4cCI6MTY",
};

const wrapper = ({ children }: any) => (
  <UserContext.Provider value={{ user: userMock, setUser: setUserMock }}>
    {children}
  </UserContext.Provider>
);

describe("useUpdate - hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should be able to update a user", async () => {
    const { result } = renderHook(() => useUpdateUsers(), { wrapper });
    const axiosPatch = jest.spyOn(axios, "patch");
    axiosPatch.mockResolvedValueOnce({ data: true });

    await act(async () => {
      result.current.execute(["123"]);
    });

    expect(axiosPatch).toHaveBeenCalledWith(
      "http://localhost:3000/users/victor.teste@teste.com",
      { tasks: ["123"] },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODdiZTJjOTUwY2YyNDYyYWE2NTMzMzMiLCJpYXQiOjE2MjMxNjY2NzQsImV4cCI6MTY",
        },
      }
    );
    expect(setUserMock).toHaveBeenCalledWith({
      _id: "6487be2c950cf2462aa65333",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODdiZTJjOTUwY2YyNDYyYWE2NTMzMzMiLCJpYXQiOjE2MjMxNjY2NzQsImV4cCI6MTY",
      email: "victor.teste@teste.com",
      name: "Victor Almeida",
      shouldUpdate: true,
      tasks: [
        {
          _id: "64f90f3488589bfdbd9cf4e0",
          id: "44ce762c-f6c1-46ec-b5e9-856305549116",
          name: "Comprar coca",
        },
      ],
    });
  });
});
