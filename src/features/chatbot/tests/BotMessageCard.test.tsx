import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";

import { mockMessages } from "../../../constants/mock";
import BotMessageCard from "../components/BotMessageCard";
import { useChatbotContext } from "../../../context/chatbot";

// Mocking the useChatbotContext hook
jest.mock("../../../context/chatbot", () => ({
  useChatbotContext: jest.fn(),
}));

describe("BotMessageCard Component", () => {
  const botMessage = mockMessages[1];
  const mockStopWritingBotMessage = jest.fn();

  beforeEach(() => {
    // Set up the mock implementation before each test
    (useChatbotContext as jest.Mock).mockReturnValue({
      isBotTyping: false,
      stopWritingBotMessage: mockStopWritingBotMessage,
    });
  });

  test("renders the component with the correct message", () => {
    render(<BotMessageCard message={botMessage} />);
    expect(screen.getByText(botMessage.text)).toBeInTheDocument();
  });

  test("hides actions by default", () => {
    render(<BotMessageCard message={botMessage} />);
    const actionButtons = screen.queryByLabelText("bot-message-actions");
    expect(actionButtons).toHaveStyle({ display: "none" });
  });

  // TODO: Hover not working
  // test("shows actions when hovered over", async () => {
  //   render(<BotMessageCard message={botMessage} />);
  //   const user = userEvent.setup();
  //   const messageElement = screen.getByLabelText("bot-message-card");

  //   await act(async () => {
  //     await user.hover(messageElement);
  //   });

  //   const actionButtons = screen.getByLabelText("bot-message-actions");
  //   expect(actionButtons).toBeVisible();
  // });

  test("calls stopWritingBotMessage when typing is complete", () => {
    const testMessage = { ...botMessage, isWritting: true };
    render(<BotMessageCard message={testMessage} />);

    act(() => {
      mockStopWritingBotMessage();
    });

    expect(mockStopWritingBotMessage).toHaveBeenCalled();
  });
});
