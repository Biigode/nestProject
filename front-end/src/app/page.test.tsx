import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import Home from "./page";

jest.mock("axios");
describe("Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should render login page", () => {
    render(<Home />);
    const linkElement = screen.getByText(/Realize seu login/i);
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");

    expect(linkElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("should login and render tasks page", async () => {
    const axiosPost = jest.spyOn(axios, "post");
    axiosPost.mockResolvedValueOnce({
      data: {
        access_token: "123",
      },
    });
    const axiosGet = jest.spyOn(axios, "get");
    axiosGet.mockResolvedValueOnce({
      data: {
        _id: "6487be2c950cf2462aa65333",
        name: "Victor Almeida",
        email: "victor.freitas08@test.com",
        tasks: [
          {
            _id: "645d93ba827822eda6d0e750",
            name: "Comprar coca zero",
          },
        ],
        createdAt: "2023-06-13T00:54:04.581Z",
        updatedAt: "2023-06-13T00:54:34.079Z",
        __v: 0,
      },
    });

    render(<Home />);
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");

    fireEvent.change(inputElement, {
      target: { value: "victor.freitas08@test.com" },
    });

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    expect(axiosPost).toHaveBeenCalledWith("http://localhost:3000/auth/login", {
      email: "victor.freitas08@test.com",
    });

    expect(screen.getByText(/Cadastre uma tarefa/i)).toBeInTheDocument();
    expect(screen.getByTestId("create-task-input-container"));
    expect(screen.getByTestId("task-container"));
    expect(screen.getByText(/Comprar coca zero/i));
    expect(screen.getByTestId("footer-component"));
  });

  it("should remove task", async () => {
    const axiosPost = jest.spyOn(axios, "post");
    axiosPost.mockResolvedValueOnce({
      data: {
        access_token: "123",
      },
    });
    let dataMock = {
      data: {
        _id: "6487be2c950cf2462aa65333",
        name: "Victor Almeida",
        email: "victor.freitas08@test.com",
        tasks: [
          {
            _id: "645d93ba827822eda6d0e750",
            name: "Comprar coca zero",
          },
        ],
        createdAt: "2023-06-13T00:54:04.581Z",
        updatedAt: "2023-06-13T00:54:34.079Z",
        __v: 0,
      },
    };

    jest.spyOn(axios, "get").mockResolvedValueOnce(dataMock);

    const axiosPatch = jest.spyOn(axios, "patch");
    axiosPatch.mockResolvedValueOnce({});

    render(<Home />);
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");

    fireEvent.change(inputElement, {
      target: { value: "victor.freitas08@test.com" },
    });

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    const taskCheck = screen.getByTestId("task-0-check");

    dataMock = {
      data: {
        _id: "6487be2c950cf2462aa65333",
        name: "Victor Almeida",
        email: "victor.freitas08@test.com",
        tasks: [],
        createdAt: "2023-06-13T00:54:04.581Z",
        updatedAt: "2023-06-13T00:54:34.079Z",
        __v: 0,
      },
    };

    jest.spyOn(axios, "get").mockResolvedValueOnce(dataMock);

    await act(async () => {
      fireEvent.click(taskCheck);
    });

    expect(screen.queryByText(/Comprar coca zero/i)).not.toBeInTheDocument();

    expect(axiosPatch).toHaveBeenCalledWith(
      "http://localhost:3000/users/victor.freitas08@test.com",
      { tasks: [] },
      { headers: { Authorization: "Bearer 123" } }
    );
  });
});
