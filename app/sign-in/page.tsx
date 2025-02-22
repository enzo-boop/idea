"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { DoorBack, Key, Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const SignIn = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    validate();
    if (emailError || passError) return;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Credenziali non valide!");
    } else {
      location.href = "/";
    }
  };

  const validate = () => {
    setEmailError(false);
    setPassError(false);
    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPassError(true);
    }
  };

  if (session?.user) location.href = "/";

  return (
    <Container
      className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
      component="main"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ maxWidth: "330px" }}>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            fullWidth
            margin="normal"
            error={emailError}
            helperText={emailError ? "Questo campo è obbligatorio" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            fullWidth
            margin="normal"
            error={passError}
            helperText={passError ? "Questo campo è obbligatorio" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Container
            sx={{
              display: "flex",
              justifyContent: "end",
              padding: "0!important",
            }}
          >
            <Button
              variant="contained"
              color={error?"error":"primary"}
              type="submit"
              onClick={(e) => handleSubmit(e)}
              startIcon={error?(<Lock/>):(<Key />)}
            >
              Accedi
            </Button>
          </Container>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
