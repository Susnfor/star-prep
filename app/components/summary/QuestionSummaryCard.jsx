import { 
    Paper, 
    Typography, 
    Divider, 
    Box,
    Chip,
    Avatar
} from '@mui/material';
import { 
    QuestionMark, 
    RecordVoiceOver,
    MicOff 
} from '@mui/icons-material';
import FeedbackComponent from "../feedback/FeedbackComponent";

export default function QuestionSummaryCard({ question, transcript, questionIndex }) {
    const hasTranscript = transcript && transcript.trim();

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                p: 4, 
                my: 3, 
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                    elevation: 6,
                    transform: 'translateY(-2px)'
                }
            }}
        >
            {/* Question Header */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <QuestionMark />
                </Avatar>
                <Box flex={1}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Question {questionIndex + 1}
                    </Typography>
                    <Chip 
                        icon={hasTranscript ? <RecordVoiceOver /> : <MicOff />}
                        label={hasTranscript ? "Response Recorded" : "No Response"}
                        color={hasTranscript ? "success" : "error"}
                        variant="outlined"
                        size="small"
                    />
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Question Text */}
            <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body1" fontWeight="medium" color="text.secondary" gutterBottom>
                    Question:
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{question}"
                </Typography>
            </Box>

            {/* Answer Section */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="semibold" gutterBottom>
                    Your Answer:
                </Typography>
                <Paper 
                    variant="outlined" 
                    sx={{ 
                        p: 3, 
                        bgcolor: hasTranscript ? 'background.paper' : 'grey.50',
                        minHeight: 80
                    }}
                >
                    {hasTranscript ? (
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                whiteSpace: "pre-wrap",
                                lineHeight: 1.6,
                                color: 'text.primary'
                            }}
                        >
                            {transcript}
                        </Typography>
                    ) : (
                        <Box display="flex" alignItems="center" justifyContent="center" sx={{ minHeight: 60 }}>
                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ fontStyle: 'italic' }}
                            >
                                No response was recorded for this question.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Box>

            {/* Feedback Section */}
            {hasTranscript && (
                <Box sx={{ mt: 4 }}>
                    <FeedbackComponent
                        transcribedText={transcript}
                        question={question}
                    />
                </Box>
            )}
        </Paper>
    );
}
