/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import UserStatusCard from "../components/UserStatusCard";
import SearchAndFilterSection from "../components/SearchAndFilterSection";
import UserListCard from "../components/UserListCard";
import { useApi } from "../utils/useApi";

export const WorkersStatusPage = ({ setToken }) => {
  const navigate = useNavigate();
  const {
    userDetails,
    usersList,
    statusList,
    selectedStatus,
    error,
    getContacts,
    getStatusList,
    updateUserStatusById,
  } = useApi();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [query, setQuery] = useState(""); // State to hold search input

  const handleSearchChange = (query) => {
    setQuery(query);
  };

  const handleMultiSelectChange = (event) => {
    const { value } = event.target;
    setSelectedOptions(value);
  };

  const handleStatusUpdate = async (e) => {
    try {
      const { value } = e.target;
      if (value !== "") {
        await updateUserStatusById(userDetails.id, value);
      }
    } catch (error) {
      console.log("handleStatusUpdate:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    getContacts({ query, selectedOptions });
  }, [query, selectedOptions, getContacts]);

  useEffect(() => {
    getContacts({ query: "", selectedOptions: [] });
    getStatusList();
  }, [getContacts, getStatusList]);

  return (
    <Grid>
      <Grid container justifyContent="flex-end" sx={{ width: "100%" }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          style={{ marginTop: "1rem", marginRight: "1rem" }}
        >
          Log Out
        </Button>
      </Grid>
      {/* Error Alert - Displayed if there's an error */}
      {error && (
        <Grid item xs={12} sx={{ padding: "1rem" }}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <UserStatusCard
          userDetails={userDetails}
          selectedStatus={selectedStatus}
          handleStatusUpdate={handleStatusUpdate}
          statusList={statusList}
        />

        <SearchAndFilterSection
          usersList={usersList}
          statusList={statusList}
          selectedOptions={selectedOptions}
          handleSearchChange={handleSearchChange}
          handleMultiSelectChange={handleMultiSelectChange}
        />
        <UserListCard usersList={usersList} userDetails={userDetails} />
      </Grid>
    </Grid>
  );
};
