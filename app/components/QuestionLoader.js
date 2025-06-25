// to fetch questions
'use client';
import { useEffect, useState } from 'react';

export default function QuestionLoader({ jobTitle, numQuestions, children }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/generateQuestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobTitle,
            numQuestions,
          }),
        });
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [jobTitle, numQuestions]);

  // Provide questions to children once loaded
  return children({ loading, questions });
}
