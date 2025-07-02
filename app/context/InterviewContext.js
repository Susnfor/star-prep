"use client";
import { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [setupData, setSetupData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState([]);

  return (
    <InterviewContext.Provider
      value={{
        setupData,
        setSetupData,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        feedback,
        setFeedback
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(InterviewContext);
}
