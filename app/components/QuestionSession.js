// display questionsdisplay and also the timer function and video recording component
import VideoRecorderComponent from "./VideoRecorderComponent";
import { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CountDownComponent from "./CountdownComponent";
import { useInterview } from "../context/InterviewContext";
import QuestionDisplay from "./QuestionDisplay";
import Grid from "@mui/material/Grid";
import { DownloadVideos } from "../lib/downloadVideos";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function QuestionSession() {
    // Reference to the video recorder instance
    // This will be used to control recording and access recorded data
    const recorderRef = useRef(null);
    // Access the interview context to get setup data and current question index
    // This will allow us to manage the interview state and navigate through questions
    // It also provides functions to update the current question index
        const { setupData, currentQuestionIndex, setCurrentQuestionIndex } =
        useInterview();

    // State to manage recording status and preparation time
    const [isRecording, setIsRecording] = useState(false);
    const [isPrepTimeOver, setIsPrepTimeOver] = useState(false);

    // Key timer to reset the countdown components when starting a new question, as when key changes, the countdown components will reset
    // This is used to force the countdown components to re-render when starting a new question
    const [keyTimer, setKeyTimer] = useState(0);

    // Router to navigate between pages
    // This will be used to redirect users to the setup page if no questions are available
    const router = useRouter();
    

    // Check if setup data is available and has questions
    // If not, display a message prompting the user to set up the interview
    if (!setupData || !setupData.questions || setupData.questions.length === 0) {
        return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">
            No questions available. Please set up the interview first.
            </Typography>
            <Button onClick={()=> router.push("/")}>Setup</Button>
        </Box>
        );
    }

// Function to handle the end of preparation time
    // This will be called when the preparation countdown reaches zero
    //or when the user clicks the "Skip Preparation Time" button
    const handlePrepTimeEnd = () => {
        setIsPrepTimeOver(true);
        if (recorderRef.current) {
            recorderRef.current.startRecording();
            setIsRecording(true);
            
        
        }
    }
    // Function to handle the end of recording time
    // This will be called when the recording countdown reaches zero
    // or when the user clicks the "End Recording" button
    const handleRecordingTimeEnd = () => {
        setIsRecording(false);
        if (recorderRef.current) {
            recorderRef.current.stopRecording();
          }
    }
    // Function to handle downloading the current recording
    // This will be called when the user clicks the "Download" button
    // It retrieves the current recording from the recorder reference and initiates the download
    // It uses the DownloadVideos class to handle the download process
    const handleRecordingDownload = () => {
        if (recorderRef.current) {
        // get the recording blob
           const recording = recorderRef.current.getCurrentRecording(); //is {id, blob}
           if (recording){
            console.log("Recording saved:", recording);
            // Download the video
            let downloader = new DownloadVideos(recording);
            downloader.downloadCurrentRecording(recording);
            }
        }}

    // Function to handle downloading all recordings
    // This will be called when the user clicks the "Download All" button
    // It retrieves all recordings from the recorder reference and initiates the download
    const handleRecordingDownloadAll = () => {
        if (recorderRef.current) {
            // get all recordings
            const allRecordings = recorderRef.current.getAllRecordings(); //is [{id, blob}, ...]
            if (allRecordings.length > 0) {
                console.log("All recordings saved:", allRecordings);
                // Download all videos
                let downloader = new DownloadVideos(allRecordings);
                downloader.downloadAllRecordings();
            }
        }
    }

    // Function to handle starting the preparation time
    // This will reset the recording state and start the webcam feed
    // It also resets the key timer to force the countdown components to re-render
    // This is called when the user clicks the "Next Question" or "Retake Question" buttons
    const handlePrepStart = () => {
        setIsRecording(false);
        setIsPrepTimeOver(false);
        if (recorderRef.current) {
            recorderRef.current.startWebcamFeed();
        }
        setKeyTimer((prev) => prev + 1); // Reset timer by changing key
    }

    // Function to handle retaking the current question
    // This will reset the recording state and start the preparation time again
    const handleRetakeQuestion = () => {
        handlePrepStart();
        
    }
    // Function to handle moving to the next question
    // This will reset the recording state, start the webcam feed, and prepare for the next question
    // It also resets the preparation time to allow the user to prepare for the next question
    // This is called when the user clicks the "Next Question" button
    const handleNextQuestion = () => {
        setIsRecording(false);
        setIsPrepTimeOver(false);
        if (recorderRef.current) {
            recorderRef.current.startWebcamFeed();
        }
        setCurrentQuestionIndex((prev) => Math.min(prev + 1))
        handlePrepStart();
    }

    // If the current question index exceeds the number of questions, display a completion message
    // This will show a message indicating that the interview is completed and provide options to start over
    // or redo the interview, and download all recordings
    // It also resets the current question index to allow starting over
     if (currentQuestionIndex >= setupData.numQuestions) {
        return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">Interview completed. Thank you!</Typography>
            <Button
            variant="contained"
            color="primary"
            onClick={() => {router.push("/"); setCurrentQuestionIndex(0);}}
            >
            Start Over
            </Button>
            <Button onClick={()=> setCurrentQuestionIndex(0)}>Redo</Button>
            <Button onClick={handleRecordingDownloadAll}>Download All</Button>
        </Box>
        );
    }


    return (
        <Box
        sx={{
            minHeight: "100vh",
            width: "100%",
            bgcolor: "background.default",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
        }}
        >
        <Paper
            elevation={4}
            sx={{
            p: 4,
            width: "100%",
            minHeight: 700,
            mx: "auto",
            textAlign: "center",
            borderRadius: 3,
            display: "flex",
            }}
        >

            <Grid container spacing={2} >
                <Grid size={12}>
                            
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
                </Grid>
            <Grid size={6}>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "0 auto",
                }}
                >
                <QuestionDisplay
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                />
                <Box mt={2}>
                    {!isPrepTimeOver && <Button onClick={handlePrepTimeEnd}>Skip Preparation Time</Button>}
                    {isRecording && <Button onClick={handleRecordingTimeEnd}>End Recording</Button>}
                </Box>
                <Box mt={2}>
                    <ButtonGroup ariant="outlined" aria-label="Loading button group">
                    <Button onClick={handleNextQuestion} color="success">Next Question</Button>
                    <Button  onClick={handleRetakeQuestion}>Retake Question</Button>
                    <Button onClick={handleRecordingDownload}>Download</Button>
                    </ButtonGroup>

                </Box>
                </Box>
            </Grid>

            <Grid size={6}>
               
                <VideoRecorderComponent
                    isRecording={isRecording}
                    setIsRecording={setIsRecording}
                    isPrepTimeOver={isPrepTimeOver}
                    setIsPrepTimeOver={setIsPrepTimeOver}
                    recorderRef={recorderRef}
                />
                {isRecording && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                🔴 Recording...
              </Typography>
            )}
            </Grid>
            </Grid>
        </Paper>
        </Box>
    );
}

