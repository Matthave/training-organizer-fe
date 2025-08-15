"use client";
import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "@/types/types";

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLoginEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(event.target.value);
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const URL = `http://localhost:8080/auth/login`;
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status !== 200) {
        setError(
          data.message || "Logowanie nie powiodło się! Spróbuj ponownie.",
        );
        return;
      }
      if (data.token) {
        document.cookie = `token=${data.token}; path=/; max-age=86400`;
      }
      setLoginEmail("");
      setLoginPassword("");
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Wystąpił nieoczekiwany błąd.");
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: Colors.primaryDarkest,
        border: `1px solid ${Colors.primaryGold}`,
        borderRadius: 2,
        boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
        p: 3,
      }}
    >
      <form action={handleLogin}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography
            variant="h6"
            sx={{ color: Colors.primaryGold, fontWeight: 700 }}
          >
            Logowanie
          </Typography>
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={loginEmail}
            onChange={handleLoginEmailChange}
            sx={{
              "& .MuiInputLabel-root": { color: Colors.primaryGold },
              "& .MuiInputLabel-root.Mui-focused": {
                color: Colors.primaryGold,
              },
              "& .MuiOutlinedInput-root": {
                "& input": { color: "#fff" },
                "& fieldset": { borderColor: Colors.primaryGold },
                "&:hover fieldset": { borderColor: Colors.primaryGold },
                "&.Mui-focused fieldset": { borderColor: Colors.primaryGold },
              },
            }}
          />
          <TextField
            label="Hasło"
            type="password"
            fullWidth
            variant="outlined"
            value={loginPassword}
            onChange={handleLoginPasswordChange}
            sx={{
              "& .MuiInputLabel-root": { color: Colors.primaryGold },
              "& .MuiInputLabel-root.Mui-focused": {
                color: Colors.primaryGold,
              },
              "& .MuiOutlinedInput-root": {
                "& input": { color: "#fff" },
                "& fieldset": { borderColor: Colors.primaryGold },
                "&:hover fieldset": { borderColor: Colors.primaryGold },
                "&.Mui-focused fieldset": { borderColor: Colors.primaryGold },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              bgcolor: Colors.primaryGold,
              color: Colors.primaryDarkest,
              fontWeight: 600,
              "&:hover": { bgcolor: "#ffc94f" },
            }}
          >
            Zaloguj
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
