/* eslint-disable react/prop-types */
// export default LoginPage;
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Paper, Typography, Grid, Box, Avatar, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useApi } from "../utils/useApi";

const LoginPage = ({ setToken }) => {
  const navigate = useNavigate();
  const { error, submitLoginDetails } = useApi();

  const handleLogin = async (credentials) => {
    const token = await submitLoginDetails(credentials);
    if (token) {
      setToken(token);
      sessionStorage.setItem("token", token);
      navigate("/workers_status", { replace: true });
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", backgroundColor: "#f0f2f5" }} // Soft background color
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 2,
            maxWidth: "100%",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              margin: "0 auto",
              backgroundColor: "primary.main",
              mb: 2,
              width: 56,
              height: 56,
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" component="h1" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Please login to your account
          </Typography>{" "}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <LoginForm onSubmit={handleLogin} />
        </Paper>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Your PubPlus. All rights reserved.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
