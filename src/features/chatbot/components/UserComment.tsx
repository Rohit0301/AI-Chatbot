import { FC, Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Person from "@mui/icons-material/Person";
import { Theme, useTheme } from "@mui/material";

interface Props {
  comment: string;
}
const UserComment: FC<Props> = ({ comment }): JSX.Element => {
  const theme: Theme = useTheme();
  return (
    <Fragment>
      <Box
        sx={{
          top: "44px",
          left: "22px",
          border: `2px solid ${theme.palette.primary.main}`,
          width: "60px",
          bottom: "20px",
          borderTop: 0,
          borderRight: 0,
          position: "absolute",

          borderBottomLeftRadius: "16px",
        }}
      ></Box>

      <Stack
        direction="row"
        spacing={1}
        alignItems="flex-end"
        sx={{ mt: 3, paddingLeft: "4rem" }}
      >
        <Avatar sx={{ width: 44, height: 44 }}>
          <Person color="secondary" aria-label="person-icon" />
        </Avatar>
        <Paper
          aria-label="user-message-card"
          sx={{
            p: 2,
            maxWidth: "70%",
            whiteSpace: "pre-line",
            borderBottomLeftRadius: 0,
          }}
        >
          {comment}
        </Paper>
      </Stack>
    </Fragment>
  );
};

export default UserComment;
