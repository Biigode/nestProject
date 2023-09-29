import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./index";
import '@testing-library/jest-dom'

describe("Input component", () => {
  it("should render an input and a button", () => {
    render(<Input handleUpdateUserTasks={() => Promise.resolve()} />);
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("should update the input value when typing", () => {
    render(<Input handleUpdateUserTasks={() => Promise.resolve()} />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New task" } });
    expect(inputElement.value).toBe("New task");
  });

  it("should call handleUpdateUserTasks when clicking the button", async () => {
    const handleUpdateUserTasks = jest.fn(() => Promise.resolve());
    render(<Input handleUpdateUserTasks={handleUpdateUserTasks} />);
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");
    fireEvent.change(inputElement, { target: { value: "New task" } });
    fireEvent.click(buttonElement);
    expect(handleUpdateUserTasks).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should not call handleUpdateUserTasks when clicking the button with an empty input", async () => {
    const handleUpdateUserTasks = jest.fn(() => Promise.resolve());
    render(<Input handleUpdateUserTasks={handleUpdateUserTasks} />);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(handleUpdateUserTasks).not.toHaveBeenCalled();
  });
});