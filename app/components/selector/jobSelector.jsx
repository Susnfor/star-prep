'use client';
import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip
} from '@mui/material';

const PREDEFINED_JOBS = [
    {
        title: "Software Engineering",
        description: "Full-stack development, debugging, code quality",
        icon: "💻",
        color: "#1976d2"
    },
    {
        title: "Data Science",
        description: "ML models, data analysis, visualization",
        icon: "📊",
        color: "#388e3c"
    },
    {
        title: "Behavioural Questions",
        description: "General workplace scenarios and soft skills",
        icon: "🤝",
        color: "#f57c00"
    },
    {
        title: "Product Management",
        description: "Strategy, roadmaps, stakeholder management",
        icon: "📱",
        color: "#7b1fa2"
    },
    {
        title: "Marketing",
        description: "Campaigns, analytics, brand strategy",
        icon: "📈",
        color: "#e91e63"
    },
    {
        title: "Finance",
        description: "Financial analysis, budgeting, risk management",
        icon: "💰",
        color: "#00796b"
    },
    {
        title: "Design",
        description: "UI/UX, user research, creative solutions",
        icon: "🎨",
        color: "#5e35b1"
    },
    {
        title: "Sales",
        description: "Client relationships, targets, negotiations",
        icon: "💼",
        color: "#d32f2f"
    }
];

export default function JobSelector({ open, onClose, onSelect, numQuestions }) {
    const [selectedJob, setSelectedJob] = useState(null);

    const handleJobSelect = (job) => {
        setSelectedJob(job);
    };

    const handleConfirm = () => {
        if (selectedJob) {
            onSelect(selectedJob.title, numQuestions);
            onClose();
            setSelectedJob(null);
        }
    };

    const handleClose = () => {
        onClose();
        setSelectedJob(null);
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    p: 0,
                    height: "90vh",
                    maxHeight: "900px",
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }
            }}
        >
            <DialogTitle sx={{ p: 0 }}>
                {/* Header */}
                <Box 
                    sx={{ 
                        px: 3,
                        py: 1.5,
                        borderBottom: "1px solid",
                        borderColor: "grey.200",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Left side - App title */}
                    <Box>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}>
                            Star Prep
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            Choose Your Interview Focus
                        </Typography>
                    </Box>

                    {/* Right side - AI status */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ color: "warning.main", fontWeight: 600 }}>
                            🤖 AI Temporarily Unavailable
                        </Typography>
                    </Box>
                </Box>

                {/* Main title */}
                <Box textAlign="center" sx={{ py: 3, px: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
                        Select Your Interview Type
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                        Choose from our expertly curated question sets while we wait for the AI to recover
                    </Typography>
                </Box>
            </DialogTitle>
            
            <DialogContent sx={{ px: 4, py: 2, flex: 1, overflow: "auto" }}>
                <Grid container spacing={3} justifyContent="center">
                    {PREDEFINED_JOBS.map((job) => (
                        <Grid item xs={12} sm={6} lg={3} key={job.title}>
                            <Card 
                                sx={{ 
                                    cursor: 'pointer',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    border: selectedJob?.title === job.title ? 3 : 1,
                                    borderColor: selectedJob?.title === job.title ? job.color : 'divider',
                                    backgroundColor: selectedJob?.title === job.title ? `${job.color}08` : 'background.paper',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    borderRadius: 3,
                                    '&:hover': {
                                        borderColor: job.color,
                                        backgroundColor: `${job.color}08`,
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 8px 16px ${job.color}20`
                                    }
                                }}
                                onClick={() => handleJobSelect(job)}
                            >
                                <CardContent 
                                    sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Selection Indicator */}
                                    {selectedJob?.title === job.title && (
                                        <Chip
                                            label="✓ SELECTED"
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                backgroundColor: job.color,
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '0.7rem'
                                            }}
                                        />
                                    )}

                                    {/* Icon */}
                                    <Box sx={{ mb: 2 }}>
                                        <Typography 
                                            variant="h1" 
                                            sx={{ 
                                                fontSize: '3rem',
                                                lineHeight: 1,
                                                filter: selectedJob?.title === job.title ? 'none' : 'grayscale(0.3)'
                                            }}
                                        >
                                            {job.icon}
                                        </Typography>
                                    </Box>

                                    {/* Title */}
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom 
                                        sx={{ 
                                            fontWeight: 'bold',
                                            color: selectedJob?.title === job.title ? job.color : 'text.primary',
                                            mb: 1.5,
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {job.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{ 
                                            flexGrow: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            lineHeight: 1.4,
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        {job.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            
            <DialogActions sx={{ px: 4, py: 3, justifyContent: 'space-between', borderTop: "1px solid", borderColor: "grey.200" }}>
                <Button 
                    onClick={handleClose} 
                    color="secondary"
                    size="large"
                    sx={{ px: 3, py: 1.5, borderRadius: 2 }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleConfirm} 
                    variant="contained" 
                    disabled={!selectedJob}
                    size="large"
                    sx={{ 
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        backgroundColor: selectedJob?.color || 'primary.main',
                        '&:hover': {
                            backgroundColor: selectedJob?.color ? `${selectedJob.color}dd` : 'primary.dark'
                        },
                        '&:disabled': {
                            backgroundColor: 'grey.300'
                        }
                    }}
                >
                    Generate {numQuestions} Questions
                </Button>
            </DialogActions>
        </Dialog>
    );
}