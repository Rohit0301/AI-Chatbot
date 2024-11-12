import { toast } from "react-toastify";

import { generateAIResponse } from "../../../service/openai";
import { copyBotMessage, generateBotMessage } from "./BotActionButtons";

jest.mock("react-toastify", () => ({
  toast: {
    info: jest.fn(),
  },
}));

jest.mock("../../../service/openai", () => ({
  generateAIResponse: jest.fn(),
}));

describe("Bot message functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("copyBotMessage should copy message to clipboard and show toast", async () => {
    const message = "Test message";

    // Mocking clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    await copyBotMessage(message);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(message);
    expect(toast.info).toHaveBeenCalledWith("Message copied !");
  });

  test("generateBotMessage should call addNewBotMessage with the correct parameters on success", async () => {
    const addNewBotMessage = jest.fn();
    const message = "Hello, bot!";
    const botResponse = "Hello, user!";
    const messageId = "12345";

    (generateAIResponse as jest.Mock).mockResolvedValue(botResponse);
    await generateBotMessage(message, addNewBotMessage, messageId);

    expect(addNewBotMessage).toHaveBeenCalledWith({
      id: messageId,
      text: botResponse,
      isWritting: true,
      isBotMessage: true,
    });
  });


  test("generateBotMessage should call addNewBotMessage with the new message Id", async () => {
    const addNewBotMessage = jest.fn();
    const message = "Hello, bot!";
    const botResponse = "Hello, user!";

    (generateAIResponse as jest.Mock).mockResolvedValue(botResponse);
    await generateBotMessage(message, addNewBotMessage);

    expect(addNewBotMessage).toHaveBeenCalledWith({
      id: expect.any(String),
      text: botResponse,
      isWritting: true,
      isBotMessage: true,
    });
  });

  test("should not call addNewBotMessage if it is undefined", async () => {
    const message = "Hello, bot!";
    const botResponse = "Hello, user!";
    const addNewBotMessage = jest.fn();

    (generateAIResponse as jest.Mock).mockResolvedValue(botResponse);
    await generateBotMessage(message, undefined);

    expect(addNewBotMessage).not.toHaveBeenCalledWith({
      id: expect.any(String),
      text: botResponse,
      isWritting: true,
      isBotMessage: true,
    });
  });

  test("generateBotMessage should call addNewBotMessage with an error message on failure", async () => {
    const addNewBotMessage = jest.fn();
    const message = "Hello, bot!";
    const messageId = "12345";

    (generateAIResponse as jest.Mock).mockRejectedValue(
      new Error("Failed to generate response")
    );
    await generateBotMessage(message, addNewBotMessage, messageId);
    expect(addNewBotMessage).toHaveBeenCalledWith({
      id: messageId,
      isBotMessage: true,
      isWritting: true,
      userMessage: message,
      text: "Something went wrong while generating response!",
    });
  });

  test("generateBotMessage should call addNewBotMessage with an error message on failure with new message id", async () => {
    const addNewBotMessage = jest.fn();
    const message = "Hello, bot!";

    (generateAIResponse as jest.Mock).mockRejectedValue(
      new Error("Failed to generate response")
    );
    await generateBotMessage(message, addNewBotMessage);
    expect(addNewBotMessage).toHaveBeenCalledWith({
      id: expect.any(String),
      isBotMessage: true,
      isWritting: true,
      userMessage: message,
      text: "Something went wrong while generating response!",
    });
  });
});
