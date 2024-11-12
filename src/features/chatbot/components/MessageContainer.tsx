import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BotMessageCard from "./BotMessageCard";
import UserMessageCard from "./UserMessageCard";

import { IMessage } from "../../../types";
import { useChatbotContext } from "../../../context/chatbot";

const MessageContainer = () => {
  const { messages } = useChatbotContext() || {};
 
  return (
    <Box sx={{ flex: 1, overflowY: "scroll" }}>
      <Stack
        sx={{ py: 2, maxWidth: "800px", margin: "auto" }}
        justifyContent="flex-end"
      >
        {messages?.map((message: IMessage) =>
          message?.isBotMessage ? (
            <BotMessageCard key={message.id} message={message}/>
          ) : (
            <UserMessageCard key={message.id} message={message} />
          )
        )}
      </Stack>
    </Box>
  );
};

export default MessageContainer;
