import { Box, Typography } from "@mui/material";

export default function Profile() {
  return (
    <Box
      sx={{
        pt: 2,
        mt: 3,
        maxWidth: "1300px",
        margin: "0 auto",
        pb: "100px",
        px: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: "#fff",
            fontFamily: "Michroma",
            textTransform: "uppercase",
            fontSize: "24px",
            textAlign: "center",
          }}
          variant="h5"
          component="h1"
        >
          Zakładka profilu edycji użytkownika inProgress
        </Typography>
      </Box>
    </Box>
  );
}
