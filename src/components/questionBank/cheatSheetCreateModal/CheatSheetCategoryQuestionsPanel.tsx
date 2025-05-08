import React from 'react';
import {Box, Typography} from '@mui/material';
import {CheatSheetQuestionCard} from './CheatSheetQuestionCard';
import {CheatSheetCategory} from "@/interface/requestCreateCheatSheet/CheatSheetCategory";

interface CategoryQuestionsPanelProps {
  category: CheatSheetCategory;
  onQuestionRemove: (questionId: string) => void;
}

export const CheatSheetCategoryQuestionsPanel: React.FC<CategoryQuestionsPanelProps> =
    ({
       category,
       onQuestionRemove,
     }) => {

      return (
          <Box
              flex={1}
              overflow="auto"
              p={1}
              sx={{
                backgroundColor: 'background.paper',
              }}
          >

            {category.questions.length === 0 ? (
                <Typography color="textSecondary" textAlign="center" py={4}>
                  Drop questions here
                </Typography>
            ) : (
                category.questions.map((question) => (
                    <CheatSheetQuestionCard
                        key={question.id}
                        question={question}
                        onRemove={() => onQuestionRemove(question.id)}
                        onClick={() => {
                        }}
                    />
                ))
            )}
          </Box>
      );
    };