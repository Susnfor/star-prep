import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function RecordingActions({isPrepTimeOver, isRecording, handlePrepTimeEnd, handleRecordingTimeEnd}) {
    return (
         <Box mt={2}>
                    {!isPrepTimeOver && <Button onClick={handlePrepTimeEnd}>Skip Preparation Time</Button>}
                    {isRecording && <Button onClick={handleRecordingTimeEnd}>End Recording</Button>}
                </Box>
    )
}