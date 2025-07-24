"use client";
import { useState } from "react";
import InterviewSetupForm from "@/app/components/interview/InterviewSetupForm";
import fetchQuestions from "@/app/lib/fetchQuestions";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useInterview } from "@/app/context/InterviewContext";
import { QuestionGenerator } from "@/app/lib/generateFallbackQuestions";
import JobSelector from "@/app/components/selector/jobSelector";

export default function InterviewSetup() {
  // State to manage setup form visibility and loading state
  const [showForm, setShowForm] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [showJobSelector, setShowJobSelector] = useState(false);
  const [currentSetupData, setCurrentSetupData] = useState(null);


  // Router for navigation and context for interview data
  const router = useRouter();
  const { setSetupData } = useInterview();

  // when button is clicked, basically submit form and fetch questions from API
  const handleSetupComplete = async (data) => {
    setIsLoading(true);
    setCurrentSetupData(data);
    // try fetching questions from the API, if it fails, log the error
    try {
      const questions = await fetchQuestions(data.jobTitle, data.numQuestions);

      if (!questions.length) {
        console.error("No questions returned");
        setShowJobSelector(true);
        return;
      }

      // set setup data in context
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
      // Navigate to the interview page
      router.push("/interview");
    } catch (error) {
      console.error("Error during setup processing:", error);
      setShowJobSelector(true);
    } finally {
      setIsLoading(false);
    }
  };

   const handleFallbackJobSelect = (selectedJobTitle, numQuestions) => {
    setIsLoading(true);
    const generator = new QuestionGenerator();

    try {
    const questions = generator.getFallbackQuestions(selectedJobTitle, numQuestions);
    setSetupData({
      jobTitle: selectedJobTitle,
      questions,
      numQuestions,
      prepTime: currentSetupData.prepTime,
      recordingTime: currentSetupData.recordingTime,
    });
    router.push("/interview");
  } catch (error) {
    console.error("Error generating fallback questions:", error);
  } finally {
    setShowJobSelector(false);
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
              Welcome to STAR Preparation
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
      <JobSelector
    open={showJobSelector}
    onClose={() => setShowJobSelector(false)}
    onSelect={handleFallbackJobSelect}
    numQuestions={currentSetupData?.numQuestions || 5}
/>
    </Box>
  );
}
