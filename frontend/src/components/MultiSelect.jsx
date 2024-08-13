/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";

export const MultiSelect = ({ options, selectedOptions, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Filter By Status</InputLabel>
      <Select
        multiple
        value={selectedOptions}
        onChange={onChange}
        renderValue={(selected) =>
          selected
            .map(
              (selectedId) =>
                options.find((option) => option.id === selectedId).status,
            )
            .join(", ")
        }
      >
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={selectedOptions.includes(option.id)} />
            <ListItemText primary={option.status} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
