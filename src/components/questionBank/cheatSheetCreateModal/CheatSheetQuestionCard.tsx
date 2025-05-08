import React from 'react';
import {Box, Chip, IconButton, Typography} from '@mui/material';
import {Question} from '@/interface/Question';
import CloseIcon from '@mui/icons-material/Close';

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
  onRemove: () => void;
}

export const CheatSheetQuestionCard: React.FC<QuestionCardProps> =
    ({
       question,
       onClick,
       onRemove,
     }) => {

      return (
          <Box
              p={2}
              mb={1}
              border="1px solid #eee"
              borderRadius={1}
              onClick={onClick}
          >
            <Typography>{question.title}</Typography>
            {question.category && (
                <Chip
                    label={question.category.title}
                    size="small"
                    sx={{mt: 1}}
                    color="secondary"
                />
            )}
            {onRemove && (
                <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                    }}
                    sx={{float: 'right'}}
                >
                  <CloseIcon fontSize="small"/>
                </IconButton>
            )}
          </Box>
      );
    };