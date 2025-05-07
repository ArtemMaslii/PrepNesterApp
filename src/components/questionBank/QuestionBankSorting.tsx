'use client';

import {Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {SortBy} from "@/interface/SortBy";
import React from "react";

export const QuestionBankSorting = (
    {
      onFilterChange,
      currentFilters
    }: {
      onFilterChange: (filters: {
        contentType: 'all' | 'questions' | 'cheatSheets';
        isPublic: boolean;
        sortBy: SortBy;
      }) => void;
      currentFilters: {
        contentType: 'all' | 'questions' | 'cheatSheets';
        isPublic: boolean;
        sortBy: SortBy;
      };
    }) => {
  const selectedStyleColor = {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DDDDDD',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DDDDDD',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DDDDDD',
      borderWidth: '1px',
    },
    '& .MuiSelect-icon': {
      color: '#000048',
    },
    '&:hover .MuiSelect-icon': {
      color: '#000048',
    },
    '&.Mui-focused .MuiSelect-icon': {
      color: '#000048',
    },
    '& .MuiPaper-root': {
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '4px',
      '& .MuiMenu-list': {
        padding: 0,
      },
      '& .MuiMenuItem-root': {
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  }

  const handleContentTypeChange = (
      event: SelectChangeEvent<string>
  ) => {
    const newContentType = event.target.value as 'questions' | 'cheatSheets' | 'all';
    onFilterChange({
      ...currentFilters,
      contentType: newContentType,
    });
  };

  const handlePrivacyChange = (
      event: SelectChangeEvent<string>
  ) => {
    const newPrivacy = event.target.value as string;
    onFilterChange({
      ...currentFilters,
      isPublic: newPrivacy === 'public',
    });
  };

  const handleSortChange = (event: SelectChangeEvent<SortBy>) => {
    const newSortBy = event.target.value as SortBy;
    onFilterChange({
      ...currentFilters,
      sortBy: newSortBy,
    });
  };

  return (
      <Box display='flex' alignItems='center' justifyContent='space-between' marginTop='24px'
           marginBottom='30px'>
        <Box display='flex' alignItems='center' justifyContent='space-between' gap='12px'>
          <FormControl>
            <Select
                labelId="sort-by-content-type"
                id="sort-by-content-type-select"
                value={currentFilters.contentType as any}
                onChange={handleContentTypeChange}
                sx={{
                  borderRadius: '28px',
                  color: '#000048',
                  width: '120px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...selectedStyleColor,
                }}
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='questions'>Questions</MenuItem>
              <MenuItem value='cheatSheets'>Cheat Sheets</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
                labelId="sort-by-privacy"
                id="sort-by-privacy-select"
                value={currentFilters.isPublic ? 'public' : 'private' as any}
                onChange={handlePrivacyChange}
                sx={{
                  borderRadius: '28px',
                  color: '#000048',
                  height: '32px',
                  width: '120px', ...selectedStyleColor
                }}
            >
              <MenuItem value='public'>Public</MenuItem>
              <MenuItem value='private'>Private</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display='flex' alignItems='center' justifyContent='space-between' gap='12px'>
          <Typography sx={{fontSize: '16px'}}>Sort By:</Typography>
          <FormControl>
            <Select
                labelId="sort-by-label"
                id="sort-by-select"
                value={currentFilters.sortBy as any}
                onChange={handleSortChange}
                sx={{
                  borderRadius: '28px',
                  color: '#000048',
                  height: '32px',
                  width: '200px', ...selectedStyleColor
                }}
            >
              <MenuItem value={SortBy.RECENTLY_CREATED}>Recently Created</MenuItem>
              <MenuItem value={SortBy.RECENTLY_UPDATED}>Recently Updated</MenuItem>
              <MenuItem value={SortBy.MOST_LIKED}>Most Liked</MenuItem>
              <MenuItem value={SortBy.MOST_COMMENTED}>Most Commented</MenuItem>
              <MenuItem value={SortBy.ASCENDING}>A-Z</MenuItem>
              <MenuItem value={SortBy.DESCENDING}>Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
  );
};