'use client';

import {Box, Typography} from "@mui/material";
import {CustomButton} from "@/components";
import AddIcon from "@mui/icons-material/Add";

interface InterviewHeaderProps {
  onAddInterviewClick: () => void;
}

export const InterviewHeader = (
    {
      onAddInterviewClick
    }: InterviewHeaderProps) => (
    <Box display="flex" justifyContent="space-between" alignContent="center">
      <Box>
        <Typography sx={{fontSize: '30px'}}>Interviews</Typography>
        <Typography sx={{fontSize: '18px'}}>
          Discover, create and improve existing interview questions and build interview templates.
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <CustomButton variant="primary" onClick={onAddInterviewClick}>
          <AddIcon sx={{color: "white"}}/>
          <Typography padding="8px">Add Interview Sheet</Typography>
        </CustomButton>
      </Box>
    </Box>
);