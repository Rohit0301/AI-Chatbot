import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { IMessage } from "../../../types";
import { generateAIResponse } from "../../../service/openai";

export const copyBotMessage = async (message: string): Promise<void> => {
  await navigator.clipboard.writeText(message);
  toast.info("Message copied !");
};

export const generateBotMessage = async (
  message: string,
  addNewBotMessage: undefined | ((message: IMessage) => void),
  messageId?: string
): Promise<void> => {
  try {
    const botMessage: string = await generateAIResponse(message);
      addNewBotMessage?.({
        id: messageId || uuidv4(),
        text: botMessage,
        isWritting: true,

        isBotMessage: true,
      });
  } catch {
      addNewBotMessage?.({
        id: messageId || uuidv4(),
        isBotMessage: true,
        isWritting: true,
        userMessage: message,
        text: "Something went wrong while generating response!",
      });
  }
};
