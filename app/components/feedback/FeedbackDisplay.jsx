const formatStarSuggestion = (starText) => {
    if (!starText) return starText;
    
    // Split on bullet points and STAR keywords, then format with proper line breaks
    return starText
        // Add line breaks before bullet points
        .replace(/\* \*\*/g, '\n\n• **')
        // Add line breaks before STAR keywords when not preceded by bullet points
        .replace(/(\*\*(?:Situation|Task|Action|Result):\*\*)/g, '\n\n$1')
        //remove all asterisks
        .replace(/\*/g, '')
        // Trim whitespace
        .trim();
};

export default function FeedbackDisplay({feedback}){
    // Check if feedback is available and has the right structure
    if (!feedback || !feedback.response) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg border border-blue-200">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💭</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Interview Feedback</h2>
                    <p className="text-gray-600">No feedback available yet.</p>
                </div>
            </div>
        );
    }

    const response = feedback.response;
    const question = feedback.question || 'Unknown question';
    
    // Check if response is a string (raw feedback) or parsed object
    const isStringResponse = typeof response === 'string';
    
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📝</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Interview Feedback</h2>
                        <p className="text-blue-100 text-sm">AI-powered analysis of your response</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">

                {isStringResponse ? (
                    // Display raw string response
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <span className="text-amber-600">💬</span>
                            Feedback Analysis
                        </h3>
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                            <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                                {response}
                            </pre>
                        </div>
                    </div>
                ) : (
                    // Display parsed feedback object
                    <div className="space-y-4">
                        {/* Overall Feedback */}
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <span className="text-green-600">✨</span>
                                Overall Feedback
                            </h3>
                            <p className="text-gray-700">{response.overallFeedback || 'N/A'}</p>
                        </div>

                        {/* Positive Highlight */}
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <span className="text-emerald-600">👍</span>
                                What You Did Well
                            </h3>
                            <p className="text-gray-700">{response.positiveHighlight || 'N/A'}</p>
                        </div>

                        {/* STAR Suggestion */}
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <span className="text-purple-600">⭐</span>
                                STAR Method Suggestion
                            </h3>
                            <p className="text-gray-700"   style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{formatStarSuggestion(response.starSuggestion) || 'No STAR suggestion available'}</p>
                        </div>

                        {/* Bottom Row - Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Filler Words */}
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <span className="text-orange-600">🗣️</span>
                                    Filler Words
                                </h3>
                                <p className="text-2xl font-bold text-orange-600">{response.fillerWords || 'N/A'}</p>
                            </div>

                            {/* Score */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <span className="text-blue-600">🎯</span>
                                    Overall Score
                                </h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-blue-600">{response.score || 'N/A'}</p>
                                    {response.score && <span className="text-gray-500"></span>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}