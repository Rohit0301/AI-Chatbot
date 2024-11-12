import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { IMessage } from "../../../types";
import { generateAIResponse } from "../../../service/openai";

  /**
   * Copy the message to the clipboard
   * @param message - bot message which need to copy to clipboard
  */
export const copyBotMessage = async (message: string): Promise<void> => {
  await navigator.clipboard.writeText(message);
  toast.info("Message copied !");
};

  /**
   * It calls the api to generate ai response
   * @param message - user message which need to send in api playload
   * @param addNewBotMessage - it updated the bot and user messages in local state and localstorage
   * @param messageId - bot message id required while regenerating the response
  */
export const generateBotMessage = async (
  message: string,
  addNewBotMessage:
    | undefined
    | ((message: IMessage, userMessagePayload: IMessage | null) => void),
  messageId?: string
): Promise<void> => {
  const botMessagePayload: IMessage = {
    text: "",
    id: uuidv4(),
    isWritting: true,
    isBotMessage: true,
    userMessage: message,
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
