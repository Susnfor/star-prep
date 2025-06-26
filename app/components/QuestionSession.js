// display questionsdisllay and also the timer function and video recording component
import VideoRecorderComponent from "./VideoRecorderComponent";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CountDownComponent from "./CountdownComponent";
import { useInterview } from "../context/InterviewContext";
import QuestionDisplay from "./QuestionDisplay";
import Grid from "@mui/material/Grid";
import { useRef } from "react";

export default function QuestionSession() {
      const recorderRef = useRef(null);
    const { setupData, currentQuestionIndex, setCurrentQuestionIndex } =
        useInterview();
    const [isRecording, setIsRecording] = useState(false);
    const [isPrepTimeOver, setIsPrepTimeOver] = useState(false);
    const [isRecordingTimeOver, setIsRecordingTimeOver] = useState(false);

    if (!setupData || !setupData.questions || setupData.questions.length === 0) {
        return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">
            No questions available. Please set up the interview first.
            </Typography>
        </Box>
        );
    }

    if (currentQuestionIndex >= setupData.numQuestions) {
        return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">Interview completed. Thank you!</Typography>
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
                    <CountDownComponent
                    isActive={isPrepTimeOver}
                    time={setupData.prepTime}
                    label="Prep Time"
                    />
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
                    <button
                    onClick={() =>
                        setCurrentQuestionIndex((prev) => Math.min(prev + 1))
                    }
                    >
                    Next Question
                    </button>
                </Box>
                </Box>
            </Grid>

            <Grid size={6}>
               
                <VideoRecorderComponent
                    isRecording={isRecording}
                    setIsRecording={setIsRecording}
                    isPrepTimeOver={isPrepTimeOver}
                    isRecordingTimeOver={isRecordingTimeOver}
                    recorderRef={recorderRef}
                />
                
            </Grid>
            </Grid>
        </Paper>
        </Box>
    );
    }
