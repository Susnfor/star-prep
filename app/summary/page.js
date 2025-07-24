"use client";
import FeedbackComponent from "../components/feedback/FeedbackComponent";
import { useInterview } from "../context/InterviewContext";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import QuestionSummaryCard from "../components/summary/QuestionSummaryCard";
import { useRouter } from "next/navigation";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AppLayout from "../components/ui/AppLayout";

export default function SummaryPage() {
	const { recordedTranscript, setRecordedTranscript, setupData } = useInterview();
	const questions = setupData?.questions || [];
	const router = useRouter();

	console.log("Recorded transcript:", recordedTranscript);
	console.log("Setup questions:", questions);

	return (
		<AppLayout
			subtitle="Interview Performance Summary"
			rightIcon={<AssessmentIcon sx={{ color: "primary.main", fontSize: 32 }} />}
			rightText="Analysis"
			rightColor="primary.main"
		>
			<Box sx={{ width: "100%", height: "100%", overflow: "auto", px: 1 }}>
				{/* Summary intro */}
				<Paper
					elevation={2}
					sx={{
						p: 4,
						mb: 4,
						borderRadius: 3,
						bgcolor: "background.paper",
						border: "1px solid",
						borderColor: "grey.200",
						textAlign: "center",
					}}
				>
					<AssessmentIcon sx={{ color: "primary.main", fontSize: 48, mb: 2 }} />
					<Typography variant="h4" sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
						Interview Summary & Feedback
					</Typography>
					<Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
						Review your responses and get AI-powered feedback to improve your interview skills.
					</Typography>
					<Button
						variant="outlined"
						onClick={() => router.push("/")}
						sx={{ 
							borderRadius: 2,
							fontWeight: 600,
						}}
					>
						Start New Interview
					</Button>
				</Paper>

				{/* Questions list */}
				{questions && questions.length > 0 ? (
					questions.map((question, index) => {
						const transcript = recordedTranscript[question];
						return (
							<QuestionSummaryCard
								key={index}
								question={question}
								transcript={transcript}
								questionIndex={index}
							/>
						);
					})
				) : (
					<Paper
						elevation={2}
						sx={{
							p: 4,
							borderRadius: 3,
							bgcolor: "background.paper",
							border: "1px solid",
							borderColor: "grey.200",
							textAlign: "center",
						}}
					>
						<Typography variant="h6" sx={{ color: "text.secondary" }}>
							No questions available
						</Typography>
					</Paper>
				)}
			</Box>
		</AppLayout>
	);
}
