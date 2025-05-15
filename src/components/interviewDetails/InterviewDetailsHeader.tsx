'use client';

import {Box, Typography} from "@mui/material";
import {CustomButton} from "@/components";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close"

interface InterviewHeaderProps {
  candidateFullName: string;
  candidatePosition: string;
  onSaveInterviewClick: () => void;
  onCancelInterviewClick: () => void;
}

export const InterviewDetailsHeader = (
    {
      candidateFullName,
      candidatePosition,
      onSaveInterviewClick,
      onCancelInterviewClick,
    }: InterviewHeaderProps) => (
    <Box display="flex" justifyContent="space-between" alignContent="center">
      <Box>
        <Typography sx={{fontSize: '30px'}}>{candidateFullName}</Typography>
        <Typography sx={{fontSize: '18px'}}>
          {candidatePosition}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="8px">
        <CustomButton variant="secondary" onClick={onCancelInterviewClick}>
          <CloseIcon sx={{color: "#000048"}}/>
          <Typography padding="8px">Cancel</Typography>
        </CustomButton>
        <CustomButton variant="primary" onClick={onSaveInterviewClick}>
          <AddIcon sx={{color: "white"}}/>
          <Typography padding="8px">Save</Typography>
        </CustomButton>
      </Box>
    </Box>
);