//for the question controls in the session page
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function QuestionControls({ onNext, onRetake, onDownload }) {
  return (
      <ButtonGroup sx={{ mt: 2 }}>
        <Button onClick={onNext} color="success">Next Question</Button>
        <Button onClick={onRetake}>Retake Question</Button>
        <Button onClick={onDownload}>Download</Button>
      </ButtonGroup>
  );
}
