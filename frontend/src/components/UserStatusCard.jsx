/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const UserStatusCard = ({
  userDetails,
  selectedStatus,
  handleStatusUpdate,
  statusList,
}) => {
  return (
    <Grid
      item
      xs={12}
      md={8}
      lg={6}
      sx={{
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card sx={{ padding: "2rem", borderRadius: "12px", width: "100%" }}>
        {userDetails ? (
          <>
            <Typography variant="h5" gutterBottom textAlign="center">
              Welcome,{" "}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {`${userDetails.firstName[0].toUpperCase()}${userDetails.firstName
                  .slice(1)
                  .toLowerCase()} ${userDetails.lastName[0].toUpperCase()}${userDetails.lastName
                  .slice(1)
                  .toLowerCase()}`}
              </Box>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: "1rem" }}
              textAlign="center"
            >
              Your current status is:{" "}
              <Box
                component="span"
                sx={{ color: userDetails.color, fontWeight: "bold" }}
              >
                {userDetails.status}
              </Box>
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={selectedStatus}
                onChange={handleStatusUpdate}
                sx={{ borderRadius: "8px" }}
                renderValue={(selected) => {
                  // Handle cases where statusList is null or undefined
                  if (!statusList) {
                    return selected;
                  }

                  const selectedItem = statusList.find(
                    (item) => item.id === selected,
                  );

                  return selectedItem ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <span>{selectedItem.status}</span>
                      <CircleIcon sx={{ color: selectedItem.color, ml: 1 }} />
                    </Box>
                  ) : (
                    selected
                  );
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {statusList &&
                  statusList
                    .sort((a, b) => a.status.localeCompare(b.status))
                    .map((s) => (
                      <MenuItem
                        key={s.id}
                        value={s.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{s.status}</span>
                        <CircleIcon sx={{ color: s.color }} />
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </>
        ) : (
          <Stack spacing={2}>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Stack>
        )}
      </Card>
    </Grid>
  );
};

export default UserStatusCard;
