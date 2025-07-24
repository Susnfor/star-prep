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
    <Paper
      elevation={2}
      sx={{
        p: 5,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "grey.200",
        maxWidth: "600px",
        width: "100%",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600, color: "text.primary", mb: 1, textAlign: "center" }}>
        Interview Setup
      </Typography>
      
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}>
        Configure your interview session preferences
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={4}>
          <TextField
            label="Job Title / Question Type"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />

          <Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              Number of Questions
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Current selection: {numQuestions} questions
            </Typography>
            <Slider
              value={numQuestions}
              onChange={(e, val) => setNumQuestions(val)}
              step={1}
              min={1}
              max={10}
              valueLabelDisplay="auto"
              sx={{
                '& .MuiSlider-thumb': {
                  borderRadius: 2,
                },
                '& .MuiSlider-track': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Preparation Time
              </Typography>
              <TextField
                label="Seconds"
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Recording Time
              </Typography>
              <TextField
                label="Seconds"
                type="number"
                value={recordingTime}
                onChange={(e) => setRecordingTime(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Box>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
            sx={{ 
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1.1rem",
              mt: 3,
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CircularProgress size={24} color="inherit" />
                <span>Setting up your interview...</span>
              </Box>
            ) : (
              'Start Interview'
            )}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
