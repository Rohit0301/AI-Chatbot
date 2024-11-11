import {
  FC,
  Context,
  useState,
  ReactNode,
  useEffect,
  createContext,
  useContext,
} from "react";

import { IMessage } from "../../types";
import { getDataFromStorage, setDataToStorage } from "../../lib/storage";

const MESSAGES_STORAGE_KEY = "chatbot-messages";

interface IChatbotContext {
  messages: IMessage[];
  addNewBotMessage: (botMessage: IMessage) => void;
  addNewUserMessage: (userMessage: IMessage) => void;
}

const ChatbotContext: Context<IChatbotContext | null> =
  createContext<IChatbotContext | null>(null);

export const ChatbotProvider: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    loadMessagesFromStorage();
  }, []);

  /**
   * Loads the messages from local storage and updates the state.
   */
  const loadMessagesFromStorage = (): void => {
    setMessages(getDataFromStorage(MESSAGES_STORAGE_KEY) || []);
  };

  /**
   * Adds a new user message and stores the updated messages in local storage.
   * @param userMessage - user message.
   */
  const addNewUserMessage = async (userMessage: IMessage): Promise<void> => {
    setMessages((prev: IMessage[]) => {
      setDataToStorage(MESSAGES_STORAGE_KEY, [...prev, userMessage]);
      return [...prev, userMessage];
    });
  };

  /**
   * Adds a new bot message and stores the updated messages in local storage.
   * @param botMessage - user message.
   */
  const addNewBotMessage = async (botMessage: IMessage): Promise<void> => {
    setMessages((prev: IMessage[]) => {
      setDataToStorage(MESSAGES_STORAGE_KEY, [...prev, botMessage]);
      return [...prev, botMessage];
    });
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        addNewBotMessage,
        addNewUserMessage,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = (): IChatbotContext | null => {
  const context: IChatbotContext | null = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbotContext must be used within a ChatbotProvider");
  }
  return context;
};