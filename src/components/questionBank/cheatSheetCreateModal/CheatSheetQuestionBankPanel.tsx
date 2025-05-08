import React from 'react';
import {Box, TextField, Typography} from '@mui/material';
import {CheatSheetQuestionCard} from './CheatSheetQuestionCard';
import {Question} from '@/interface/Question';

interface QuestionBankPanelProps {
  questions: Question[];
  searchTerm: string;
  selectedCategoryId: string | null;
  onSearchChange: (term: string) => void;
  onQuestionClick: (question: Question) => void;
}

export const CheatSheetQuestionBankPanel: React.FC<QuestionBankPanelProps> =
    ({
       questions,
       searchTerm,
       selectedCategoryId,
       onSearchChange,
       onQuestionClick,
     }) => {
      const filteredQuestions = questions.filter(question => {
        const matchesSearch = searchTerm ? question.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesCategory = selectedCategoryId
            ? question.category?.id === selectedCategoryId
            : true;
        return matchesSearch && matchesCategory;
      });

      return (
          <Box flex={1} display="flex" flexDirection="column" border="1px solid #ddd"
               borderRadius={1} p={2}>
            <TextField
                fullWidth
                label="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                margin="normal"
            />

            <Box flex={1} overflow="auto" mt={2}>
              <Typography variant="h6" gutterBottom>
                {selectedCategoryId
                    ? `Questions in selected category`
                    : 'All questions'}
              </Typography>
              {filteredQuestions.length === 0 ? (
                  <Typography color="textSecondary" textAlign="center" py={4}>
                    No questions available
                  </Typography>
              ) : (
                  filteredQuestions.map((question) => (
                      <CheatSheetQuestionCard
                          key={question.id}
                          question={question}
                          onClick={() => onQuestionClick(question)}
                          isDraggable={false}
                          onRemove={() => {
                          }}
                      />
                  ))
              )}
            </Box>
          </Box>
      );
    };