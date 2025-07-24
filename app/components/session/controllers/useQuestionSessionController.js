'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useInterview } from "@/app/context/InterviewContext";
import { useRecording } from "../hooks/useRecording";
import { useTranscription } from "../hooks/useTranscription";
import { DownloadVideos } from "@/app/lib/downloadVideos";

export function useQuestionSessionController() {
    const { setupData, currentQuestionIndex, setCurrentQuestionIndex } = useInterview();
    const recording = useRecording();
    const transcription = useTranscription();
    const [keyTimer, setKeyTimer] = useState(0);
    const [videoComponentKey, setVideoComponentKey] = useState(0);
    const router = useRouter()

    const handleRecorderReady = (recorder) => {
        console.log("VideoRecorder initialised");
        recorder.startWebcamFeed(); 
    };

    // start prep time and intialise transcription
    // this will be called when the user clicks on the start button
    // it will start the webcam feed
    const handlePrepStart = () => {
        recording.startPrepTime();
        transcription.initialiseTranscriber();
        setKeyTimer(prev => prev + 1);
    };
    
    // handle the end of prep time
    // this will be called when the prep time is over
    // it will stop the prep time and start the recording
    // and start the transcription for the current question
    const handlePrepTimeEnd = () => {
        recording.stopPrepTime();
        recording.startRecording();
        const questionText = setupData?.questions?.[currentQuestionIndex];
        // Start transcription for the current question
        transcription.startTranscription(questionText);
    };
    
    // handle the end of recording time
    // this will be called when the recording time is over
    // it will stop the recording and transcription
    // and handle the final transcript logic
    const handleRecordingTimeEnd = () => {
        recording.stopRecording();
        // Handle final transcript logic
        const questionText = setupData?.questions?.[currentQuestionIndex];
        transcription.stopTranscription(questionText);
    };
    
    // handle the next question
    // this will be called when the user clicks on the next button
    // it will increment the current question index
    // and start the prep time for the next question
    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prev => prev + 1);
        handlePrepStart();
    };
    
    // handle retaking the current question
    // this will reset the current question index to the current question
    // and start the prep time again
    const handleRetakeQuestion = () => {
        handlePrepStart();
    };

    // handle finishing the session
    // this will stop the webcam feed, stop the recording and transcription
    const handleFinishSession = useCallback(() => {
        recording.stopWebcamFeed();
        recording.stopRecording();
        transcription.stopTranscription();
    }, [recording, transcription]);

    // handle downloading the current recording
    // this will download the current recording for the current question
    const handleCurrentDownload = () => {
        const currentRecording = recording.getCurrentRecording();
        if (currentRecording) {
            console.log("Downloading current recording:", currentRecording);
            new DownloadVideos(currentRecording).downloadCurrentRecording(currentRecording);
        }
        else {
            console.log("No current recording available to download.");
        }
    }
    // handle downloading all recordings
    // this will download all recordings for the session
    const handleRecordingDownloadAll = () => {
        const allRecordings = recording.getAllRecordings();
        if (allRecordings.length > 0) {
            console.log("Downloading all recordings:", allRecordings);
            new DownloadVideos(allRecordings).downloadAllRecordings();
        }
        else {
            console.log("No recordings available to download.");
        }
    }

    const handleInterviewStartOver = () => {
        setCurrentQuestionIndex(0);
        router.push("/");
        recording.stopWebcamFeed();
    };

    const handleRedoQuestions = () => {
        setCurrentQuestionIndex(0);
        
        // Clean up the current recorder ref
        if (recording.recorderRef.current) {
            recording.stopWebcamFeed();
            recording.recorderRef.current = null;
        }
        
        // Force remount of VideoRecorderComponent by changing key
        setVideoComponentKey(prev => prev + 1);
        
        // Start prep after a short delay to allow remounting
        setTimeout(() => {
            handlePrepStart();
        }, 100);
    };
    useEffect(() => {
    if (!transcription.transcriberRef.current) {
        transcription.initialiseTranscriber();
    }
}, [transcription]);

// Cleanup function to stop the transcriber when the component unmounts
    useEffect(() => {
        return () => {
            if (transcription.transcriberRef.current) {
                try {
                    transcription.transcriberRef.current.stop();
                } catch (error) {
                    console.log("Error stopping transcriber on unmount:", error);
                }
            }
        };
    }, [transcription]);

    //handle completion of the session
    useEffect(() => {
        if (setupData && currentQuestionIndex >= setupData.numQuestions) {
            handleFinishSession(); 
        }
    }, [currentQuestionIndex, setupData, handleFinishSession]);
    


    return {
        // State
        ...recording,
        ...transcription,
        keyTimer,
        setupData,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        videoComponentKey,
        
        // Actions
        handleRecorderReady,
        handlePrepStart,
        handlePrepTimeEnd,
        handleRecordingTimeEnd,
        handleNextQuestion,
        handleRetakeQuestion,
        handleFinishSession,
        handleCurrentDownload,
        handleRecordingDownloadAll,
        handleInterviewStartOver,
        handleRedoQuestions
    };
}