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

    // Parser method to feedback 
	parseFeedback(rawFeedback) {
		const lines = rawFeedback.split('\n').map(line => line.trim()).filter(Boolean);
		const feedback = {
			overallFeedback: '',
			positiveHighlight: '',
			starSuggestion: '',
			fillerWords: '',
			score: '',
		};

		let currentKey = null;

		lines.forEach(line => {
			if (line.startsWith('**1. Overall Feedback:**')) {
				currentKey = 'overallFeedback';
				feedback[currentKey] = line.replace('**1. Overall Feedback:**', '').trim();
			} else if (line.startsWith('**2. Positive Highlight:**')) {
				currentKey = 'positiveHighlight';
				feedback[currentKey] = line.replace('**2. Positive Highlight:**', '').trim();
			} else if (line.startsWith('**3. STAR Suggestion:**')) {
				currentKey = 'starSuggestion';
				feedback[currentKey] = line.replace('**3. STAR Suggestion:**', '').trim();
			} else if (line.startsWith('**4. Filler Words:**')) {
				currentKey = 'fillerWords';
				feedback[currentKey] = line.replace('**4. Filler Words:**', '').trim();
			} else if (line.startsWith('**5. Score:**')) {
				currentKey = 'score';
				feedback[currentKey] = line.replace('**5. Score:**', '').trim();
			} else if (currentKey) {
				feedback[currentKey] += ' ' + line;
			}
		});

		return feedback;
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
        const rawFeedback = await feedbackGenerator.generateFeedback(prompt);
        const structuredFeedback = feedbackGenerator.parseFeedback(rawFeedback);

        return new Response(JSON.stringify({ feedback: structuredFeedback }), { status: 200 });
    } catch (error) {
        console.error('Error generating feedback:', error);
        return new Response(JSON.stringify({message: error.message}), { status: 500 });
    }
}