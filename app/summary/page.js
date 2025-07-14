"use client";
import FeedbackComponent from "../components/feedback/FeedbackComponent";
import { useInterview } from "../context/InterviewContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
// import CircularProgress from "@mui/material/CircularProgress";

export default function SummaryPage() {
	const { recordedTranscript, setupData } = useInterview();
	const questions = setupData?.questions || [];
	console.log("Recorded transcript:", recordedTranscript);
console.log("Setup questions:", questions);

	return (
		<Box sx={{ p: 4,     minHeight: "100vh",
        width: "100%",
}}>
			<Typography variant="h4" gutterBottom align="center" fontWeight="bold">
				Interview Summary
			</Typography>

			{questions ? questions.map((question, index) => {
				const transcript = recordedTranscript[question];
				return (
					<Paper key={index} sx={{ p: 3, my: 3 }}>
						<Typography variant="h5" fontWeight="bold"gutterBottom>
							Question {index + 1}
						</Typography>
						<Typography variant="subtitle1" gutterBottom fontStyle="italic">
							{question}
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Typography  variant="h6">Your Answer:</Typography>
						<Typography sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
							{transcript || "No response recorded."}
						</Typography>
						
        {transcript && 
          <>
            <Typography  sx={{ mb: 1, mt: 2}} variant="h6"> Feedback: </Typography>
            <FeedbackComponent
              transcribedText={transcript}
              question={question}
            />
          </>
        }
					</Paper>
				);
			}): <><p>No questions</p></>}
		</Box>
	);
}
