import fetchFeedback from "@/app/lib/fetchFeedback";
import { InterviewContext } from "@/app/context/InterviewContext";
import FeedbackDisplay from "@/app/components/feedback/FeedbackDisplay";
import { useEffect } from "react";

// This component will handle the feedback generation and display
export default function FeedbackComponent({ transcribedText, question }) {
	// Use the InterviewContext to get the current interview state
	const { feedback, setFeedback } = useContext(InterviewContext);

	// Function to fetch feedback
	const handleFetchFeedback = async () => {
		try {
			const feedbackData = await fetchFeedback(transcribedText, question);
			//check if feedbackData = null or undefined
			if (!feedbackData) {
				console.error("No feedback data received");
				return;
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
			throw error;
		}
	};
	/// Use useEffect to fetch feedback when the component mounts
	useEffect(() => {
		if (transcribedText && question) {
			handleFetchFeedback();
		}
	}, [transcribedText, question]);

	// Render the feedback component
	return (
		<div>
			<FeedbackDisplay feedback={feedback} />
		</div>
	);
}
