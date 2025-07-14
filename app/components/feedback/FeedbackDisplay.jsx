

export default function FeedbackDisplay({feedback}){
    // Check if feedback is available and has the right structure
    if (!feedback || !feedback.response) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Feedback</h2>
                <p className="text-gray-500">No feedback available.</p>
            </div>
        );
    }

    const response = feedback.response;
    const question = feedback.question || 'Unknown question';
    
    // Check if response is a string (raw feedback) or parsed object
    const isStringResponse = typeof response === 'string';
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-gray-700">
                {isStringResponse ? (
                    // Display raw string response
                    <div className="mb-2">
                        <strong>Response:</strong>
                        <pre className="whitespace-pre-wrap mt-2 p-3 bg-gray-50 rounded text-sm">
                            {response}
                        </pre>
                    </div>
                ) : (
                    // Display parsed feedback object
                    <>
                        <p className="mb-2"><strong>Overall Feedback:</strong> {response.overallFeedback || 'N/A'}</p>
                        <p className="mb-2"><strong>Positive Highlight:</strong> {response.positiveHighlight || 'N/A'}</p>
                        <p className="mb-2"><strong>STAR Suggestion:</strong> {response.starSuggestion || 'N/A'}</p>
                        <p className="mb-2"><strong>Filler Words:</strong> {response.fillerWords || 'N/A'}</p>
                        <p className="mb-2"><strong>Score:</strong> {response.score || 'N/A'}</p>
                    </>
                )}
            </div>
        </div>
    );
}