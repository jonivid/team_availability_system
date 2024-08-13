/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Avatar,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const UserListCard = ({ usersList, userDetails }) => {
  return (
    <Grid item xs={12} md={8} lg={6}>
      {usersList ? (
        <Card variant="outlined" sx={{ borderRadius: "12px", padding: "1rem" }}>
          <List dense sx={{ width: "100%" }}>
            {usersList
              .filter((u) => u.id !== userDetails?.id)
              .map((u) => (
                <ListItem key={u.id} sx={{ borderBottom: "1px solid #e0e0e0" }}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: u.color }}>
                        {u.firstName[0].toUpperCase()}
                        {u.lastName[0].toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${
                        u.firstName[0].toUpperCase() +
                        u.firstName.slice(1).toLowerCase()
                      } ${
                        u.lastName[0].toUpperCase() +
                        u.lastName.slice(1).toLowerCase()
                      }`}
                    />
                    <IconButton aria-label="status" sx={{ color: u.color }}>
                      <CircleIcon />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Card>
      ) : (
        <Stack spacing={2}>
          <Skeleton variant="rectangular" width="100%" height={56} />
          <Skeleton variant="rectangular" width="100%" height={56} />
        </Stack>
      )}
    </Grid>
  );
};

export default UserListCard;
