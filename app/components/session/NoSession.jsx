import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default function NoSession({onSetup}) {
    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">
            No questions available. Please set up the interview first.
            </Typography>
            <Button onClick={onSetup}>Setup</Button>
        </Box>
    );

}