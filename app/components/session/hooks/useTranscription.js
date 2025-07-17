'use client';
import { useRef } from "react";
import { SpeechTranscriber } from "@/app/lib/SpeechTranscriber";
import { useInterview } from "@/app/context/InterviewContext";

export function useTranscription() {
    const transcriberRef = useRef(null);
    const { recordedTranscript, setRecordedTranscript } = useInterview();
    
    // Initialise the transcriber when the hook is used
    const initialiseTranscriber = () => {
        if (transcriberRef.current) {
            try {
                transcriberRef.current.stop();
            } catch (error) {
                console.log("Cleanup transcriber error:", error);
            }
        }
        transcriberRef.current = new SpeechTranscriber();
    };
    
    // Start transcription and save the results to specific question in recordedTranscript (object)
    // For live transcription
    const startTranscription = (questionText) => {
        if (transcriberRef.current?.supported) {
            transcriberRef.current.onTranscription = (text) => {
                setRecordedTranscript(prev => ({
                    ...prev,
                    [questionText]: text
                }));
            };
            transcriberRef.current.start();
        }
        else {
            console.log("Speech recognition not supported in this browser");
        } 
    };

    // Stop transcription and save the final transcript to specific question in recordedTranscript (object)
    const stopTranscription = (questionText) => {
        if (transcriberRef.current) {
            transcriberRef.current.stop().then((finalTranscript) => {
                if (finalTranscript && finalTranscript.trim()) {
                    setRecordedTranscript(prev => ({
                    ...prev,
                    [questionText]: finalTranscript
                }));
                }
    
            });
        }
    };
    
    return { 
        transcriberRef, 
        recordedTranscript, 
        initialiseTranscriber, 
        startTranscription,
        stopTranscription
    };
}