"use client";
import { useState } from "react";
import InterviewSetupForm from "@/app/components/interview/InterviewSetupForm";
import fetchQuestions from "@/app/lib/fetchQuestions";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useInterview } from "@/app/context/InterviewContext";
import { QuestionGenerator } from "@/app/lib/generateFallbackQuestions";
import JobSelector from "@/app/components/selector/jobSelector";
import AppLayout from "@/app/components/ui/AppLayout";

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
    <AppLayout
      subtitle="Interview Practice Setup"
      rightText="Setup"
      rightColor="text.secondary"
    >
      {!showForm ? (
        <Paper
          elevation={2}
          sx={{
            p: 6,
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "grey.200",
            textAlign: "center",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}>
            Welcome to STAR Preparation
          </Typography>
          
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
            Practice behavioural interview questions in a timed, video-recorded format.
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
            Set your preferences and prepare just like a real HireVue-style interview. 
            This platform will help you build confidence and improve your interview performance.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => setShowForm(true)}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            Get Started
          </Button>
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
    </AppLayout>
  );
}
