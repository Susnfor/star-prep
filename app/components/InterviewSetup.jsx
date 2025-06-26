"use client";
import { useState, useEffect } from "react";
import InterviewSetupForm from "./InterviewSetupForm";
import fetchQuestions from "../lib/fetchQuestions";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useInterview } from "../context/InterviewContext";

export default function InterviewSetup() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setSetupData } = useInterview();

  const handleSetupComplete = async (data) => {
    setIsLoading(true);
    try {
      const questions = await fetchQuestions(data.jobTitle, data.numQuestions);

      if (!questions.length) {
        console.error("No questions returned");
        return;
      }

      setSetupData({
        jobTitle: data.jobTitle,
        questions,
        numQuestions: data.numQuestions,
        prepTime: data.prepTime,
        recordingTime: data.recordingTime,
      });
      console.log("Setup data:", {
        jobTitle: data.jobTitle,
        questions,
        numQuestions: data.numQuestions,
        prepTime: data.prepTime,
        recordingTime: data.recordingTime,
      });

      router.push("/interview");
    } catch (error) {
      console.error("Error during setup processing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!showForm ? (
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 600,
            p: 4,
            bgcolor: "background.default",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" align="center" fontWeight="bold">
              Welcome to AI Interview Practice
            </Typography>
            <Typography variant="body1" align="center">
              Practice behavioural interview questions in a timed,
              video-recorded format. Set your preferences and prepare just like
              a real HireVue-style interview.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setShowForm(true)}
            >
              Continue
            </Button>
          </Stack>
        </Paper>
      ) : (
        <InterviewSetupForm
          onSetupComplete={handleSetupComplete}
          isLoading={loading}
        />
      )}
    </Box>
  );
}
