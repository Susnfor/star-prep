import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function AppLayout({ 
    title = "Star Prep", 
    subtitle, 
    rightIcon, 
    rightText, 
    rightColor = "info.main",
    children 
}) {
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
                {/* Header */}
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
                    {/* Left side - App title */}
                    <Box>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>

                    {/* Right side - Optional icon and text */}
                    {(rightIcon || rightText) && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {rightIcon && rightIcon}
                            {rightText && (
                                <Typography variant="h6" sx={{ color: rightColor, fontWeight: 600 }}>
                                    {rightText}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>

                {/* Main content */}
                <Box sx={{ flex: 1, p: 2, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {children}
                </Box>
            </Paper>
        </Box>
    );
}
