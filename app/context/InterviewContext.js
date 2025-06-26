"use client";
import { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [setupData, setSetupData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <InterviewContext.Provider
      value={{
        setupData,
        setSetupData,
        currentQuestionIndex,
        setCurrentQuestionIndex,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(InterviewContext);
}
