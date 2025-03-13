import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  Typography
} from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import AddAlertIcon from '@mui/icons-material/AddAlert';
import PriceRangeFilter from "./PriceRangeFilter";
import Slider from '@mui/material/Slider';
import "./FilterOptions.scss";

const FilterOptions = ({ onClose, isDarkMode, open }) => {
  const [isInvoiceRequired, setIsInvoiceRequired] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const isSmallScreen = window.innerWidth <= 800;

  const handleApplyFilter = () => {
    onClose();
  };
  
  const handleResetFilter = () => {
    setIsInvoiceRequired(false);
    setPriceRange([0, 1000]);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isSmallScreen}
      className={`filter-options ${isSmallScreen ? 'full-screen' : ''}`}
      PaperProps={{
        style: {
          borderRadius: 20,
          backgroundColor: "black",
        },
      }}
    >
        <div className={`filter-header ${isDarkMode ? "dark-mode" : ""}`}>
          <h2>Filters</h2>
          <IconButton onClick={onClose} className={`filter-close-button ${isDarkMode ? "dark-mode" : ""}`}>
            <CloseIcon />
          </IconButton>
        </div>
      <DialogContent className={`filter-content ${isDarkMode ? "dark-mode" : ""}`}>
        <div className={`pricerange-filter ${isDarkMode ? "dark-mode" : ""}`} >
          <PriceRangeFilter isDarkMode={isDarkMode} value={priceRange} onChange={setPriceRange} />
        </div>
        <div className={`date-filter ${isDarkMode ? "dark-mode" : ""}`} >
          <div className="date-filter-span">how many days ago was offer added</div>
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={10}
            marks
            min={10}
            max={110}
          />
        </div>
        <div className={`invoice-switch ${isDarkMode ? "dark-mode" : ""}`}>
          <FormControlLabel
            className="invoice-switch-label"
            control={
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                checked={isInvoiceRequired}
                onChange={() => setIsInvoiceRequired(!isInvoiceRequired)}
              />
            }
            label={
              <Typography variant="body1" style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                Invoice
              </Typography>
            }
          />
          <RequestQuoteOutlinedIcon />
        </div>
        <div className={`invoice-switch ${isDarkMode ? "dark-mode" : ""}`}>
          <FormControlLabel
            className="invoice-switch-label"
            control={
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                checked={isInvoiceRequired}
                onChange={() => setIsInvoiceRequired(!isInvoiceRequired)}
              />
            }
            label={
              <Typography variant="body1" style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                Verified
              </Typography>
            }
          />
          <VerifiedTwoToneIcon />
        </div>
        <div className={`invoice-switch ${isDarkMode ? "dark-mode" : ""}`}>
          <FormControlLabel
            className="invoice-switch-label"
            control={
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                checked={isInvoiceRequired}
                onChange={() => setIsInvoiceRequired(!isInvoiceRequired)}
              />
            }
            label={
              <Typography variant="body1" style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                New
              </Typography>
            }
          />
          <AddAlertIcon />
        </div>
      </DialogContent>
      <DialogActions className={`filter-footer ${isDarkMode ? "dark-mode" : ""}`}>
        <Button variant="contained" color="success" className="filter-button" startIcon={<DoneIcon />} onClick={handleApplyFilter}>
          Apply
        </Button>
        <Button variant="contained" color="warning" className="filter-button" startIcon={<DeleteIcon />} onClick={handleResetFilter}>
          Reset
        </Button>
        <Button variant="contained" color="error" onClick={onClose} startIcon={<CloseIcon />} className="filter-button">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterOptions;
