import { render, screen } from "@testing-library/react";

import { mockMessages } from "../../../constants/mock";
import { useChatbotContext } from "../../../context/chatbot";
import MessageContainer from "../components/MessageContainer";

jest.mock("../../../context/chatbot");

describe("MessageContainer Component", () => {
  // Mock data that will be returned by the useChatbotContext
  const messages = mockMessages;

  beforeEach(() => {
    (useChatbotContext as jest.Mock).mockReturnValue({
      messages: messages,
    });
  });

  test("renders correct number of BotMessageCard and UserMessageCard components", () => {
    render(<MessageContainer />);

    // Check if the number of bot messages and user messages match
    const botMessages = screen.getAllByLabelText("bot-message-card");
    const userMessages = screen.getAllByLabelText("user-message-card");
    // Ensure the right number of message cards are rendered
    expect(botMessages.length).toBe(1);
    expect(userMessages.length).toBe(1);
  });

  test("renders BotMessageCard when message is from the bot", () => {
    render(<MessageContainer />);

    // Check if the bot message card is rendered
    const botMessageCard = screen.getByText(mockMessages[0].text);
    expect(botMessageCard).toBeInTheDocument();
  });

  test("renders UserMessageCard when message is from the user", () => {
    render(<MessageContainer />);

    // Check if the user message card is rendered
    const userMessageCard = screen.getByText(mockMessages[1].text);
    expect(userMessageCard).toBeInTheDocument();
  });

  test("does not render messages when there are no messages", () => {
    // Mock an empty messages array
    (useChatbotContext as jest.Mock).mockReturnValue({
      messages: [],
    });

    render(<MessageContainer />);

    // Ensure no message cards are rendered
    const noMessages = screen.queryByText("Hello");
    expect(noMessages).not.toBeInTheDocument();
  });
});
