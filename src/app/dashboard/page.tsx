"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <Box
      sx={{
        py: 2,
        mt: 3,
        maxWidth: "1300px",
        margin: "0 auto",
        px: "25px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          mt: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: "300px",
            height: "400px",
            backgroundColor: "rgba(253, 189, 50, 0.25)",
            border: "2px solid #fdbd32",
            borderRadius: "31px",
            p: 2,
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(253, 189, 50, 0.5)",
            },
          }}
          onClick={() => router.push("/dashboard/exercises")}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "Michroma",
              textTransform: "uppercase",
              fontSize: "28px",
              lineHeight: "50px",
              textAlign: "center",
            }}
          >
            Biblioteka ćwiczeń
          </Typography>
        </Box>
        <Box
          sx={{
            width: "300px",
            height: "400px",
            backgroundColor: "rgba(0, 185, 160, 0.25)",
            border: "2px solid #00af97",
            borderRadius: "31px",
            p: 2,
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 185, 160, 0.5)",
            },
          }}
          onClick={() => router.push("/dashboard/create-training")}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "Michroma",
              textTransform: "uppercase",
              fontSize: "28px",
              lineHeight: "50px",
              textAlign: "center",
            }}
          >
            Kreator treningowy
          </Typography>
        </Box>
        <Box
          sx={{
            width: "300px",
            height: "400px",
            backgroundColor: "rgba(47, 72, 88, 0.25)",
            border: "2px solid #2f4858",
            borderRadius: "31px",
            p: 2,
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(47, 72, 88, 0.7)",
            },
          }}
          onClick={() => router.push("/dashboard/trainings")}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "Michroma",
              textTransform: "uppercase",
              fontSize: "28px",
              lineHeight: "50px",
              textAlign: "center",
            }}
          >
            Moje treningi
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
