import Navbar from "./Navbar";
import { screen, render } from "@testing-library/react";

describe("Navbar", () => {
  test("Render Navbar correctly", () => {
    render(<Navbar />);
    expect(
      screen.getByRole("heading", { name: "Chatbot" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("user-profile-icon")).toBeInTheDocument();
  });
});
