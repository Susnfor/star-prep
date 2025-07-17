"use client";
import FeedbackComponent from "../components/feedback/FeedbackComponent";
import { useInterview } from "../context/InterviewContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import QuestionSummaryCard from "../components/summary/QuestionSummaryCard";
// import CircularProgress from "@mui/material/CircularProgress";

export default function SummaryPage() {
	const { recordedTranscript, setRecordedTranscript, setupData } = useInterview();
	const questions = setupData?.questions || [];
	console.log("Recorded transcript:", recordedTranscript);
	console.log("Setup questions:", questions);


	return (
		<Box sx={{ p: 4, minHeight: "100vh", width: "100%"}}>
			<Typography variant="h4" gutterBottom align="center" fontWeight="bold">
				Interview Summary
			</Typography>

			{questions ? questions.map((question, index) => {
				const transcript = recordedTranscript[question];
				return (
					<Paper key={index} sx={{ p: 3, my: 3 }}>
						<QuestionSummaryCard
        					question={question}
        					transcript={transcript}
							questionIndex={index}
            			/>
					</Paper>
				);
			}): <><p>No questions</p></>}
		</Box>
	);
}
