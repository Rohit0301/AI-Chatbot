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
  isBotTyping: boolean;
  stopWritingBotMessage: () => void;
  addNewBotMessage: (botMessage: IMessage) => void;
  addNewUserMessage: (userMessage: IMessage) => void;
  updateUserComment: (comment: string, messageId: string) => void;
  likeUnlikeBotMessage: (messageId: string, isLike: boolean) => void
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
  const addNewBotMessage = async (
    botMessage: IMessage,
    userMessage?: IMessage | null
  ): Promise<void> => {
    setMessages((prev: IMessage[]) => {
      // If the message is regenerated then add user message again with new response.
      prev = [...prev, ...(userMessage ? [userMessage] : [])];
      setDataToStorage(MESSAGES_STORAGE_KEY, [...prev, botMessage]);
      return [...prev, botMessage];
    });
  };

  /**
   * Stops the typing effect of bot last message.
   */
  const stopWritingBotMessage = (): void => {
    let updatedMessage: IMessage[] = [...messages];
    const lastIndex: number = updatedMessage.length - 1;
    updatedMessage[lastIndex] = {
      ...updatedMessage[lastIndex],
      isWritting: false,
    };
    setMessages(updatedMessage);
    setDataToStorage(MESSAGES_STORAGE_KEY, updatedMessage);
  };

  /**
   * Likes or unlike last bot message.
   * @param messageId - last bot message id
   * @param isLike - if true user like the message if false use dislike the message
   */
  const likeUnlikeBotMessage = (messageId: string, isLike: boolean): void => {
    const updatedMessage: IMessage[] = messages.map((message: IMessage) =>
      message?.id !== messageId
        ? message
        : {
            ...message,
            likeOrUnlike: isLike ? "like" : "unlike",
          }
    );
    setMessages(updatedMessage);
    setDataToStorage(MESSAGES_STORAGE_KEY, updatedMessage);
  };
  
  /**
   * Updated the bot message comment and store it in localstorage
   * @param comment - user comment
   * @param messageId - bot message id on which user comment
   */
  const updateUserComment = (comment: string, messageId: string): void => {
    const updatedMessage: IMessage[] = messages.map((message: IMessage) =>
      message?.id !== messageId
        ? message
        : {
            ...message,
            comment: comment
          }
    );
    setMessages(updatedMessage);
    setDataToStorage(MESSAGES_STORAGE_KEY, updatedMessage);
  }

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        updateUserComment,
        addNewBotMessage,
        addNewUserMessage,
        stopWritingBotMessage,
        likeUnlikeBotMessage,
        isBotTyping: Boolean(messages?.[messages?.length - 1]?.isWritting),
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
