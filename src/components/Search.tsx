'use client';
import SearchIcon from "@mui/icons-material/Search";
import {Box, InputBase} from "@mui/material";
import React from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear?: () => void;
}

export const Search = ({value, onChange, onSearch, onClear}: SearchProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
      <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
            borderRadius: "30px",
            px: 2,
            py: 0.5,
            width: "100%",
            maxWidth: "1900px",
          }}
      >
        <SearchIcon sx={{color: "gray", mr: 1}}/>
        <InputBase
            placeholder="Search..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              flex: 1,
              fontSize: "0.9rem",
            }}
            inputProps={{"aria-label": "search"}}
        />
      </Box>
  );
};