//Gemini API to deal with getting feedback on transcribed text

export default async function fetchFeedback(transcribedText, question) {
    try {
        const response = await fetch ('/api/userFeedback', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ transcribedText, question })
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error from API:', errorData);
            throw new Error(errorData.message || 'Failed to fetch feedback');
        }
        const data = await response.json();
        return data.feedback || 'No feedback received';

    }catch (error) {
        console.error('Error fetching feedback:', error);
        return { message: 'Error fetching feedback, frontend', error: error.message };
    }
}