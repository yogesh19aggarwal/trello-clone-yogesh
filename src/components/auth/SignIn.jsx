import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import SnackBarComponent from "../../utils/SnackBarComponent";

const SignIn = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("Success");
  const navigate = useNavigate();

  const hardcodedUsername = "user123";
  const hardcodedPassword = "password123";

  const handleSignIn = (e) => {
    e.preventDefault();

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setIsAuthenticated(true);
      setSnackbarOpen(true);
      setSeverity("success");
      setMessage("Successfully Logged In");
      setTimeout(() => navigate("/boards"), 1500);
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <Container className="flex justify-center items-center min-h-screen bg-gray-100">
      <Box
        component="form"
        onSubmit={handleSignIn}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <Typography variant="h4" className="text-center !mb-4">
          Sign In
        </Typography>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          className="!mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          className="!mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mb-4"
        >
          Sign In
        </Button>
      </Box>

      <SnackBarComponent
        severity={severity}
        message={message}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </Container>
  );
};

export default SignIn;
