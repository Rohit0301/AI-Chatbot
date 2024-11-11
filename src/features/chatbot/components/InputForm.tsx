import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import { ChangeEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

import { useChatbotContext } from "../../../context/chatbot";

const InputForm = (): JSX.Element => {
  const [userMessage, setUserMessage] = useState<string>("");
  const { addNewUserMessage } = useChatbotContext() || {};

  const addNewMessage = () => {
    if (!userMessage.trim()) return;
    addNewUserMessage &&
      addNewUserMessage({
        id: uuidv4(),
        text: userMessage?.trim(),
      });
    setUserMessage("");
  };
  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "end", maxWidth: "800px", margin: "auto" }}
      >
        <Input
          multiline
          maxRows={8}
          id="prompt-input"
          name="prompt-input"
          value={userMessage}
          placeholder="Type Message Here..."
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setUserMessage(event.target.value)
          }
        />
        {/* TODO: this button disable when, bot is writing and no message written  */}
        <IconButton
          onClick={addNewMessage}
          disabled={!userMessage}
          sx={{ transform: "rotate(-45deg)" }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default InputForm;
