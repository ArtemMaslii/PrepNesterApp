'use client';

import {Box, Typography} from "@mui/material";

interface InterviewHeaderProps {
  candidateFullName: string | null;
  candidatePosition: string | null;
}

export const InterviewDetailsHeader = (
    {
      candidateFullName,
      candidatePosition,
    }: InterviewHeaderProps) => {

  return (
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box>
          <Typography sx={{fontSize: '30px'}}>{candidateFullName}</Typography>
          <Typography sx={{fontSize: '18px'}}>
            {candidatePosition}
          </Typography>
        </Box>
      </Box>
  );
};