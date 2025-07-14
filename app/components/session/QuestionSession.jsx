// display questionsdisplay and also the timer function and video recording component
import VideoRecorderComponent from "./VideoRecorderComponent";
import { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useInterview } from "@/app/context/InterviewContext";
import QuestionDisplay from "@/app/components/ui/QuestionDisplay";
import Grid from "@mui/material/Grid";
import { DownloadVideos } from "@/app/lib/downloadVideos";
import { useRouter } from "next/navigation";
import InterviewComplete from "./InterviewComplete";
import QuestionControls from "../ui/QuestionControls";
import NoSession from "./NoSession";
import RecordingActions from "../ui/RecordingActions";
import TimerDisplay from "../ui/TimerDisplay";
import { SpeechTranscriber } from "@/app/lib/SpeechTranscriber";

export default function QuestionSession() {
	// Reference to the video recorder instance
	// This will be used to control recording and access recorded data
	const recorderRef = useRef(null);

	// Initialize the speech transcriber
	const transcriberRef = useRef(null);

	

	// Access the interview context to get setup data and current question index
	// This will allow us to manage the interview state and navigate through questions
	const { setupData, currentQuestionIndex, setCurrentQuestionIndex, recordedTranscript, setRecordedTranscript } =
		useInterview();

	// State to manage recording status and preparation time
	const [isRecording, setIsRecording] = useState(false);
	const [isPrepTimeOver, setIsPrepTimeOver] = useState(false);

	// Key timer to reset the countdown components when starting a new question, as when key changes, the countdown components will reset
	// This is used to force the countdown components to re-render when starting a new question
	const [keyTimer, setKeyTimer] = useState(0);

	// Router to navigate between pages
	// This will be used to redirect users to the setup page if no questions are available
	const router = useRouter();


	
	// Function to handle the case when no session is available
	const handleNoSession = () =>  router.push("/");;

	// Function to handle starting the preparation time
	// This will reset the recording state and start the webcam feed
	// It also resets the key timer to force the countdown components to re-render
	// This is called when the user clicks the "Next Question" or "Retake Question" buttons
	const handlePrepStart = () => {
		setIsRecording(false);
		setIsPrepTimeOver(false);
		recorderRef.current?.startWebcamFeed();
		
		// Clean up existing transcriber before creating new one
		if (transcriberRef.current) {
			try {
				transcriberRef.current.stop();
			} catch (error) {
				console.log("Cleanup transcriber error (expected):", error);
			}
		}
		
		// Initialise new transcriber
		transcriberRef.current = new SpeechTranscriber();
		
		setKeyTimer((prev) => prev + 1); // Reset timer by changing key
	};

	// Function to handle the end of preparation time
	// This will be called when the preparation countdown reaches zero
	//or when the user clicks the "Skip Preparation Time" button
	const handlePrepTimeEnd = () => {
		setIsPrepTimeOver(true);
		if (recorderRef.current) {
			recorderRef.current.startRecording();
			setIsRecording(true);
			
			// // Ensure transcriber is initialized and set up callbacks
			// if (!transcriberRef.current) {
			// 	console.log("Creating transcriber in handlePrepTimeEnd");
			// 	transcriberRef.current = new SpeechTranscriber();
			// }
			
			if (transcriberRef.current && transcriberRef.current.supported) {
				console.log("Setting up transcriber for question:", currentQuestionIndex);
				
				transcriberRef.current.onTranscription = (text) => {
					console.log("Live transcript received:", text);
					const questionText = setupData?.questions?.[currentQuestionIndex];
					if (questionText) {
						setRecordedTranscript((prev) => ({
							...prev,
							[questionText]: text,
						}));
					}
				};
				
				transcriberRef.current.onError = (error) => {
					if (error !== 'aborted') {
						console.error("Transcription error:", error);
					}
				};
				
				// Start transcription
				transcriberRef.current.start().catch((error) => {
					if (error !== 'aborted') {
						console.error("Failed to start transcription:", error);
					}
				});
			} else {
				console.warn("Transcriber not supported or not initialized");
			}
		}
	};
	// Function to handle the end of recording time
	// This will be called when the recording countdown reaches zero
	// or when the user clicks the "End Recording" button
	const handleRecordingTimeEnd = () => {
		if (recorderRef.current) {
			recorderRef.current.stopRecording();
			setIsRecording(false);
			
			// Stop transcription and get final transcript
			if (transcriberRef.current) {
				transcriberRef.current.stop().then((finalTranscript) => {
					const questionText = setupData?.questions?.[currentQuestionIndex];
					if (questionText && finalTranscript && finalTranscript.trim()) {
						setRecordedTranscript((prev) => ({
							...prev,
							[questionText]: finalTranscript,
						}));
						console.log("Final transcript for question", currentQuestionIndex, ":", finalTranscript);
					}
				}).catch((error) => {
					if (error !== 'aborted') {
						console.error("Error stopping transcription:", error);
					}
				});
			}
		}
	};
	// Function to handle downloading the current recording
	// This will be called when the user clicks the "Download" button
	// It retrieves the current recording from the recorder reference and initiates the download
	// It uses the DownloadVideos class to handle the download process
	const handleRecordingDownload = () => {
        //get blob from recorderRef
            const recording = recorderRef.current?.getCurrentRecording(); //is {id, blob}
			if (recording) {
				console.log("Recording saved:", recording);
				// Download the video
				new DownloadVideos(recording).downloadCurrentRecording(recording);
		}
	};

	// Function to handle downloading all recordings
	// This will be called when the user clicks the "Download All" button
	// It retrieves all recordings from the recorder reference and initiates the download
	const handleRecordingDownloadAll = () => {
		if (recorderRef.current) {
			// get all recordings
			const allRecordings = recorderRef.current.getAllRecordings(); //is [{id, blob}, ...]
			if (allRecordings.length > 0) {
				console.log("All recordings saved:", allRecordings);
				// Download all videos
				new DownloadVideos(allRecordings).downloadAllRecordings();
			}
		}
	};



	// Function to handle retaking the current question
	// This will reset the recording state and start the preparation time again
	const handleRetakeQuestion = () => handlePrepStart();
	// Function to handle moving to the next question
	// This will reset the recording state, start the webcam feed, and prepare for the next question
	// It also resets the preparation time to allow the user to prepare for the next question
	// This is called when the user clicks the "Next Question" button
	const handleNextQuestion = () => {
		setIsRecording(false);
		setIsPrepTimeOver(false);
		recorderRef.current?.startWebcamFeed();
		setCurrentQuestionIndex((prev) => Math.min(prev + 1));
		handlePrepStart();
	};

	const handleInterviewStartOver = () => {
		setCurrentQuestionIndex(0);
		router.push("/");
		recorderRef.current?.stopWebcamFeed();
	};

	const handleRedoQuestions = () => {
		setCurrentQuestionIndex(0);
		handlePrepStart();
	};

    // Check if setup data is available and has questions
	// If not, display a message prompting the user to set up the interview
	if (!setupData?.questions?.length) return <NoSession onSetup={handleNoSession} />

	// If the current question index exceeds the number of questions, display a completion message
	// This will show a message indicating that the interview is completed and provide options to start over
	// or redo the interview, and download all recordings
	// It also resets the current question index to allow starting over

		// Initialize transcriber on component mount for the first question
	useEffect(() => {
		if (!transcriberRef.current) {
			console.log("Initializing transcriber for first question");
			transcriberRef.current = new SpeechTranscriber();
		}
	}, []);

    useEffect(() => {
	if (currentQuestionIndex >= setupData.numQuestions) {
		recorderRef.current?.stopWebcamFeed();
	}
}, [currentQuestionIndex, setupData.numQuestions, recorderRef]);

	// Initialize transcriber on component mount for the first question
	useEffect(() => {
		if (!transcriberRef.current) {
			console.log("Initializing transcriber for first question");
			transcriberRef.current = new SpeechTranscriber();
		}
	}, []);

	// Cleanup transcriber on component unmount
	useEffect(() => {
		return () => {
			if (transcriberRef.current) {
				try {
					transcriberRef.current.stop();
				} catch (error) {
					// Ignore cleanup errors
				}
			}
		};
	}, []);
	
	if (currentQuestionIndex >= setupData.numQuestions) {
		return (
			<InterviewComplete
				onStartOver={handleInterviewStartOver}
				onRedo={handleRedoQuestions}
				onDownloadAll={handleRecordingDownloadAll}
				onFeedback={() => router.push("/summary")} // to the summary page for feedback
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
                            isPrepTimeOver={isPrepTimeOver}
                            setupData={setupData}
                            isRecording={isRecording}
                            handlePrepTimeEnd={handlePrepTimeEnd}
                            handleRecordingTimeEnd={handleRecordingTimeEnd}
                            keyTimer={keyTimer}
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
								setCurrentQuestionIndex={setCurrentQuestionIndex}
							/>
							<Box mt={2}>
                                {/*This component has the skips */}
								<RecordingActions
									isPrepTimeOver={isPrepTimeOver}
									isRecording={isRecording}
									handlePrepTimeEnd={handlePrepTimeEnd}
									handleRecordingTimeEnd={handleRecordingTimeEnd}
								/>
							</Box>
							<Box mt={2}>
                                { /* This component has the next, retake and download buttons */}
								<QuestionControls
									onNext={handleNextQuestion}
									onRetake={handleRetakeQuestion}
									onDownload={handleRecordingDownload}
								/>
							</Box>
						</Box>
					</Grid>

					<Grid size={6}>
                        {/* This component handles the video recording functionality */}
						<VideoRecorderComponent
							isRecording={isRecording}
							setIsRecording={setIsRecording}
							isPrepTimeOver={isPrepTimeOver}
							setIsPrepTimeOver={setIsPrepTimeOver}
							recorderRef={recorderRef}
						/>
						{isRecording && (
							<Box>
								<Typography variant="body2" color="error" sx={{ mt: 1 }}>
									🔴 Recording...
								</Typography>
								<Paper sx={{ p: 2, mt: 2, backgroundColor: '#f5f5f5' }}>
									<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
										Live Transcript:
									</Typography>
									<Typography variant="body2" sx={{ minHeight: '40px', textAlign: 'left' }}>
										{recordedTranscript[setupData?.questions?.[currentQuestionIndex]] || 'Speak to see transcript...'}
									</Typography>
									<Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
										Debug: Q{currentQuestionIndex}: {setupData?.questions?.[currentQuestionIndex]?.substring(0, 30)}...
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
