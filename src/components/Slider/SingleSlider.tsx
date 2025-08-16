"use client";

import * as React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const SliderElement = ({
  minRange,
  maxRange,
  sliderHandler,
  settedValue,
  id,
  label,
}: {
  minRange: number;
  maxRange: number;
  sliderHandler: (filterValue: number | number[], id: string) => void;
  settedValue: number;
  id: string;
  label: string;
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    sliderHandler(newValue, id);
  };

  return (
    <Box
      sx={{
        width: { xs: 200, md: 310 },
        "& .MuiSlider-thumb": {
          width: "25px",
          height: "25px",
        },
        "& .MuiSlider-thumb:last-of-type": {
          width: "25px",
          height: "25px",
        },
        "& .MuiSlider-rail": {
          height: "1px",
          background: "linear-gradient(145deg, #888, #888)",
          boxShadow: "5px 5px 4px #0b0b0b, 0px 0px 4px #2b2b2d",
        },
        "& .MuiSlider-track": {
          height: "3px",
          border: "none",
          background: "linear-gradient(145deg, #666, #666)",
          boxShadow: "5px 5px 4px #0b0b0b, 0px 0px 4px #2b2b2d",
        },
        "& .MuiSlider-valueLabel": {
          bgcolor: "transparent",
          fontFamily: '"Michroma", serif',
          fontSize: "18px",
          top: "63px",
        },
      }}
    >
      <Slider
        getAriaLabel={() => label}
        value={settedValue}
        onChange={handleChange}
        valueLabelDisplay="on"
        disableSwap
        min={minRange}
        max={maxRange}
      />
    </Box>
  );
};

export default SliderElement;
