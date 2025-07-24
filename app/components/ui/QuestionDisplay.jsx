// just display questions
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useInterview } from "@/app/context/InterviewContext";

export default function QuestionDisplay() {
    const { setupData, currentQuestionIndex, setCurrentQuestionIndex } = useInterview();
    const questions = setupData?.questions;


    return (
        <Box sx={{
            p: 4,
            minWidth: 300, 
            maxWidth: 600,
            overflow: 'auto', 
            mx: "auto",
            textAlign: "center",
            borderRadius: 3,
        }}>
       
            <Typography variant="h5" gutterBottom>
            Question {currentQuestionIndex + 1} of {setupData?.numQuestions}
            </Typography>
            <Typography variant="body1" gutterBottom>
            {questions ? questions[currentQuestionIndex]: "Loading question..."}
            </Typography>

        </Box>
    );
}
