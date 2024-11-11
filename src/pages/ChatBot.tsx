import { ChatbotProvider } from "../context/chatbot";
import ChatBotContainer from "../features/chatbot";

const ChatBot = (): JSX.Element => {
  return (
    <ChatbotProvider>
      <ChatBotContainer />
    </ChatbotProvider>
  );
};

export default ChatBot;
