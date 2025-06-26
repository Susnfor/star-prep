//display webcam feed and record video
'use client';

import { useEffect, useRef } from 'react';
import { VideoRecorder } from '../lib/VideoRecorder';

export default function VideoRecorderComponent({recorderRef}) {
  const videoRef = useRef(null);


  // Start webcam feed when video element is ready
  useEffect(() => {
    if (videoRef.current && recorderRef.current === null) {
      recorderRef.current = new VideoRecorder(videoRef.current);
      recorderRef.current.startWebcamFeed();
    }
  }, [recorderRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="w-full h-auto max-w-3xl bg-black rounded"
    />
  );
}
