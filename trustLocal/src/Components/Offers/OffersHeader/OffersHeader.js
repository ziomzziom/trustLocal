import React, { useState } from "react";
import { useDarkMode } from "../DarkModeContext";
import "./OffersHeader.scss";
import { Button, IconButton, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import FilterOptions from "./FilterOptions/FilterOptions";
import { provinces } from "./provinces";

const OffersHeader = ({ onSearch, fetchData, setNoResults, isDetailsPage = false  }) => {
  const [provinceId, setProvinceId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchButtonHint, setSearchButtonHint] = useState('');

  const isSmallScreen = window.innerWidth <= 1500;
  const { isDarkMode } = useDarkMode();

  const searchQueryRef = React.createRef(); 
  const provinceIdRef = React.createRef();

  const handleOpenFilterOptions = () => {
    setIsFilterOptionsOpen(true); 
  };

  const handleCloseFilterOptions = () => {
    setIsFilterOptionsOpen(false); 
  };

  const handleSearch = () => {
    if (!searchQuery && !provinceId) {
      setSearchButtonHint("Please enter a search query or select a province to search.");
    } else {
      onSearch(searchQuery, provinces.find((province) => province.id === provinceId)?.name);
      setSearchButtonHint(""); 
    }
    setHasSearched(true); 
  };
  
  const handleCancelSearch = () => {
    setSearchQuery("");
    setProvinceId("");
    setNoResults(false);
    fetchData({}); 
    setHasSearched(false); 
  };

  return (
    <div className={`offers-header ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="search-filter">
          <div className={`search-container ${isDarkMode ? "dark-mode" : ""}`}>
          <TextField
            type="text"
            placeholder="Search"
            size="small"
            className={`search-input ${isDarkMode ? "dark-mode" : ""}`}
            InputProps={{
              className: "search-input-label",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            ref={searchQueryRef}
            disabled={isDetailsPage}
          />

          <Autocomplete
            id="province-input"
            className={`autocomplete-province ${isDarkMode ? "dark-mode" : ""}`}
            options={provinces}
            getOptionLabel={(option) => option.name}
            value={provinces.find((province) => province.id === provinceId) || null}
            onChange={(e, newValue) => setProvinceId(newValue?.id || "")}
            disabled={isDetailsPage}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Voivodeship"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: isDarkMode ? "autocomplete-province-label-dark" : "autocomplete-province-label-light",
                  },
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                ref={provinceIdRef}
              />
            )}
          />
            <Button
                onClick={hasSearched ? handleCancelSearch : handleSearch}
                variant="outlined"
                className={`search-button ${isDarkMode ? "dark-mode" : ""}`}
                title={searchButtonHint}
                disabled={(!searchQuery && !provinceId) || isDetailsPage}
              >
                {hasSearched ? (
                  <CloseIcon />
                ) : (
                  <SearchIcon />
                )}
              </Button>
          </div>
        <IconButton
          onClick={handleOpenFilterOptions}
          className={`tune-button ${isDarkMode ? "dark-mode" : ""} ${isSmallScreen ? "small-screen" : ""}`}
          variant="outlined"
          disabled={isDetailsPage}
        >
          <TuneIcon className="tune-button-icon" />
          {!isSmallScreen && <span className="tune-button-label">More Filters</span>}
        </IconButton>
      </div>
      <FilterOptions 
        onClose={handleCloseFilterOptions} 
        isDarkMode={isDarkMode} 
        open={isFilterOptionsOpen} 
        disabled={isDetailsPage}
      />
    </div>
  );
};

export default OffersHeader;