import { UserContext } from "@/app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { Login } from "./index";

const mockSetUser = jest.fn();

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    render(<Login />);
    const linkElement = screen.getByText(/Realize seu login/i);
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");

    expect(linkElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("should auth user", async () => {
    const axiosPost = jest.spyOn(axios, "post");
    axiosPost.mockResolvedValueOnce({
      data: {
        access_token: "123",
      },
    });

    render(
      <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
        <Login />
      </UserContext.Provider>
    );

    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(inputElement, {
        target: { value: "victor.teste@teste.com" },
      });
    });

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    expect(inputElement).toHaveValue("victor.teste@teste.com");
    expect(axiosPost).toHaveBeenCalledWith("http://localhost:3000/auth/login", {
      email: "victor.teste@teste.com",
    });
    expect(mockSetUser).toHaveBeenCalledWith({
      _id: "",
      accessToken: "123",
      email: "victor.teste@teste.com",
      name: "",
      shouldUpdate: true,
      tasks: [],
    });
  });

  it("should not auth user if email is empty", async () => {
    render(
      <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
        <Login />
      </UserContext.Provider>
    );

    const axiosPost = jest.spyOn(axios, "post");

    const buttonElement = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    expect(mockSetUser).not.toHaveBeenCalled();
    expect(axiosPost).not.toHaveBeenCalled();
  });
});
