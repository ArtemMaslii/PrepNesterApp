'use client';

import React, {useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import {useCategories, useQuestions} from '@/context';
import {CheatSheetQuestionBankPanel} from './CheatSheetQuestionBankPanel';
import {CheatSheetCategory} from '@/interface/requestCreateCheatSheet/CheatSheetCategory';
import {Question} from '@/interface/Question';
import {
  CheatSheetCategoryList
} from "@/components/questionBank/cheatSheetCreateModal/CheatSheetCategoryList";

interface CheatSheetCreateModalProps {
  open: boolean;
  onClose: () => void;
}

export const CheatSheetCreateModal: React.FC<CheatSheetCreateModalProps> = ({open, onClose}) => {
  const {questions} = useQuestions();
  const {categories: existingCategories} = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [cheatSheetTitle, setCheatSheetTitle] = useState('');
  const [categories, setCategories] = useState<CheatSheetCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [addedQuestionIds, setAddedQuestionIds] = useState<Set<string>>(new Set());

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

  const handleCategoryNameChange = (categoryId: string, newName: string) => {
    setCategories(categories.map(cat =>
        cat.id === categoryId ? {...cat, name: newName} : cat
    ));
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(prev => prev === categoryId ? null : categoryId);
  };

  const handleQuestionDrop = (question: Question, fromCategoryId: string) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === fromCategoryId) {
        return {
          ...cat,
          questions: cat.questions.filter(q => q.id !== question.id),
        };
      }
      return cat;
    });

    if (selectedCategoryId) {
      const categoryIndex = updatedCategories.findIndex(cat => cat.id === selectedCategoryId);
      if (categoryIndex !== -1) {
        const category = updatedCategories[categoryIndex];
        if (!category.questions.some(q => q.id === question.id)) {
          category.questions.push(question);
        }
      }
    }

    setCategories(updatedCategories);
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

  const handleCreateCheatSheet = () => {
    console.log('Creating cheat sheet:', {
      title: cheatSheetTitle,
      categories,
    });
    handeClose();
  };

  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

  return (
      <Dialog open={open} onClose={handeClose} fullWidth maxWidth="lg">
        <DialogTitle>Create Interview Sheet</DialogTitle>
        <DialogContent dividers>
          <DndProvider backend={HTML5Backend}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                  fullWidth
                  label="Cheat Sheet Title"
                  value={cheatSheetTitle}
                  onChange={(e) => setCheatSheetTitle(e.target.value)}
                  margin="normal"
              />

              <Box display="flex" gap={2} height="600px">
                <CheatSheetQuestionBankPanel
                    questions={filteredQuestions}
                    searchTerm={searchTerm}
                    selectedCategoryId={selectedCategoryId}
                    onSearchChange={setSearchTerm}
                    onQuestionClick={handleAddQuestionToCategory}
                />

                <Box flex={1} display="flex" flexDirection="column" border="1px solid #ddd"
                     borderRadius={1} p={2}>
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
        <DialogActions>
          <Button onClick={handeClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateCheatSheet}>Create</Button>
        </DialogActions>
      </Dialog>
  );
};