import Stack from "@mui/material/Stack";

import InputForm from "./components/InputForm";
import MessageContainer from "./components/MessageContainer";

const ChatBotContainer = (): JSX.Element => {
  return (
    <Stack
      sx={{
        margin: "auto",
        maxWidth: "600px",
        height: "calc(100% - 100px)",
        justifyContent: "space-between",
      }}
    >
      <MessageContainer />
      <InputForm />
    </Stack>
  );
};

export default ChatBotContainer;
