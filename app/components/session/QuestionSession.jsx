// display questionsdisplay and also the timer function and video recording component
import VideoRecorderComponent from "./VideoRecorderComponent";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QuestionDisplay from "@/app/components/ui/QuestionDisplay";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import InterviewComplete from "./InterviewComplete";
import QuestionControls from "../ui/QuestionControls";
import NoSession from "./NoSession";
import RecordingActions from "../ui/RecordingActions";
import TimerDisplay from "../ui/TimerDisplay";

// my controller with hooks
import { useQuestionSessionController } from './controllers/useQuestionSessionController';

export default function QuestionSession() {

	// Use the controller to manage state and actions
	// This controller encapsulates all the logic for the question session
	const controller = useQuestionSessionController();

	// Router to navigate between pages
	// This will be used to redirect users to the setup page if no questions are available
	const router = useRouter();


	// Function to handle the case when no session is available
	const handleNoSession = () =>  router.push("/");
	const handleSummary = () => router.push("/summary");



    // Check if setup data is available and has questions
	// If not, display a message prompting the user to set up the interview
	if (!controller.setupData?.questions?.length) return <NoSession onSetup={handleNoSession} />



	
	if (controller.currentQuestionIndex >= controller.setupData.numQuestions) {
		return (
			<InterviewComplete
				onStartOver={controller.handleInterviewStartOver}
				onRedo={controller.handleRedoQuestions}
				onDownloadAll={controller.handleRecordingDownloadAll}
				onFeedback={handleSummary} // to the summary page for feedback
			/>
		);
	}

	return (
		<Box
			sx={{
				minHeight: "100vh",
				width: "100%",
				bgcolor: "background.default",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				px: 2,
			}}
		>
			<Paper
				elevation={4}
				sx={{
					p: 4,
					width: "100%",
					minHeight: 700,
					mx: "auto",
					textAlign: "center",
					borderRadius: 3,
					display: "flex",
				}}
			>
				<Grid container spacing={2}>
					<Grid size={12}>
                        <TimerDisplay 
                            isPrepTimeOver={controller.isPrepTimeOver}
                            setupData={controller.setupData}
                            isRecording={controller.isRecording}
                            handlePrepTimeEnd={controller.handlePrepTimeEnd}
                            handleRecordingTimeEnd={controller.handleRecordingTimeEnd}
                            keyTimer={controller.keyTimer}
                        />
					</Grid>
					<Grid size={6}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								margin: "0 auto",
							}}
						>
							<QuestionDisplay
								setCurrentQuestionIndex={controller.setCurrentQuestionIndex}
							/>
							<Box mt={2}>
                                {/*This component has the skips */}
								<RecordingActions
									isPrepTimeOver={controller.isPrepTimeOver}
									isRecording={controller.isRecording}
									handlePrepTimeEnd={controller.handlePrepTimeEnd}
									handleRecordingTimeEnd={controller.handleRecordingTimeEnd}
								/>
							</Box>
							<Box mt={2}>
                                { /* This component has the next, retake and download buttons */}
								<QuestionControls
									onNext={controller.handleNextQuestion}
									onRetake={controller.handleRetakeQuestion}
									onDownload={controller.handleCurrentDownload}
								/>
							</Box>
						</Box>
					</Grid>

					<Grid size={6}>
                        {/* This component handles the video recording functionality */}
						<VideoRecorderComponent
							isRecording={controller.isRecording}
							setIsRecording={controller.setIsRecording}
							isPrepTimeOver={controller.isPrepTimeOver}
							setIsPrepTimeOver={controller.setIsPrepTimeOver}
							recorderRef={controller.recorderRef}
						/>
						{controller.isRecording && (
							<Box>
								<Typography variant="body2" color="error" sx={{ mt: 1 }}>
									🔴 Recording...
								</Typography>
								<Paper sx={{ p: 2, mt: 2, backgroundColor: '#f5f5f5' }}>
									<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
										Live Transcript:
									</Typography>
									<Typography variant="body2" sx={{ minHeight: '40px', textAlign: 'left' }}>
										{controller.recordedTranscript[controller.setupData?.questions?.[controller.currentQuestionIndex]] || 'Speak to see transcript...'}
									</Typography>
									<Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
										Debug: Q{controller.currentQuestionIndex}: {controller.setupData?.questions?.[controller.currentQuestionIndex]?.substring(0, 30)}...
									</Typography>
								</Paper>
							</Box>
						)}
						
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
