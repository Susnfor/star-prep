'use client';

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box"
import QuestionSession from "../components/QuestionSession";



export default function InterviewPage() {
  

    return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
  
      <QuestionSession />
    
    </Box>
    );
}