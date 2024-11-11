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
   * Updates the state with a new messages and stores it in local storage.
   * @param messages - The updated messages.
   */
  const storeDataToState = (messages: IMessage[]): void => {
    setMessages(messages);
    setDataToStorage(MESSAGES_STORAGE_KEY, messages);
  };

  /**
   * Adds a new user message and stores the updated messages in local storage.
   * @param message - user message.
   */
  const addNewUserMessage = (userMessage: IMessage): void => {
    const updatedMessages: IMessage[] = [...messages, userMessage];
    storeDataToState(updatedMessages);
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        addNewUserMessage,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = (): IChatbotContext | {} => {
  const context: IChatbotContext | {} = useContext(ChatbotContext) || {};
  if (context === undefined) {
    throw new Error("useChatbotContext must be used within a ChatbotProvider");
  }
  return context;
};
