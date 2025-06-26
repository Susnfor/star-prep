// to fetch questions


export default async function fetchQuestions( jobTitle, numQuestions ) {
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
        return data.questions || [];
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };


