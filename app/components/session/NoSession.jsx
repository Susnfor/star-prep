import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AppLayout from "../ui/AppLayout";

export default function NoSession({onSetup}) {
    return (
        <AppLayout
            subtitle="Interview Setup Required"
            rightIcon={<InfoOutlinedIcon sx={{ color: "info.main", fontSize: 32 }} />}
            rightText="Setup Required"
            rightColor="info.main"
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
                {/* Info icon */}
                <InfoOutlinedIcon sx={{ color: "info.main", fontSize: 64, mb: 3 }} />
                
                <Typography variant="h4" sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
                    No Interview Session
                </Typography>
                
                <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
                    No questions available. Please set up your interview first.
                </Typography>

                <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
                    Choose your job role, set the number of questions, and start practicing your interview skills!
                </Typography>

                {/* Setup button */}
                <Button 
                    variant="contained" 
                    onClick={onSetup}
                    size="large"
                    sx={{ 
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontWeight: 600,
                    }}
                >
                    Setup Interview
                </Button>
            </Paper>
        </AppLayout>
    );
}