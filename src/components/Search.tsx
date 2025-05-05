import SearchIcon from "@mui/icons-material/Search";
import {Box, InputBase} from "@mui/material";
import React from "react";

export const Search = () => {
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
            maxWidth: "1300px",
          }}
      >
        <SearchIcon sx={{color: "gray", mr: 1}}/>
        <InputBase
            placeholder="Search..."
            sx={{
              flex: 1,
              fontSize: "0.9rem",
            }}
            inputProps={{"aria-label": "search"}}
        />
      </Box>
  );
};
