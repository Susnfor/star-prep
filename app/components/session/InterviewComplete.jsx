import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AppLayout from "../ui/AppLayout";

export default function InterviewComplete({
	onStartOver,
	onRedo,
	onDownloadAll,
	onFeedback,
}) {
	return (
		<AppLayout
			subtitle="Interview Session Complete"
			rightIcon={<CheckCircleOutlineIcon sx={{ color: "success.main", fontSize: 32 }} />}
			rightText="Complete!"
			rightColor="success.main"
		>
			<Paper
				elevation={2}
				sx={{
					p: 6,
					borderRadius: 3,
					bgcolor: "background.paper",
					border: "1px solid",
					borderColor: "grey.200",
					textAlign: "center",
					maxWidth: "600px",
					width: "100%",
				}}
			>
				{/* Success message */}
				<CheckCircleOutlineIcon sx={{ color: "success.main", fontSize: 64, mb: 3 }} />
				
				<Typography variant="h4" sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
					Congratulations!
				</Typography>
				
				<Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
					You've successfully completed your interview practice session.
				</Typography>

				<Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
					Great job! You can now review your performance, download your recordings, or start a new session.
				</Typography>

				{/* Action buttons */}
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid size={6}>
						<Button 
							variant="contained" 
							onClick={onFeedback}
							fullWidth
							size="large"
							sx={{ 
								py: 1.5,
								borderRadius: 2,
								fontWeight: 600,
							}}
						>
							View Feedback
						</Button>
					</Grid>
					<Grid size={6}>
						<Button 
							variant="outlined" 
							onClick={onDownloadAll}
							fullWidth
							size="large"
							sx={{ 
								py: 1.5,
								borderRadius: 2,
								fontWeight: 600,
							}}
						>
							Download All
						</Button>
					</Grid>
					<Grid size={6}>
						<Button 
							variant="outlined" 
							onClick={onRedo}
							fullWidth
							size="large"
							sx={{ 
								py: 1.5,
								borderRadius: 2,
							}}
						>
							Redo Session
						</Button>
					</Grid>
					<Grid size={6}>
						<Button 
							variant="text" 
							onClick={onStartOver}
							fullWidth
							size="large"
							sx={{ 
								py: 1.5,
								borderRadius: 2,
							}}
						>
							Start New Interview
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</AppLayout>
	);
}
