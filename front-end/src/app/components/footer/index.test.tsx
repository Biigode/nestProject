import { render } from "@testing-library/react";
import { Footer } from "./index";
import '@testing-library/jest-dom'

describe("Footer", () => {
  it("should render the correct text", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("Made by bigas")).toBeInTheDocument();
  });
});
