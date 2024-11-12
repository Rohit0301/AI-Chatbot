import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

import { useChatbotContext } from "../../../context/chatbot";

interface Props {
  commentId: string;
  oldComment?: string;
  setOpenComment: (value: boolean) => void;
}

const CommentForm: FC<Props> = ({
  commentId,
  setOpenComment,
  oldComment,
}): JSX.Element => {
  const [comment, setComment] = useState<string>("");
  const { updateUserComment } = useChatbotContext() || {};

  useEffect(() => {
    if (oldComment) setComment(oldComment);
  }, [oldComment]);

  return (
    <Fragment>
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          rows={1}
          multiline
          value={comment}
          variant="outlined"
          placeholder="Enter Comment"
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setComment(event.target.value)
          }
          sx={{
            "& .MuiOutlinedInput-root": { p: 0.5, px: 1, borderRadius: 0.5 },
            "& textarea": { p: 0, "::placeholder": { fontSize: "14px" } },
          }}
        />
        <IconButton
          sx={{ p: 0 }}
          onClick={() => updateUserComment?.(comment, commentId)}
        >
          <CheckBoxOutlinedIcon sx={{ fontSize: "26px", opacity: 0.5 }} />
        </IconButton>
        <IconButton sx={{ p: 0 }} onClick={() => setOpenComment(false)}>
          <DisabledByDefaultOutlinedIcon
            sx={{ fontSize: "26px", opacity: 0.5 }}
          />
        </IconButton>
      </Stack>
    </Fragment>
  );
};

export default CommentForm;
