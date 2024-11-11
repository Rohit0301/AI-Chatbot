import { FC, memo } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Person } from "@mui/icons-material";
import { useTheme } from "@mui/material";

interface Props {
  message: string;
}

const UserMessageCard: FC<Props> = memo(({ message }): JSX.Element => {
  const theme = useTheme();
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
          borderBottomRightRadius: 0,
          maxWidth: "70%",
          bgcolor: theme.palette.primary.main,
        }}
      >
        {message}
      </Paper>
      <Avatar sx={{ width: 44, height: 44 }}>
        <Person color="secondary" aria-label="person-icon" />
      </Avatar>
    </Stack>
  );
});

export default UserMessageCard;
