"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    sx: {
      maxHeight: `${ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP}px`,
      width: 250,
      backgroundColor: "#1c1c1e",
      color: "#fff",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none", // Firefox
    },
  },
};

const SelectElement = ({
  optionsToSelect = [],
  selectHandler,
  selectState,
  id,
  singleChoice,
}: {
  optionsToSelect: { name: string }[];
  selectHandler: (filterValue: string[], id: string) => void;
  selectState: string[];
  id: string;
  singleChoice?: boolean;
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selectState>) => {
    const {
      target: { value },
    } = event;

    // Jeśli to single choice i kliknięto już wybraną opcję, wyczyść wybór
    if (singleChoice && selectState.includes(value as string)) {
      selectHandler([], id);
      return;
    }

    const filterValue = typeof value === "string" ? value.split(",") : value;
    selectHandler(
      // On autofill we get a stringified value.
      filterValue,
      id,
    );
  };

  return (
    <Box
      sx={{
        width: 330,
        "& #filterSelect": {
          border: "1px solid #555",
          borderRadius: "31px",
          background: "linear-gradient(145deg, #181819, #1d1d1e)",
          boxShadow: "5px 5px 4px #0b0b0b, 0px 0px 4px #2b2b2d",
          color: "#fff",
        },
        "& .MuiInputBase-formControl": {
          outline: "0px solid red",
          borderRadius: "31px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "31px",
          border: "0px",
        },
        "& .MuiOutlinedInput-notchedOutline:hover": {
          borderRadius: "31px",
          border: "1px solid #fff",
        },
        "& .MuiOutlinedInput-notchedOutline:focus": {
          borderRadius: "31px",
          border: "1px solid #fff",
        },
      }}
    >
      <FormControl fullWidth>
        <Select
          labelId="filterSelectLabel"
          id="filterSelect"
          multiple={!singleChoice}
          displayEmpty
          value={selectState}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span>Nie wybrano</span>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {optionsToSelect.map((option) => (
            <MenuItem
              key={option.name}
              value={option.name}
              id="filterSelectListItem"
            >
              <Checkbox
                checked={selectState.includes(option.name)}
                sx={{
                  color: "#fff",
                  "&.Mui-checked": {
                    color: "#fff",
                  },
                }}
              />
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectElement;
