import { 
    Paper, 
    Typography, 
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
            elevation={2}
            sx={{ 
                p: 4, 
                mb: 3, 
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transform: 'translateY(-2px)'
                }
            }}
        >
            {/* Question Header */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar sx={{ 
                    bgcolor: 'primary.main', 
                    width: 56, 
                    height: 56,
                    fontSize: "1.5rem"
                }}>
                    {questionIndex + 1}
                </Avatar>
                <Box flex={1}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}>
                        Question {questionIndex + 1}
                    </Typography>
                    <Chip 
                        icon={hasTranscript ? <RecordVoiceOver /> : <MicOff />}
                        label={hasTranscript ? "Response Recorded" : "No Response"}
                        color={hasTranscript ? "success" : "error"}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 2 }}
                    />
                </Box>
            </Box>

            {/* Question Text */}
            <Paper
                variant="outlined"
                sx={{ 
                    mb: 3, 
                    p: 3, 
                    bgcolor: 'primary.50', 
                    borderRadius: 2,
                    borderColor: 'primary.200'
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main", mb: 1 }}>
                    Interview Question:
                </Typography>
                <Typography variant="body1" sx={{ 
                    fontStyle: 'italic',
                    color: "text.primary",
                    lineHeight: 1.6
                }}>
                    "{question}"
                </Typography>
            </Paper>

            {/* Answer Section */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
                    Your Response:
                </Typography>
                <Paper 
                    variant="outlined" 
                    sx={{ 
                        p: 3, 
                        bgcolor: hasTranscript ? 'background.paper' : 'grey.50',
                        minHeight: 100,
                        borderRadius: 2,
                        borderColor: hasTranscript ? 'grey.300' : 'grey.200'
                    }}
                >
                    {hasTranscript ? (
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                whiteSpace: "pre-wrap",
                                lineHeight: 1.7,
                                color: 'text.primary'
                            }}
                        >
                            {transcript}
                        </Typography>
                    ) : (
                        <Box 
                            display="flex" 
                            alignItems="center" 
                            justifyContent="center" 
                            sx={{ minHeight: 80 }}
                        >
                            <Box sx={{ textAlign: "center" }}>
                                <MicOff sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    sx={{ fontStyle: 'italic' }}
                                >
                                    No response was recorded for this question.
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Box>

            {/* Feedback Section */}
            {hasTranscript && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
                        AI Feedback & Analysis:
                    </Typography>
                    <FeedbackComponent
                        transcribedText={transcript}
                        question={question}
                    />
                </Box>
            )}
        </Paper>
    );
}
