// for the settings, including setting questions no. , interview type, prep time, and recording time
'use client';

import {useState} from 'react';
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function InterviewSetupForm({ onSetupComplete, isLoading }) {
    //variables with default values 
    const [jobTitle, setJobTitle] = useState('Behavioural Questions');
    const [numQuestions, setNumQuestions] = useState(5);
    const [prepTime, setPrepTime] = useState(30);
    const [recordingTime, setRecordingTime] = useState(60);

    //handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        onSetupComplete({
            jobTitle,
            numQuestions,
            prepTime,
            recordingTime,
        });
        console.log('Interview setup submitted:', {
            jobTitle,
            numQuestions,
            prepTime,
            recordingTime,
        });
    };
    
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
      <Paper elevation={4}  sx={{
    p: 4,
    width: '100%',
    maxWidth: 500,
    minWidth: 320,
    mx: 'auto',
    textAlign: 'center',
    borderRadius: 3,
  }}>
        <Typography variant="h5" align="center" gutterBottom>
          Interview Setup
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Job Title / Question Type"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              fullWidth
            />

            <Box>
              <Typography gutterBottom>
                Number of Questions: {numQuestions}
              </Typography>
              <Slider
                value={numQuestions}
                onChange={(e, val) => setNumQuestions(val)}
                step={1}
                min={1}
                max={10}
                valueLabelDisplay="auto"
              />
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Preparation Time (seconds)"
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                fullWidth
              />
              <TextField
                label="Recording Time (seconds)"
                type="number"
                value={recordingTime}
                onChange={(e) => setRecordingTime(e.target.value)}
                fullWidth
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Start Interview'
              )}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
