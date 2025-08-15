"use client";
import { Box } from "@mui/material";
import { Colors } from "@/types/types";
import SignupForm from "@/components/SignupForm/SignupForm";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primaryDark,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <SignupForm />
        <LoginForm />
      </Box>
    </Box>
  );
}
