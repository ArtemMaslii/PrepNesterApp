'use client';

import React, {useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import {useCategories, useCheatSheets, useQuestions} from '@/context';
import {CheatSheetQuestionBankPanel} from './CheatSheetQuestionBankPanel';
import {CheatSheetCategory} from '@/interface/requestCreateCheatSheet/CheatSheetCategory';
import {Question} from '@/interface/Question';
import {
  CheatSheetCategoryList
} from "@/components/questionBank/cheatSheetCreateModal/CheatSheetCategoryList";
import {RequestCheatSheetCategory} from "@/interface/requestCreateCheatSheet";
import {CustomButton} from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {PrivacyTextField} from "@/components/questionBank";

interface CheatSheetCreateModalProps {
  open: boolean;
  onClose: () => void;
}

export const CheatSheetCreateModal: React.FC<CheatSheetCreateModalProps> = ({open, onClose}) => {
  const {questions} = useQuestions();
  const {categories: existingCategories} = useCategories();
  const {createNewCheatSheet} = useCheatSheets();
  const [searchTerm, setSearchTerm] = useState('');
  const [cheatSheetTitle, setCheatSheetTitle] = useState('');
  const [categories, setCategories] = useState<CheatSheetCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [addedQuestionIds, setAddedQuestionIds] = useState<Set<string>>(new Set());
  const [isCreating, setIsCreating] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const handeClose = () => {
    onClose()
    setCategories([]);
    setSelectedCategoryId(null);
    setSearchTerm('');
    setCheatSheetTitle('');
    setAddedQuestionIds(new Set());
  }

  const filteredQuestions = questions.filter(question =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !addedQuestionIds.has(question.id)
  );

  useEffect(() => {
    if (open) {
      setAddedQuestionIds(new Set());
    }
  }, [open, existingCategories]);

  const handleAddCategory = (name: string) => {
    const newCategoryId = existingCategories.find(cat => cat.title === name)?.id;
    setCategories(prev => [...prev, {
      id: newCategoryId,
      name,
      questions: []
    } as CheatSheetCategory
    ])
    setSelectedCategoryId(newCategoryId || null);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(prev => prev === categoryId ? null : categoryId);
  };

  const handleAddQuestionToCategory = (question: Question) => {
    if (!selectedCategoryId) return;

    const categoryIndex = categories.findIndex(cat => cat.id === selectedCategoryId);
    if (categoryIndex !== -1) {
      const newCategories = [...categories];
      if (!newCategories[categoryIndex].questions.some(q => q.id === question.id)) {
        newCategories[categoryIndex].questions.push(question);
        setCategories(newCategories);
        setAddedQuestionIds(prev => new Set(prev).add(question.id));
      }
    }
  };

  const handleRemoveQuestion = (categoryId: string, questionId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          questions: cat.questions.filter(q => q.id !== questionId),
        };
      }
      return cat;
    }));
    setAddedQuestionIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
  };

  const handleRemoveCategory = (categoryId: string) => {
    const newCategories = categories.filter(cat => cat.id !== categoryId);
    setCategories(newCategories);
    setAddedQuestionIds(new Set());
    setSelectedCategoryId(null);
  };

  const handleCreateCheatSheet = async () => {
    if (!cheatSheetTitle.trim()) {
      alert('Please enter a title for your cheat sheet');
      return;
    }

    setIsCreating(true);
    try {
      await createNewCheatSheet({
        title: cheatSheetTitle,
        isPublic: true,
        categories: categories.map(category => ({
          id: category.id,
          questions: category.questions.map(q => ({
            id: q.id,
          })),
        })) as RequestCheatSheetCategory[]
      });
      handeClose();
    } catch (error) {
      alert('Failed to create cheat sheet. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
      <Dialog open={open} onClose={handeClose} fullWidth maxWidth="lg">
        <DialogTitle>Create Interview Sheet</DialogTitle>
        <DialogContent dividers>
          <DndProvider backend={HTML5Backend}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                  label={<Box display='flex' gap='5px'>Cheat Sheet Title
                    <span
                        style={{color: '#FA3131'}}>*
                    </span>
                  </Box>}
                  value={cheatSheetTitle}
                  onChange={(e) => setCheatSheetTitle(e.target.value)}
                  margin="normal"
                  placeholder="Title of a Cheat Sheet"
              />
              <PrivacyTextField isPublic={isPublic} setIsPublic={setIsPublic}/>

              <Box display="flex" gap={2} height="600px" border="1px solid #ddd"
                   borderRadius="5px">
                <CheatSheetQuestionBankPanel
                    questions={filteredQuestions}
                    searchTerm={searchTerm}
                    selectedCategoryId={selectedCategoryId}
                    onSearchChange={setSearchTerm}
                    onQuestionClick={handleAddQuestionToCategory}
                />

                <Box flex={1} display="flex" flexDirection="column" borderRadius={1} p={2}>
                  <CheatSheetCategoryList
                      categories={categories}
                      selectedCategoryId={selectedCategoryId}
                      onCategorySelect={handleCategorySelect}
                      onCategoryAdd={handleAddCategory}
                      onCategoryRemove={handleRemoveCategory}
                      existingCategories={existingCategories}
                      onQuestionRemove={handleRemoveQuestion}
                  />
                </Box>
              </Box>
            </Box>
          </DndProvider>
        </DialogContent>
        <DialogActions sx={{display: 'flex', gap: '5px'}}>
          <CustomButton variant="secondary" onClick={handeClose}>
            <CloseIcon
                sx={{
                  color: "#000048",
                  width: '20px'
                }}/>
            <Typography padding="3px">Cancel</Typography>
          </CustomButton>
          <CustomButton variant="primary" onClick={handleCreateCheatSheet}
                        disabled={isCreating}>
            <AddIcon sx={{
              color: "#white",
              width: '20px'
            }}/>
            <Typography padding="3px">Create</Typography>
          </CustomButton>
        </DialogActions>
      </Dialog>
  );
};