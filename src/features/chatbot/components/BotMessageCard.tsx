import { FC, memo } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import RepeatIcon from "@mui/icons-material/Repeat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { IMessage } from "../../../types";

interface Props {
  message: IMessage;
}

const BotMessageCard: FC<Props> = memo(({ message }): JSX.Element => {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      <Avatar sx={{ width: 44, height: 44 }}>
        <AutoAwesomeIcon color="secondary" />
      </Avatar>
      <Paper
        aria-label="bot-message-card"
        sx={{
          p: 2,
          pb: 4,
          maxWidth: "70%",
          minWidth: "200px",
          position: "relative",
          borderTopLeftRadius: 0,
          "&:hover .bot-message-actions": {
            display: "flex",
          },
        }}
      >
        {message.text}
        <Actions />
      </Paper>
    </Stack>
  );
});

const Actions = (): JSX.Element => {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      aria-label="bot-message-actions"
      className="bot-message-actions"
      sx={{
        p: 1,
        right: 0,
        bottom: "-18px",
        display: "none",
        borderRadius: 0.5,
        height: "max-content",
        backgroundColor: "#222",
        position: "absolute",
      }}
    >
      <IconButton sx={{ p: 0, height: "max-content" }} aria-label="action-button">
        <ContentCopyIcon sx={{ fontSize: "22px" }} />
      </IconButton>
      <IconButton sx={{ p: 0, height: "max-content" }}>
        <ThumbUpOffAltIcon sx={{ fontSize: "22px" }} />
      </IconButton>
      <IconButton sx={{ p: 0, height: "max-content" }}>
        <ThumbDownOffAltIcon sx={{ fontSize: "22px" }} />
      </IconButton>
      <IconButton sx={{ p: 0, height: "max-content" }}>
        <ChatBubbleOutlineIcon sx={{ fontSize: "22px" }} />
      </IconButton>
      <IconButton sx={{ p: 0, height: "max-content" }}>
        <RepeatIcon sx={{ fontSize: "22px" }} />
      </IconButton>
    </Stack>
  );
};

export default BotMessageCard;
