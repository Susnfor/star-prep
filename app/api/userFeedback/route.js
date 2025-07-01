class userFeedback {
    constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }
    // Builds the prompt based on the transcribed text
    buildPrompt(transcribedText, question) {
        return `You are an expert interview coach.

        Evaluate the following response to an interview question.
        Please give:
            1. Overall Feedback: One sentence of overall feedback.
            2. Positive Highlight: Mention one thing the candidate did well.
            3. STAR Suggestion:A suggestion for improvement using the STAR format.
            4. Filler Words: How many filler words (like "um", "uh", "like") were used.
            5. Score: A score from 1 to 10 for the overall quality of the response.
                Use English UK spelling and grammar throughout. Be constructive and encouraging in your tone. Label each section clearly as shown above.
        The response is: "${transcribedText}" and the question is: "${question}". `;
    }

    // Calls the Gemini API to generate feedback
    async generateFeedback(prompt) {
        const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API error:', errorData);
            throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

}

// The POST API route handler
export async function POST(req) {
    const { transcribedText, question } = await req.json();
    const feedbackGenerator = new userFeedback(process.env.GEMINI_API_KEY);
     if (!transcribedText || !question) {
            return new Response(JSON.stringify({ message: 'Missing transcribed text and/or question' }), { status: 400 });
        }
    
    try {
       
        const prompt = feedbackGenerator.buildPrompt(transcribedText, question);
        const feedback = await feedbackGenerator.generateFeedback(prompt);
        return new Response(JSON.stringify({ feedback }), { status: 200 });
    } catch (error) {
        console.error('Error generating feedback:', error);
        return new Response({message: error}, { status: 500 });
    }
}