import { IMessage } from "../types";

export const mockMessages: IMessage[] = [
  {
    id: "abc-123",
    text: "hello",
  },
  {
    id: "abc-124",
    isBotMessage: true,
    likeOrUnlike: "like",
    isWritting: false,
    userMessage: "hello",
    text: "Hello, how can i help you",
  },
];
