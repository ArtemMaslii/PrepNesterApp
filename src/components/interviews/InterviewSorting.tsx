'use client';

import {Box, FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import {Status} from "@/interface/Status";

export const InterviewSorting = (
    {
      onFilterChange,
      currentFilters
    }: {
      onFilterChange: (filters: { status?: Status }) => void;
      currentFilters: { status?: Status };
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

  const handleChange = (event: SelectChangeEvent<Status | string>) => {
    const value = event.target.value;
    const newStatus = value === "undefined" ? undefined : value as Status;
    onFilterChange({status: newStatus});
  };

  return (
      <Box display='flex' alignItems='center' justifyContent='space-between' marginTop='24px'
           marginBottom='30px'>
        <Box display='flex' alignItems='center' justifyContent='space-between' gap='12px'>
          <FormControl>
            <Select
                labelId="sort-by-content-type"
                id="sort-by-content-type-select"
                value={currentFilters.status ?? "undefined" as any}
                onChange={handleChange}
                sx={{
                  borderRadius: '28px',
                  color: '#000048',
                  width: '140px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...selectedStyleColor,
                }}
            >
              <MenuItem value={"undefined"} sx={{color: '#000048'}}>All statuses</MenuItem>
              <MenuItem value={Status.IN_PROGRESS} sx={{color: '#000048'}}>In Progress</MenuItem>
              <MenuItem value={Status.CANCELLED} sx={{color: '#000048'}}>Cancelled</MenuItem>
              <MenuItem value={Status.COMPLETE} sx={{color: '#000048'}}>Complete</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
  );
};