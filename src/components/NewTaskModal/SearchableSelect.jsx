import React from "react";
import { Autocomplete, TextField, MenuItem } from "@mui/material";

// Assuming merchants and organizations are arrays with objects having 'id' and 'merchant_name' or 'organization_name' properties.
// Adjust the structure based on your actual data.

export default function SearchableSelect({
  thirdMenuChoice,
  handleAccountChange,
  merchantTab,
  merchants,
  organizations,
}) {
  return (
    <Autocomplete
      value={thirdMenuChoice !== "" ? thirdMenuChoice : null}
      onChange={(event, value) => {
        if (value) {
          const accountName = merchantTab
            ? value.merchant_name
            : value.organization_name;
          if (accountName) {
            handleAccountChange(event, accountName);
          } else {
            // Handle the case where accountName is null or undefined
            console.error("Account name is null or undefined");
          }
        } else {
          // Handle the case where value is null or undefined
          console.error("Selected value is null or undefined");
        }
      }}
      options={merchantTab ? merchants : organizations}
      renderInput={(params) => {

        return (
          <TextField
            {...params}
            placeholder={
              params.inputProps.value ? params.inputProps.value : "Account Name"
            }
            variant="outlined"
          />
        );
      }}
      filterOptions={(options, { inputValue }) =>
        options.filter((option) => {
          const label = merchantTab
            ? option.merchant_name
            : option.organization_name;
          return label.toLowerCase().includes(inputValue.toLowerCase());
        })
      }
      sx={{ margin: "5px 0" }}
      renderOption={(props, option) => (
        <MenuItem key={option.id} {...props}>
          {merchantTab ? option.merchant_name : option.organization_name}
        </MenuItem>
      )}
    />
  );
}
