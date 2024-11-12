import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import InputForm from "../components/InputForm";
import { useChatbotContext } from "../../../context/chatbot";

// Mocking the useChatbotContext hook
jest.mock("../../../context/chatbot", () => ({
  useChatbotContext: jest.fn(),
}));

describe("InputForm Component", () => {
  const addNewUserMessageMock = jest.fn();
  const addNewBotMessageMock = jest.fn();

  beforeEach(() => {
    // Set up the mock implementation before each test
    (useChatbotContext as jest.Mock).mockReturnValue({
      addNewUserMessage: addNewUserMessageMock,
      addNewBotMessage: addNewBotMessageMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and button", () => {
    render(<InputForm />);
    expect(
      screen.getByPlaceholderText("Type Message Here...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("updates input value when typing", async () => {
    const user = userEvent.setup();
    render(<InputForm />);
    const inputElement = screen.getByPlaceholderText("Type Message Here...");

    await user.type(inputElement, "Hello");
    expect(inputElement).toHaveValue("Hello");
  });

  test("disables the send button when input is empty", () => {
    render(<InputForm />);
    const sendButton = screen.getByRole("button");
    expect(sendButton).toBeDisabled();
  });

  test("disables the send button when bot is typing", async () => {
    const user = userEvent.setup();
    (useChatbotContext as jest.Mock).mockReturnValue({
      isBotTyping: true,
    });
    render(<InputForm />);
    const inputElement = screen.getByPlaceholderText("Type Message Here...");

    await user.type(inputElement, "Hello");
    const sendButton = screen.getByRole("button");
    expect(sendButton).toBeDisabled();
  });

  test("enables the send button when there is text in the input", async () => {
    render(<InputForm />);
    const inputElement = screen.getByPlaceholderText("Type Message Here...");
    const sendButton = screen.getByRole("button");
    const user = userEvent.setup();

    await user.type(inputElement, "Hello");
    expect(sendButton).toBeEnabled();
  });

  test("calls addNewUserMessage with correct arguments and clears input on submit", async () => {
    render(<InputForm />);
    const inputElement = screen.getByPlaceholderText("Type Message Here...");
    const sendButton = screen.getByRole("button");
    const user = userEvent.setup();

    // Type a message and click the send button
    await user.type(inputElement, "Test Message");
    await user.click(sendButton);

    // Check that addNewUserMessage was called with the correct parameters
    expect(addNewUserMessageMock).toHaveBeenCalledWith({
      id: expect.any(String),
      text: "Test Message",
    });

    await waitFor(()=>{
      // Ensure input is cleared after submission
      expect(inputElement).toHaveValue("")
    })
  });

  test("Do not calls addNewUserMessage if text is empty after trim", async () => {
    render(<InputForm />);
    const inputElement = screen.getByPlaceholderText("Type Message Here...");
    const sendButton = screen.getByRole("button");
    const user = userEvent.setup();

    // Type a message and click the send button
    await user.type(inputElement, "     ");
    await user.click(sendButton);

    // Check that addNewUserMessage should not be called
    expect(addNewUserMessageMock).not.toHaveBeenCalledWith({
      id: expect.any(String),
      text: "Test Message",
    });
  });

  test("submits form on Enter key press", async () => {
    const user = userEvent.setup();
    render(<InputForm />);
    const inputElement = screen.getByPlaceholderText("Type Message Here...");
    await user.type(inputElement, "Hello {enter}");
    expect(addNewUserMessageMock).toHaveBeenCalled();
  });

  test("inserts new line on Cmd+Enter (Mac) or Ctrl+Enter (Windows)", async () => {
    const user = userEvent.setup();
    render(<InputForm />);
    const inputElement = screen.getByPlaceholderText("Type Message Here...");
    
    // Simulate Ctrl+Enter for mac (Ctrl key)
    await user.type(inputElement, "test");
    const metaEnterEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      metaKey: true,
      bubbles: true,
    });
    fireEvent(inputElement, metaEnterEvent);
    await user.type(inputElement, "hi");
    expect(inputElement).toHaveValue("test\nhi");

    await user.clear(inputElement);

    // Simulate Ctrl+Enter for Windows/Linux (Ctrl key)
    await user.type(inputElement, "test");
    const ctrlEnterEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      ctrlKey: true,
      bubbles: true

    });
    fireEvent(inputElement, ctrlEnterEvent);
    await user.type(inputElement, "hi");
    expect(inputElement).toHaveValue("test\nhi");
  });
});
