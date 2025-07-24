import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function RecordingActions({isPrepTimeOver, isRecording, handlePrepTimeEnd, handleRecordingTimeEnd}) {
    return (
         <Box          sx={{ 
                minHeight: 60, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mt: 2 
            }}>
                    {!isPrepTimeOver && <Button onClick={handlePrepTimeEnd}>Skip Preparation Time</Button>}
                    {isRecording && <Button onClick={handleRecordingTimeEnd}>End Recording</Button>}
                    {isPrepTimeOver && !isRecording && <Box sx={{ minWidth: 180, minHeight: 36 }} />}
                </Box>
    )
}