import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";

import { mockMessages } from "../../../constants/mock";
import BotMessageCard from "../components/BotMessageCard";
import { useChatbotContext } from "../../../context/chatbot";
import * as BotActionButtons from "../services/BotActionButtons";


jest.mock("../../../context/chatbot", () => ({
  useChatbotContext: jest.fn(),
}));

jest.mock("../../../components/LiveTypingEffect", () => {
  return ({ message, onComplete }: {message: string, onComplete: Function}) => {
    onComplete();
    return <span>{message}</span>;
  };
});


const mockCopyBotMessage = jest.spyOn(BotActionButtons, "copyBotMessage").mockResolvedValue()
const mockGenerateBotMessage = jest.spyOn(BotActionButtons, 'generateBotMessage').mockResolvedValue()

describe("BotMessageCard Component", () => {
  const botMessage = mockMessages[1];
  const mockLikeUnlikeBotMessage = jest.fn();
  const mockStopWritingBotMessage = jest.fn();

  beforeEach(() => {
    // Set up the mock implementation before each test
    (useChatbotContext as jest.Mock).mockReturnValue({
      addNewBotMessage: mockGenerateBotMessage,
      likeUnlikeBotMessage: mockLikeUnlikeBotMessage,
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

  test("calls stopWritingBotMessage when typing is complete", () => {
    const testMessage = { ...botMessage, isWritting: true };
    render(<BotMessageCard message={testMessage} />);

    act(() => {
      mockStopWritingBotMessage();
    });

    expect(mockStopWritingBotMessage).toHaveBeenCalled();
  });

  test("copies message when copy button is clicked", async () => {
    const user = userEvent.setup()
    render(<BotMessageCard message={botMessage} />);
  
    const copyButton = screen.getByLabelText("copy");
    await user.click(copyButton);

    expect(mockCopyBotMessage).toHaveBeenCalledWith(botMessage.text);
  });

  test("calls like function on like button click", async () => {
    const user = userEvent.setup()
    render(<BotMessageCard message={botMessage} />);

    const likeButton = screen.getByLabelText("like");
    await user.click(likeButton);

    expect(mockLikeUnlikeBotMessage).toHaveBeenCalledWith(botMessage.id, true);
  });

  test("calls unlike function on unlike button click", async () => {
    const user = userEvent.setup()
    render(<BotMessageCard message={botMessage} />);

    const unlikeButton = screen.getByLabelText("unlike");
    await user.click(unlikeButton);

    expect(mockLikeUnlikeBotMessage).toHaveBeenCalledWith(botMessage.id, false);
  });

  test("generates a new message when regenerate button is clicked", async () => {
    const user = userEvent.setup()
    render(<BotMessageCard message={botMessage} />);

    const regenerateButton = screen.getByLabelText("regenerate-response");
    await user.click(regenerateButton);

    expect(mockGenerateBotMessage).toHaveBeenCalledWith(
      botMessage.userMessage,
      expect.any(Function),
      botMessage.id
    );
  });

  test("empty user message if it is undefined", async () => {
    const user = userEvent.setup()
    render(<BotMessageCard message={{...botMessage, userMessage: undefined}} />);

    const regenerateButton = screen.getByLabelText("regenerate-response");
    await user.click(regenerateButton);

    expect(mockGenerateBotMessage).toHaveBeenCalledWith(
      "",
      expect.any(Function),
      botMessage.id
    );
  });

  test("renders LiveTypingEffect when message is in writing state and calls stopWritingBotMessage on completion", async () => {
    render(<BotMessageCard message={{ ...botMessage, isWritting: true }} />);

    expect(screen.getByText(botMessage.text)).toBeInTheDocument();
    expect(mockStopWritingBotMessage).toHaveBeenCalled();
  });

});
