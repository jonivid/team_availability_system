/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          padding: 2,
          textAlign: "center",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 50, mb: 2 }} />
          <Typography variant="h5" component="div" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            An unexpected error has occurred.
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="pre"
            sx={{ color: "error.main" }}
          >
            {error.message}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={resetErrorBoundary}
          >
            Try Again
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ErrorFallback;
