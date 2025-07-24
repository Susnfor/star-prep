import { 
    Box, 
    Typography, 
    Paper, 
    Chip,
    Grid,
    Avatar
} from '@mui/material';
import { 
    Feedback,
    ThumbUp,
    Star,
    RecordVoiceOver,
    TrendingUp
} from '@mui/icons-material';

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
            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "grey.200",
                    textAlign: "center"
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
                        <Feedback sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                        Interview Feedback
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        No feedback available yet.
                    </Typography>
                </Box>
            </Paper>
        );
    }

    const response = feedback.response;
    const question = feedback.question || 'Unknown question';
    
    // Check if response is a string (raw feedback) or parsed object
    const isStringResponse = typeof response === 'string';
    
    return (
        <Paper
            elevation={2}
            sx={{
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
                overflow: "hidden"
            }}
        >
            {/* Header */}
            <Box 
                sx={{ 
                    bgcolor: "primary.main",
                    p: 3,
                    color: "white"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 48, height: 48 }}>
                        <Feedback sx={{ fontSize: 24 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            AI Feedback Analysis
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Powered by intelligent response evaluation
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{ p: 3 }}>
                {isStringResponse ? (
                    // Display raw string response
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            bgcolor: "warning.50",
                            borderColor: "warning.200",
                            borderRadius: 2
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <RecordVoiceOver sx={{ color: "warning.main" }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                                Feedback Analysis
                            </Typography>
                        </Box>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                bgcolor: "background.paper",
                                borderRadius: 2
                            }}
                        >
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    whiteSpace: "pre-wrap",
                                    lineHeight: 1.7,
                                    color: "text.primary"
                                }}
                            >
                                {response}
                            </Typography>
                        </Paper>
                    </Paper>
                ) : (
                    // Display parsed feedback object
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {/* Overall Feedback */}
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                bgcolor: "success.50",
                                borderColor: "success.200",
                                borderRadius: 2
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <Feedback sx={{ color: "success.main" }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                                    Overall Feedback
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.6 }}>
                                {response.overallFeedback || 'N/A'}
                            </Typography>
                        </Paper>

                        {/* Positive Highlight */}
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                bgcolor: "info.50",
                                borderColor: "info.200",
                                borderRadius: 2
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <ThumbUp sx={{ color: "info.main" }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                                    What You Did Well
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.6 }}>
                                {response.positiveHighlight || 'N/A'}
                            </Typography>
                        </Paper>

                        {/* STAR Suggestion */}
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                bgcolor: "secondary.50",
                                borderColor: "secondary.200",
                                borderRadius: 2
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <Star sx={{ color: "secondary.main" }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                                    STAR Method Suggestion
                                </Typography>
                            </Box>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    whiteSpace: "pre-wrap",
                                    lineHeight: 1.7,
                                    color: "text.primary"
                                }}
                            >
                                {formatStarSuggestion(response.starSuggestion) || 'No STAR suggestion available'}
                            </Typography>
                        </Paper>

                        {/* Bottom Row - Metrics */}
                        <Grid container spacing={2}>
                            {/* Filler Words - Always on the left */}
                            <Grid size={6}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        bgcolor: "warning.50",
                                        borderColor: "warning.200",
                                        borderRadius: 2,
                                        textAlign: "center",
                                        height: "100%"
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                                        <RecordVoiceOver sx={{ color: "warning.main" }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                                            Filler Words
                                        </Typography>
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: "warning.main" }}>
                                        {response.fillerWords || 'N/A'}
                                    </Typography>
                                </Paper>
                            </Grid>

                            {/* Score - Always on the right */}
                            <Grid size={6}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        bgcolor: "primary.50",
                                        borderColor: "primary.200",
                                        borderRadius: 2,
                                        textAlign: "center",
                                        height: "100%"
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                                        <TrendingUp sx={{ color: "primary.main" }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                                            Overall Score
                                        </Typography>
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
                                        {response.score || 'N/A'}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Box>
        </Paper>
    );
}