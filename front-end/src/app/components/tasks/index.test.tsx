import { IUser } from "@/app/interfaces/IUser";
import { UserContext } from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Tasks } from ".";

const mockSetUser = jest.fn();
const mockExecute = jest.fn();
const mockUser: IUser = {
  _id: "6487be2c950cf2462aa65333",
  name: "Victor Almeida",
  email: "victor.teste@teste.com",
  tasks: [
    {
      _id: "64f90f3488589bfdbd9cf4e0",
      id: "44ce762c-f6c1-46ec-b5e9-856305549116",
      name: "Comprar coca",
    },
    {
      _id: "64f90f3488589bfdbd9cf679",
      id: "44ce762c-f6c1-46ec-b5e9-856305549116",
      name: "Comprar pão",
    },
  ],
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODdiZTJjOTUwY2YyNDYyYWE2NTMzMzMiLCJpYXQiOjE2MjMxNjY2NzQsImV4cCI6MTY",
};

jest.mock("../../hooks/useUpdateUsers", () => ({
  useUpdateUsers: jest.fn(() => ({
    execute: mockExecute,
  })),
}));

describe("Tasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render tasks component", () => {
    render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <Tasks />
      </UserContext.Provider>
    );

    const taskComponent = screen.getByTestId("task-container");
    const task = screen.getByTestId("task-0");
    const taskCheck = screen.getByTestId("task-0-check");
    const taskRemove = screen.getByTestId("task-0-remove");

    const task2 = screen.getByTestId("task-1");
    const taskCheck2 = screen.getByTestId("task-1-check");
    const taskRemove2 = screen.getByTestId("task-1-remove");

    expect(taskComponent).toBeInTheDocument();
    expect(task).toBeInTheDocument();
    expect(taskCheck).toBeInTheDocument();
    expect(taskRemove).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
    expect(taskCheck2).toBeInTheDocument();
    expect(taskRemove2).toBeInTheDocument();
  });

  it("should remove a task", () => {
    render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <Tasks />
      </UserContext.Provider>
    );

    const taskRemove = screen.getByTestId("task-0-remove");

    taskRemove.click();

    expect(mockExecute).toHaveBeenCalledWith(["64f90f3488589bfdbd9cf679"]);
  });

  it("should finish a task", () => {
    render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <Tasks />
      </UserContext.Provider>
    );

    const taskCheck = screen.getByTestId("task-0-check");

    taskCheck.click();

    expect(mockExecute).toHaveBeenCalledWith(["64f90f3488589bfdbd9cf679"]);
  });
});
