import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Person } from "@mui/icons-material";
import Typography  from "@mui/material/Typography";

const Navbar = (): JSX.Element => {
  return (
    <Stack
      direction="row"
      p={3}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5">Chatbot</Typography>
      <Avatar sx={{ width: 32, height: 32 }} aria-label="user-profile-icon">
        <Person />
      </Avatar>
    </Stack>
  );
};

export default Navbar;
