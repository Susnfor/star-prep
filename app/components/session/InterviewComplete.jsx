import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function InterviewComplete({
	onStartOver,
	onRedo,
	onDownloadAll,
}) {
	return (

				<Box sx={{ textAlign: "center", mt: 4 }}>
					<Typography variant="h6">Interview completed. Thank you!</Typography>
					<Button variant="contained" onClick={onStartOver} sx={{ mx: 1 }}>
						Start Over
					</Button>
					<Button onClick={onRedo} sx={{ mx: 1 }}>
						Redo
					</Button>
					<Button onClick={onDownloadAll} sx={{ mx: 1 }}>
						Download All
					</Button>
				</Box>
	);
}
