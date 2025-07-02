import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function NoSession(onClick) {
    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">
            No questions available. Please set up the interview first.
            </Typography>
            <Button onClick={onClick}>Setup</Button>
        </Box>
    );

}