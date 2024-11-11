import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const InputForm = (): JSX.Element => {
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
          placeholder="Type Message Here..."
        />
        <IconButton disabled sx={{ transform: "rotate(-45deg)" }}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default InputForm;
