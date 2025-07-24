import Box from "@mui/material/Box";
import CountDownComponent from "@/app/components/ui/CountdownComponent";

export default function TimerDisplay({
	isPrepTimeOver,
	setupData,
	isRecording,
	handlePrepTimeEnd,
	handleRecordingTimeEnd,
	keyTimer,
}) {
	return (
		<Box sx={{minHeight: 80, minWidth: 200, display: "flex", justifyContent: "flex-end" }}>
			{!isPrepTimeOver && (
				<CountDownComponent
					key={`prep-${keyTimer}`}
					isPlaying={!isPrepTimeOver}
					onComplete={handlePrepTimeEnd}
					time={setupData.prepTime}
					label="Prep Time Left"
				/>
			)}
			{isRecording && (
				<CountDownComponent
					key={`record-${keyTimer}`}
					isPlaying={isRecording}
					onComplete={handleRecordingTimeEnd}
					time={setupData.recordingTime}
					label="Recording Time Left"
				/>
			)}
		</Box>
	);
}
