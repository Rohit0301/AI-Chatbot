import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { FC, memo, useState } from "react";
import ThumbUp from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import RepeatIcon from "@mui/icons-material/Repeat";
import ThumbDown from "@mui/icons-material/ThumbDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import {
  copyBotMessage,
  generateBotMessage,
} from "../services/BotActionButtons";
import CommentForm from "./CommentForm";
import UserComment from "./UserComment";
import { IMessage } from "../../../types";
import { useChatbotContext } from "../../../context/chatbot";
import LiveTypingEffect from "../../../components/LiveTypingEffect";

interface Props {
  message: IMessage;
}

const BotMessageCard: FC<Props> = memo(({ message }): JSX.Element => {
  const { stopWritingBotMessage } = useChatbotContext() || {};
  const [showActions, setShowAction] = useState<boolean>(false);

  return (
    <Box sx={{ position: "relative" }}>
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
            whiteSpace: "pre-line",
            borderTopLeftRadius: 0,
          }}
          onMouseEnter={() => setShowAction(true)}
          onMouseLeave={() => setShowAction(false)}
        >
          {message.isWritting ? (
            <LiveTypingEffect
              message={message.text}
              onComplete={() => stopWritingBotMessage?.()}
            />
          ) : (
            message.text
          )}
          {!message.isWritting && showActions && <Actions message={message} />}
        </Paper>
      </Stack>
      {Boolean(message.comment) && (
        <UserComment comment={message.comment || ""} />
      )}
    </Box>
  );
});

const Actions: FC<{
  message: IMessage;
}> = ({ message }): JSX.Element => {
  const [openComment, setOpenComment] = useState<boolean>(false);
  const { addNewBotMessage, likeUnlikeBotMessage } = useChatbotContext() || {};

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
        borderRadius: 0.5,
        height: "max-content",
        backgroundColor: "#222",
        position: "absolute",
      }}
    >
      {!openComment ? (
        <>
          <IconButton
            sx={{ p: 0, height: "max-content" }}
            aria-label="copy"
            onClick={() => copyBotMessage(message?.text)}
          >
            <ContentCopyIcon sx={{ fontSize: "22px" }} />
          </IconButton>
          <IconButton
            aria-label="like"
            sx={{ p: 0, height: "max-content" }}
            onClick={() => likeUnlikeBotMessage?.(message?.id, true)}
          >
            {message?.likeOrUnlike === "like" ? (
              <ThumbUp sx={{ fontSize: "22px" }} color="primary" />
            ) : (
              <ThumbUpOffAltIcon sx={{ fontSize: "22px" }} />
            )}
          </IconButton>
          <IconButton
            aria-label="unlike"
            sx={{ p: 0, height: "max-content" }}
            onClick={() => likeUnlikeBotMessage?.(message?.id, false)}
          >
            {message?.likeOrUnlike === "unlike" ? (
              <ThumbDown sx={{ fontSize: "22px" }} color="primary" />
            ) : (
              <ThumbDownOffAltIcon sx={{ fontSize: "22px" }} />
            )}
          </IconButton>
          <IconButton
            aria-label="comment"
            sx={{ p: 0, height: "max-content" }}
            onClick={() => setOpenComment(true)}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: "22px" }} />
          </IconButton>
          <IconButton
            aria-label="regenerate-response"
            sx={{ p: 0, height: "max-content" }}
            onClick={async () =>
              await generateBotMessage(
                message?.userMessage || "",
                addNewBotMessage,
                message?.id
              )
            }
          >
            <RepeatIcon sx={{ fontSize: "22px" }} />
          </IconButton>
        </>
      ) : (
        <CommentForm
          commentId={message?.id}
          oldComment={message.comment}
          setOpenComment={setOpenComment}
        />
      )}
    </Stack>
  );
};

export default BotMessageCard;
