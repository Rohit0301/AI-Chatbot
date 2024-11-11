import { IMessage } from "../types";

export const mockMessages: IMessage[] = [
  {
    id: "abc-123",
    message: "hello",
  },
  {
    id: "abc-124",
    isBotMessage: true,
    likeOrUnlike: "like",
    message: "Hello, how can i help you",
  },
];
