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
  addNewBotMessage:
    | undefined
    | ((message: IMessage, userMessagePayload: IMessage | null) => void),
  messageId?: string
): Promise<void> => {
  const botMessagePayload: IMessage = {
    text: "",
    isWritting: true,
    isBotMessage: true,
    userMessage: message,
    id: messageId || uuidv4(),
  };
  const userMessagePayload: IMessage | null = messageId
    ? { id: uuidv4(), text: message }
    : null;
  try {
    const botMessage: string = await generateAIResponse(message);

    addNewBotMessage?.(
      { ...botMessagePayload, text: botMessage },
      userMessagePayload
    );
  } catch {
    addNewBotMessage?.(
      {
        ...botMessagePayload,
        text: "Something went wrong while generating response!",
      },
      userMessagePayload
    );
  }
};
