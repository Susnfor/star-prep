//display webcam feed and record video
'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect, useRef } from 'react';
import { VideoRecorder } from '@/app/lib/VideoRecorder';

export default function VideoRecorderComponent({recorderRef, isRecording, isPrepTimeOver, setIsPrepTimeOver, setIsRecording, onRecorderReady}) {
  const videoRef = useRef(null);


  // Start webcam feed when video element is ready
  useEffect(() => {
    if (videoRef.current && recorderRef.current === null) {
      recorderRef.current = new VideoRecorder(videoRef.current);
      onRecorderReady(recorderRef.current);
    }
  }, [recorderRef, onRecorderReady]);

  return (
    <Box>
      {isRecording && (
      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
        🔴 REC
      </Typography>
    )}
    { !isPrepTimeOver && (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        📹 PREP
      </Typography>
    )}
      <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="w-full h-auto max-w-3xl bg-black rounded"
    />
  </Box>

  );
}
