import { IUser } from "@/app/interfaces/IUser";
import { UserContext } from "@/app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { Input } from "./index";

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
  ],
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODdiZTJjOTUwY2YyNDYyYWE2NTMzMzMiLCJpYXQiOjE2MjMxNjY2NzQsImV4cCI6MTY",
};

jest.mock("../../hooks/useUpdateUsers", () => ({
  useUpdateUsers: jest.fn(() => ({
    execute: mockExecute,
  })),
}));

describe("Input component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("should render button", () => {
    render(<Input />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should add a task", async () => {
    render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <Input />
      </UserContext.Provider>
    );
    const axiosMock = jest.spyOn(axios, "post");

    axiosMock.mockResolvedValueOnce({
      data: {
        id: "44ce762c-f6c1-46ec-b5e9-856305549116",
        name: "Comprar coca",
        _id: "64f90f3488589bfdbd9cf4e0",
        createdAt: "2023-09-06T23:45:56.426Z",
        updatedAt: "2023-09-06T23:45:56.426Z",
        __v: 0,
      },
    });
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Teste" } });
    });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(input).toHaveValue("");
    expect(mockExecute).toHaveBeenCalled();
    expect(axiosMock).toBeCalledTimes(1);
  });

  it("should not add a task", async () => {
    render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <Input />
      </UserContext.Provider>
    );
    const axiosMock = jest.spyOn(axios, "post");

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
    });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(input).toHaveValue("");
    expect(mockExecute).not.toHaveBeenCalled();
    expect(axiosMock).toBeCalledTimes(0);
  });
});
