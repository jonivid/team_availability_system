import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Redirects to the homepage
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        style={{ marginTop: "1rem" }}
      >
        Go to Homepage
      </Button>
    </Grid>
  );
};

export default NotFoundPage;
