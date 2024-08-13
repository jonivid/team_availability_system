/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import debounce from "lodash/debounce";

export const FreeTextSearchWithDebounce = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 500),
    [],
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <TextField
      id="search-input"
      label="Search"
      variant="outlined"
      value={query}
      onChange={handleInputChange}
      fullWidth
    />
  );
};
