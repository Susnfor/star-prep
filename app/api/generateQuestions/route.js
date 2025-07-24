// Class to handle generating questions from Gemini
class QuestionGenerator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  // Builds the prompt based on jobTitle and numQuestions
  buildPrompt(jobTitle, numQuestions) {
    if (jobTitle && jobTitle.trim() !== '') {
      return `Generate ${numQuestions} realistic interview questions that are commonly asked for a ${jobTitle} in HireVue-style digital interviews. Phrase them to encourage structured, STAR-style answers, and ensure they reflect the typical challenges and responsibilities of this role. Do not include explanations or extra text.`;
    } else {
      return `Generate ${numQuestions} realistic behavioural interview questions that are commonly asked in HireVue-style digital interviews. Phrase them to encourage structured, STAR-style answers. Do not include explanations or extra text.`;
    }
  }

  // Calls the Gemini API to generate the questions
  async generateQuestions(prompt) {
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
      throw new Error (JSON.stringify(errorData));
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // Cleans up the Gemini response to extract only the questions
  cleanQuestions(text) {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line =>
        /^\d+[\.\)\-]|^[-•]/.test(line)
      )
      .map(line =>
        line.replace(/^\d+[\.\)\-]\s*/, '').replace(/^[-•]\s*/, '')
      );
  }
}

// The POST API route handler
export async function POST(req) {
  const { jobTitle, numQuestions } = await req.json();
  const questionCount = numQuestions && !isNaN(numQuestions) ? numQuestions : 5;

  const generator = new QuestionGenerator(process.env.GEMINI_API_KEY);

  try {
    const prompt = generator.buildPrompt(jobTitle, questionCount);
    const generatedText = await generator.generateQuestions(prompt);
    const questions = generator.cleanQuestions(generatedText);

    if (!questions || questions.length === 0) {
      return Response.json({ message: 'No questions generated. Please try again with a different job title.' }, { status: 400 });
    }
    return Response.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    //for api overload
    if (error.message.includes('overload') || error.message.includes('quota exceeded') || error.message.includes('503')) {
      return Response.json({ message: 'API is currently overloaded. Please try again later.', error: 'API_OVERLOAD' }, { status: 503 });
    }
    return Response.json({ message: 'Error generating questions', details: error.toString() }, { status: 500 });
  }
}
