'use client';
import {Box, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {CustomButton, Search} from "@/components";
import {useCheatSheets, useQuestions} from "@/context";
import {useState} from "react";

export const QuestionBankSearch = () => {
  const {reloadCheatSheets} = useCheatSheets();
  const {reloadQuestions} = useQuestions();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    reloadCheatSheets(term);
    reloadQuestions(term);
  };

  const handleClear = () => {
    setSearchTerm("");
    reloadCheatSheets();
    reloadQuestions();
  };

  return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
        height: '44px',
        marginTop: '40px',
      }}>
        <Search
            onSearch={handleSearch}
            onClear={handleClear}
        />
        <CustomButton
            variant='secondary'
            onClick={handleClear}
        >
          <CloseIcon sx={{color: "#000048", paddingLeft: '8px'}}/>
          <Typography padding="8px">Clear</Typography>
        </CustomButton>
        <CustomButton
            variant='primary'
            onClick={() => handleSearch(searchTerm)}
        >
          <SearchIcon sx={{color: "white", paddingLeft: '8px'}}/>
          <Typography padding="8px">Search</Typography>
        </CustomButton>
      </Box>
  );
};