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
				height: "100vh",
				width: "100%",
				bgcolor: "grey.50",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				p: 2,
				overflow: "hidden",
			}}
		>
			<Paper
				elevation={8}
				sx={{
					width: "100%",
					height: "95vh",
					maxWidth: "1200px",
					borderRadius: 4,
					background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
					boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				}}
			>
				{/* Header with timer */}
				<Box 
					sx={{ 
						px: 3,
						py: 1.5,
						borderBottom: "1px solid",
						borderColor: "grey.200",
						flexShrink: 0,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{/* Left side - App title and progress */}
					<Box>
						<Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}>
							Star Prep
						</Typography>
						<Typography variant="body2" sx={{ color: "text.secondary" }}>
							Question {controller.currentQuestionIndex + 1} of {controller.setupData?.numQuestions || 0} • {controller.setupData?.jobTitle || 'Interview Practice'}
						</Typography>
					</Box>

					{/* Right side - Timer */}
					<Box>
						<TimerDisplay 
							isPrepTimeOver={controller.isPrepTimeOver}
							setupData={controller.setupData}
							isRecording={controller.isRecording}
							handlePrepTimeEnd={controller.handlePrepTimeEnd}
							handleRecordingTimeEnd={controller.handleRecordingTimeEnd}
							keyTimer={controller.keyTimer}
						/>
					</Box>
				</Box>

				{/* Main content grid */}
				<Box sx={{ flex: 1, p: 2, overflow: "hidden" }}>
					<Grid container spacing={2} sx={{ height: "100%" }}>
						{/* Left column - Question and controls */}
						<Grid size={6}>
							<Paper
								elevation={2}
								sx={{
									p: 3,
									height: "100%",
									borderRadius: 3,
									bgcolor: "background.paper",
									border: "1px solid",
									borderColor: "grey.200",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
								}}
							>
								{/* Question section */}
								<Box sx={{ flex: 1, mb: 3, overflow: "auto" }}>
									<QuestionDisplay
										setCurrentQuestionIndex={controller.setCurrentQuestionIndex}
									/>
								</Box>

								{/* Controls section */}
								<Box 
									sx={{ 
										display: "flex", 
										flexDirection: "column", 
										gap: 2,
										alignItems: "center",
										flexShrink: 0,
									}}
								>
									<RecordingActions
										isPrepTimeOver={controller.isPrepTimeOver}
										isRecording={controller.isRecording}
										handlePrepTimeEnd={controller.handlePrepTimeEnd}
										handleRecordingTimeEnd={controller.handleRecordingTimeEnd}
									/>
									
									<QuestionControls
										onNext={controller.handleNextQuestion}
										onRetake={controller.handleRetakeQuestion}
										onDownload={controller.handleCurrentDownload}
									/>
								</Box>
							</Paper>
						</Grid>

						{/* Right column - Video recorder */}
						<Grid size={6}>
							<Paper
								elevation={2}
								sx={{
									p: 3,
									height: "100%",
									borderRadius: 3,
									bgcolor: "background.paper",
									border: "1px solid",
									borderColor: "grey.200",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<VideoRecorderComponent
									isRecording={controller.isRecording}
									setIsRecording={controller.setIsRecording}
									isPrepTimeOver={controller.isPrepTimeOver}
									setIsPrepTimeOver={controller.setIsPrepTimeOver}
									onRecorderReady={controller.handleRecorderReady}
									recorderRef={controller.recorderRef}
								/>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
}
