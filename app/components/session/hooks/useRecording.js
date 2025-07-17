'use client';
import { useState, useRef } from 'react';


export function useRecording() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPrepTimeOver, setIsPrepTimeOver] = useState(false);
    const recorderRef = useRef(null);

    const startPrepTime = () => {
        setIsPrepTimeOver(false);
        setIsRecording(false);
    };

    const stopPrepTime = () => {
        setIsPrepTimeOver(true);
    }
    
    const startRecording = () => {
        setIsPrepTimeOver(true);
        if (recorderRef.current) {
            recorderRef.current.startRecording();
            setIsRecording(true);
        }
    };
    
    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording();
            setIsRecording(false);
        }
    };

    const startWebcamFeed = () => {
        recorderRef.current?.startWebcamFeed();
    };


    const stopWebcamFeed = () => {
        recorderRef.current?.stopWebcamFeed();
    };


    const getCurrentRecording = () => {
        if (recorderRef.current) {
            return recorderRef.current.getCurrentRecording();
        }
        return null;
    };

    const getAllRecordings = () => {
        if (recorderRef.current) {
            return recorderRef.current.getAllRecordings();
        }
        return [];
    };


    
    return { 
        isRecording, 
        setIsRecording,
        isPrepTimeOver,
        setIsPrepTimeOver,
        recorderRef, 

        // Methods
        startPrepTime,
        stopPrepTime,
        startRecording, 
        stopRecording,
        startWebcamFeed,
        stopWebcamFeed,
        getCurrentRecording,
        getAllRecordings,
    };
}