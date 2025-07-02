import Box from "@mui/material/Box";
import CountDownComponent from "@/app/components/ui/CountdownComponent";

export default function RecordingActions({isPrepTimeOver, setupData, isRecording, handlePrepTimeEnd, handleRecordingTimeEnd, keyTimer}) {
    return (
         <Box sx={{ display: "flex", justifyContent:"flex-end"}}>
    {!isPrepTimeOver && <CountDownComponent
                key={`prep-${keyTimer}`}
                    isPlaying={!isPrepTimeOver}
                    onComplete={handlePrepTimeEnd}
                    time={setupData.prepTime}
                    label="Prep Time Left"
                    
                    />}
                {isRecording &&   <CountDownComponent
                    key={`record-${keyTimer}`}
                    isPlaying={isRecording}
                    onComplete={handleRecordingTimeEnd}
                    time={setupData.recordingTime}
                    label="Recording Time Left"
                
                    />}
                
                  
                </Box>
    )
}