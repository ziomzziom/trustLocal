import React from "react";
import { Typography, Slider, TextField } from "@mui/material";

const PriceRangeFilter = ({ isDarkMode, value, onChange }) => {
  const formatLabel = (value) => `${value} PLN`;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Min"
          type="number"
          value={value[0]}
          onChange={(e) => onChange([+e.target.value, value[1]])}
          variant="outlined"
          InputProps={{
            endAdornment: <Typography variant="body1">PLN</Typography>,
          }}
        />
        <TextField
          label="Max"
          type="number"
          value={value[1]}
          onChange={(e) => onChange([value[0], +e.target.value])}
          variant="outlined"
          InputProps={{
            endAdornment: <Typography variant="body1">PLN</Typography>,
          }}
        />
      </div>
      <Slider
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
        valueLabelFormat={formatLabel}
        min={0}
        max={1000}
        step={10}
        sx={{ width: "98%" }}
      />
    </div>
  );
};

export default PriceRangeFilter;
