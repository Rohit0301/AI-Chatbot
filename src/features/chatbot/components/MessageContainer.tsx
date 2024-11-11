import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BotMessageCard from "./BotMessageCard";
import UserMessageCard from "./UserMessageCard";

const MessageContainer = () => {
  return (
    <Box sx={{ flex: 1, overflowY: "scroll" }}>
      <Stack
        sx={{ py: 2, maxWidth: "800px", margin: "auto" }}
        justifyContent="flex-end"
      >
        <UserMessageCard message="Hello" />
        <BotMessageCard message="Hello" />
      </Stack>
    </Box>
  );
};

export default MessageContainer;
