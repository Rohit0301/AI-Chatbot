import { FC, memo } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Person } from "@mui/icons-material";
import { Theme, useTheme } from "@mui/material";

import { IMessage } from "../../../types";

interface Props {
  message: IMessage;
}

const UserMessageCard: FC<Props> = memo(({ message }): JSX.Element => {
  const theme: Theme = useTheme();
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-end"
      alignItems="end"
      sx={{ mb: 2 }}
    >
      <Paper
        aria-label="user-message-card"
        sx={{
          p: 2,
          maxWidth: "70%",
          whiteSpace: "pre-line",
          borderBottomRightRadius: 0,
          bgcolor: theme.palette.primary.main,
        }}
      >
        {message.text}
      </Paper>
      <Avatar sx={{ width: 44, height: 44 }}>
        <Person color="secondary" aria-label="person-icon" />
      </Avatar>
    </Stack>
  );
});

export default UserMessageCard;
