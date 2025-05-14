'use client';

import {Box, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {CustomButton, Search} from "@/components";
import {useState} from "react";

interface GeneralSearchProps {
  onSearch: (term: string) => void;
  onClear: () => void;
  searchTerm: string;
}

export const GeneralSearch = ({onSearch, onClear, searchTerm}: GeneralSearchProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleLocalSearch = (term: string) => {
    setLocalSearchTerm(term);
  };

  const handleSearchSubmit = () => {
    onSearch(localSearchTerm);
  };

  const handleClearLocal = () => {
    setLocalSearchTerm("");
    onClear();
  };

  return (
      <Box sx={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
        height: '44px',
        marginTop: '40px',
      }}>
        <Search
            value={localSearchTerm}
            onChange={handleLocalSearch}
            onSearch={handleSearchSubmit}
        />
        <CustomButton
            variant='secondary'
            onClick={handleClearLocal}
        >
          <CloseIcon sx={{color: "#000048", paddingLeft: '8px'}}/>
          <Typography padding="8px">Clear</Typography>
        </CustomButton>
        <CustomButton
            variant='primary'
            onClick={handleSearchSubmit}
        >
          <SearchIcon sx={{color: "white", paddingLeft: '8px'}}/>
          <Typography padding="8px">Search</Typography>
        </CustomButton>
      </Box>
  );
};