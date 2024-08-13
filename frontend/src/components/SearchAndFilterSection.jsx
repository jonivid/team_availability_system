/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import { FreeTextSearchWithDebounce } from "../components/FreeTextSearchWithDebounce";
import { MultiSelect } from "../components/MultiSelect";

const SearchAndFilterSection = ({
  usersList,
  statusList,
  selectedOptions,
  handleSearchChange,
  handleMultiSelectChange,
}) => {
  return usersList !== null ? (
    <Grid
      item
      xs={12}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item style={{ margin: 20, width: "300px" }}>
        <FreeTextSearchWithDebounce onSearch={handleSearchChange} />
      </Grid>
      <Grid item style={{ margin: 20, width: "300px" }}>
        <MultiSelect
          options={statusList || []} // Provide an empty array if statusList is null
          selectedOptions={selectedOptions}
          onChange={handleMultiSelectChange}
        />
      </Grid>
    </Grid>
  ) : (
    <Grid
      item
      xs={12}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={2} direction="row">
        <Skeleton variant="rectangular" width={300} height={56} />
        <Skeleton variant="rectangular" width={300} height={56} />
      </Stack>
    </Grid>
  );
};

export default SearchAndFilterSection;
