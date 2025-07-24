'use client';
import fetchFeedback from "@/app/lib/fetchFeedback";
import { useInterview } from "@/app/context/InterviewContext";
import FeedbackDisplay from "@/app/components/feedback/FeedbackDisplay";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useState } from "react";

// This component will handle the feedback generation and display
export default function FeedbackComponent({ transcribedText, question }) {
	// Use the Interview context to get feedback and setFeedback
	const { feedback, setFeedback } = useInterview();

	// State to manage loading state
	const [loading, setLoading] = useState(true);

	/// Use useEffect to fetch feedback when the component mounts
	useEffect(() => {
		// Don't fetch if we already have feedback for this question //check if existing
		const currentFeedback = feedback.find((item) => item.question === question);
		if (currentFeedback) {
			setLoading(false);
			return;
		}

		// Don't fetch if no transcribed text
		if (!transcribedText || !transcribedText.trim()) {
			setLoading(false);
			return;
		}

		// Function to fetch feedback
		const handleFetchFeedback = async () => {
			try {
				setLoading(true);
				const feedbackData = await fetchFeedback(transcribedText, question);
				//check if feedbackData = null or undefined
				if (!feedbackData) {
					console.error("No feedback data received");
					throw new Error("No feedback data received");
				}
				//feedback context = array
				//append the new feedback to the existing feedback array
				setFeedback((prevFeedback) => [
					...prevFeedback,
					{
						question: question,
						response: feedbackData,
					},
				]);
				console.log("Feedback received:", feedbackData);
			} catch (error) {
				console.error("Error fetching feedback:", error);
			} finally {
				setLoading(false);
			}
		};
		// call function on mount
		handleFetchFeedback();
			
	}, [transcribedText, question, feedback, setFeedback]);

	const currentFeedback = feedback.find(
		(item) => item.question === question
	);

	// Render the feedback component
	return (
		<Box>
			{loading ? (
				<Paper
					variant="outlined"
					sx={{
						p: 3,
						borderRadius: 2,
						textAlign: "center",
						bgcolor: "grey.50"
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
						<CircularProgress size={24} />
						<Typography variant="body1" sx={{ color: "text.secondary" }}>
							Analyzing your response...
						</Typography>
					</Box>
				</Paper>
			) : currentFeedback && currentFeedback.response ? (
				<FeedbackDisplay feedback={currentFeedback} />
			) : (
				<Paper
					variant="outlined"
					sx={{
						p: 4,
						borderRadius: 2,
						textAlign: "center",
						bgcolor: "grey.50"
					}}
				>
					<Typography variant="body1" color="text.secondary">
						No feedback available for this response.
					</Typography>
				</Paper>
			)}
		</Box>
	);
}
