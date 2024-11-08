import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const InputForm = (): JSX.Element => {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "end" }}>
      <Input
        multiline
        id="prompt-input"
        name="prompt-input"
        placeholder="Type your message here..."
      />
      <IconButton disabled sx={{ transform: "rotate(-45deg)" }}>
        <SendIcon />
      </IconButton>
    </Stack>
  );
};

export default InputForm;
