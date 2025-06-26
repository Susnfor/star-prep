// display questions, timers, and record video
'use client';

import { useState, useRef } from "react";
import { useInterview } from "../context/InterviewContext";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import CountDownComponent from "./CountdownComponent";
import QuestionDisplay from "./QuestionDisplay";
import VideoRecorderComponent from "./VideoRecorderComponent";
import { DownloadVideos } from "../lib/downloadVideos";

export default function QuestionSession() {
  const recorderRef = useRef(null);
  const { setupData, currentQuestionIndex, setCurrentQuestionIndex } = useInterview();

  const [isPrepTimeOver, setIsPrepTimeOver] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingTimeOver, setIsRecordingTimeOver] = useState(false);

  if (!setupData || !setupData.questions?.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">No questions available. Please set up the interview first.</Typography>
      </Box>
    );
  }

  if (currentQuestionIndex >= setupData.numQuestions) {
    const handleDownloadAll = () => {
      const recordings = recorderRef.current?.getAllRecordings() || [];
      const downloader = new DownloadVideos(recordings);
      downloader.downloadAllRecordings();
    };

    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">Interview completed. Thank you!</Typography>
        <Button onClick={handleDownloadAll} variant="contained" sx={{ mt: 2 }}>Download All Videos</Button>
      </Box>
    );
  }

  const handlePrepComplete = () => {
    setIsPrepTimeOver(true);
    recorderRef.current?.startRecording();
    setIsRecording(true);

    setTimeout(() => {
      recorderRef.current?.stopRecording();
      setIsRecording(false);
      setIsRecordingTimeOver(true);
    }, setupData.recordingTime * 1000);
  };

  const handleNext = () => {
    recorderRef.current?.stopRecording();
    setIsPrepTimeOver(false);
    setIsRecordingTimeOver(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", bgcolor: "background.default", display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", minHeight: 700, mx: "auto", textAlign: "center", borderRadius: 3, display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {!isPrepTimeOver ? (
                <CountDownComponent
                  time={setupData.prepTime}
                  label="Prep Time"
                  onComplete={handlePrepComplete}
                />
              ) : isRecording ? (
                <CountDownComponent
                  time={setupData.recordingTime}
                  label="Recording"
                />
              ) : null}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 auto" }}>
              <QuestionDisplay />
              {isRecordingTimeOver && (
                <Button onClick={handleNext} variant="contained" sx={{ mt: 2 }}>Next Question</Button>
              )}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <VideoRecorderComponent recorderRef={recorderRef} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
