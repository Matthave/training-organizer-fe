"use client";
import {
  useState,
  type ChangeEvent,
  useEffect,
  type KeyboardEvent,
} from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Colors } from "@/types/types";
import { signupUser } from "@/actions";

export default function SignupForm() {
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupUsername, setSignupUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const isUsernameValid = signupUsername.length >= 2;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(signupEmail);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    const isPasswordValid = passwordRegex.test(signupPassword);

    setIsFormValid(isUsernameValid && isEmailValid && isPasswordValid);
  }, [signupEmail, signupPassword, signupUsername]);

  const handleSignupEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setSignupEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailError && emailRegex.test(newEmail)) {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (signupEmail && !emailRegex.test(signupEmail)) {
      setEmailError("Podaj poprawny adres e-mail.");
    } else {
      setEmailError("");
    }
  };

  const handleSignupPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setSignupPassword(newPassword);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (passwordError && passwordRegex.test(newPassword)) {
      setPasswordError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!signupPassword) {
      setPasswordError("");
      return;
    }

    const errors = [];
    if (signupPassword.length < 8) {
      errors.push("co najmniej 8 znaków");
    }
    if (!/[a-z]/.test(signupPassword)) {
      errors.push("jedną małą literę");
    }
    if (!/[A-Z]/.test(signupPassword)) {
      errors.push("jedną dużą literę");
    }
    if (!/[^A-Za-z0-9]/.test(signupPassword)) {
      errors.push("jeden znak specjalny");
    }

    if (errors.length > 0) {
      setPasswordError(`Hasło musi zawierać: ${errors.join(", ")}.`);
    } else {
      setPasswordError("");
    }
  };

  const handleSignupUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setSignupUsername(newUsername);
    if (usernameError && newUsername.length >= 2) {
      setUsernameError("");
    }
  };

  const handleUsernameBlur = () => {
    if (signupUsername && signupUsername.length < 2) {
      setUsernameError("Nazwa użytkownika musi mieć co najmniej 2 znaki.");
    } else {
      setUsernameError("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && isFormValid) {
      handleSignup();
    }
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
      onKeyDown={handleKeyDown}
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
          onBlur={handleUsernameBlur}
          error={!!usernameError}
          helperText={usernameError}
          sx={{
            "& .MuiInputLabel-root": { color: Colors.primaryGold },
            "& .MuiInputLabel-root.Mui-focused": { color: Colors.primaryGold },
            "& .MuiOutlinedInput-root": {
              "& input": { color: "#fff" },
              "& fieldset": { borderColor: Colors.primaryGold },
              "&:hover fieldset": { borderColor: Colors.primaryGold },
              "&.Mui-focused fieldset": { borderColor: Colors.primaryGold },
            },
            "& .MuiFormHelperText-root": {
              color: "#f44336",
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
          onBlur={handleEmailBlur}
          error={!!emailError}
          helperText={emailError}
          sx={{
            "& .MuiInputLabel-root": { color: Colors.primaryGold },
            "& .MuiInputLabel-root.Mui-focused": { color: Colors.primaryGold },
            "& .MuiOutlinedInput-root": {
              "& input": { color: "#fff" },
              "& fieldset": { borderColor: Colors.primaryGold },
              "&:hover fieldset": { borderColor: Colors.primaryGold },
              "&.Mui-focused fieldset": { borderColor: Colors.primaryGold },
            },
            "& .MuiFormHelperText-root": {
              color: "#f44336",
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
          onBlur={handlePasswordBlur}
          error={!!passwordError}
          helperText={passwordError}
          sx={{
            "& .MuiInputLabel-root": { color: Colors.primaryGold },
            "& .MuiInputLabel-root.Mui-focused": { color: Colors.primaryGold },
            "& .MuiOutlinedInput-root": {
              "& input": { color: "#fff" },
              "& fieldset": { borderColor: Colors.primaryGold },
              "&:hover fieldset": { borderColor: Colors.primaryGold },
              "&.Mui-focused fieldset": { borderColor: Colors.primaryGold },
            },
            "& .MuiFormHelperText-root": {
              color: "#f44336",
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          disabled={!isFormValid}
          sx={{
            mt: 1,
            bgcolor: Colors.primaryGold,
            color: Colors.primaryDarkest,
            fontWeight: 600,
            "&:hover": { bgcolor: "#ffc94f" },
            "&.Mui-disabled": {
              cursor: "not-allowed",
              pointerEvents: "auto",
            },
          }}
          onClick={handleSignup}
        >
          Zarejestruj
        </Button>
      </Stack>
    </Box>
  );
}
