import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { ChangeEvent, KeyboardEvent, useState } from "react";

import { useChatbotContext } from "../../../context/chatbot";
import { generateBotMessage } from "../services/BotActionButtons";

const InputForm = (): JSX.Element => {
  const [userMessage, setUserMessage] = useState<string>("");
  const { isBotTyping, addNewUserMessage, addNewBotMessage } =
    useChatbotContext() || {};

  const addNewMessage = async (): Promise<void> => {
    const message: string = userMessage?.trim();
    if (!message) return;
      addNewUserMessage?.({
        id: uuidv4(),
        text: message,
      });
    setUserMessage("");
    await generateBotMessage(message, addNewBotMessage);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === "Enter") {
      if (event.metaKey || event.ctrlKey) {
        event.preventDefault();
        setUserMessage((prev) => prev + "\n");
      } else {
        event.preventDefault();
        addNewMessage();
      }
    }
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
          onKeyDown={handleKeyDown}
          placeholder="Type Message Here..."
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setUserMessage(event.target.value)
          }
        />
        <IconButton
          onClick={addNewMessage}
          disabled={!userMessage || isBotTyping}
          sx={{ transform: "rotate(-45deg)" }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default InputForm;
