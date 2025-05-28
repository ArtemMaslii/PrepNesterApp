'use client';

import {Box, Typography} from "@mui/material";
import {CustomButton} from "@/components";
import AddIcon from "@mui/icons-material/Add";
import {useUser} from "@/context";
import {Role} from "@/interface/UserDetails";

interface QuestionBankHeaderProps {
  onAddQuestionClick: () => void;
  onAddInterviewSheetClick: () => void;
}

export const QuestionBankHeader = (
    {
      onAddQuestionClick,
      onAddInterviewSheetClick
    }: QuestionBankHeaderProps) => {
  const {user} = useUser()

  return (
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box>
          <Typography sx={{fontSize: '30px'}}>Question Bank</Typography>
          <Typography sx={{fontSize: '18px'}}>
            Discover, create and improve existing interview questions and build interview templates.
          </Typography>
        </Box>
        {user?.role === Role.ADMIN ? (
            <Box display="flex" alignItems="center" gap="8px">
              <CustomButton variant="secondary" onClick={onAddInterviewSheetClick}>
                <AddIcon sx={{color: "#000048"}}/>
                <Typography padding="8px">Add Interview Sheet</Typography>
              </CustomButton>
              <CustomButton variant="primary" onClick={onAddQuestionClick}>
                <AddIcon sx={{color: 'white'}}/>
                <Typography padding="8px">Add Question</Typography>
              </CustomButton>
            </Box>
        ) : null}
      </Box>
  );
}