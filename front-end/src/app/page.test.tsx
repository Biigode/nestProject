import { render } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";

describe("Page", () => {
  it("should update user data when handleUpdatePageData is called", async () => {
    const mockData = {
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        accessToken: "123456",
        shouldUpdate: false,
      },
    };
    const mockUser = {
      name: "Jane Doe",
      email: "janedoe@example.com",
      accessToken: "654321",
      shouldUpdate: true,
    };
    const mockGet = jest.spyOn(axios, "get").mockResolvedValueOnce(mockData);

    let setUser: any = jest.fn();

    await act(async () => {
      render(<Page user={mockUser} setUser={setUser} />);
      await handleUpdatePageData();
    });

    expect(mockGet).toHaveBeenCalledWith(
      `http://localhost:3000/users/${mockUser.email}`,
      {
        headers: { Authorization: `Bearer ${mockUser.accessToken}` },
      }
    );
    expect(setUser).toHaveBeenCalledWith({
      ...mockData.data,
      accessToken: mockUser.accessToken,
      shouldUpdate: !mockUser.shouldUpdate,
    });
  });
});
