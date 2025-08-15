"use client";
import { useState, type ChangeEvent } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Colors } from "@/types/types";
import { signupUser } from "@/actions";

export default function SignupForm() {
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupUsername, setSignupUsername] = useState<string>("");

  const handleSignupEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupEmail(event.target.value);
  };

  const handleSignupPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupPassword(event.target.value);
  };

  const handleSignupUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupUsername(event.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await signupUser({
        email: signupEmail,
        password: signupPassword,
        username: signupUsername,
      });

      if (response.success) {
        toast.success("Rejestracja przebiegła pomyślnie!", {
          position: "bottom-center",
          theme: "dark",
          autoClose: 3000,
        });
        setSignupEmail("");
        setSignupPassword("");
        setSignupUsername("");
      } else {
        toast.error(response.message, {
          position: "bottom-center",
          theme: "dark",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Błąd w trakcie rejestracji");
      // eslint-disable-next-line no-console
      console.error(error);
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
      <Stack spacing={2}>
        <Typography
          variant="h6"
          sx={{ color: Colors.primaryGold, fontWeight: 700 }}
        >
          Rejestracja
        </Typography>
        <TextField
          label="Nazwa użytkownika"
          type="text"
          fullWidth
          variant="outlined"
          autoComplete="off"
          value={signupUsername}
          onChange={handleSignupUsernameChange}
          sx={{
            "& .MuiInputLabel-root": { color: Colors.primaryGold },
            "& .MuiInputLabel-root.Mui-focused": { color: Colors.primaryGold },
            "& .MuiOutlinedInput-root": {
              "& input": { color: "#fff" },
              "& fieldset": { borderColor: Colors.primaryGold },
              "&:hover fieldset": { borderColor: Colors.primaryGold },
              "&.Mui-focused fieldset": { borderColor: Colors.primaryGold },
            },
          }}
        />
        <TextField
          label="E-mail"
          type="email"
          fullWidth
          variant="outlined"
          autoComplete="off"
          value={signupEmail}
          onChange={handleSignupEmailChange}
          sx={{
            "& .MuiInputLabel-root": { color: Colors.primaryGold },
            "& .MuiInputLabel-root.Mui-focused": { color: Colors.primaryGold },
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
          value={signupPassword}
          onChange={handleSignupPasswordChange}
          sx={{
            "& .MuiInputLabel-root": { color: Colors.primaryGold },
            "& .MuiInputLabel-root.Mui-focused": { color: Colors.primaryGold },
            "& .MuiOutlinedInput-root": {
              "& input": { color: "#fff" },
              "& fieldset": { borderColor: Colors.primaryGold },
              "&:hover fieldset": { borderColor: Colors.primaryGold },
              "&.Mui-focused fieldset": { borderColor: Colors.primaryGold },
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            bgcolor: Colors.primaryGold,
            color: Colors.primaryDarkest,
            fontWeight: 600,
            "&:hover": { bgcolor: "#ffc94f" },
          }}
          onClick={handleSignup}
        >
          Zarejestruj
        </Button>
      </Stack>
    </Box>
  );
}
