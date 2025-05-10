'use client';

import React, {useState} from 'react';
import {Box, Collapse, Divider, IconButton, Menu, MenuItem, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {CheatSheetCategory} from '@/interface/requestCreateCheatSheet/CheatSheetCategory';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {CheatSheetQuestionCard} from './CheatSheetQuestionCard';

interface CategoryListProps {
  categories: CheatSheetCategory[];
  selectedCategoryId: string | null;
  onCategorySelect: (id: string | null) => void;
  onCategoryAdd: (name: string) => void;
  onCategoryRemove: (id: string) => void;
  existingCategories: { id: string; title: string }[];
  onQuestionRemove: (categoryId: string, questionId: string) => void;
}

export const CheatSheetCategoryList: React.FC<CategoryListProps> =
    ({
       categories,
       selectedCategoryId,
       onCategorySelect,
       onCategoryAdd,
       onCategoryRemove,
       existingCategories,
       onQuestionRemove
     }) => {
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
      const open = Boolean(anchorEl);

      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleAddCategory = (name: string) => {
        onCategoryAdd(name);
        handleClose();
      };

      const toggleCategoryExpand = (categoryId: string) => {
        setExpandedCategories(prev => {
          const newSet = new Set(prev);
          if (newSet.has(categoryId)) {
            newSet.delete(categoryId);
          } else {
            newSet.add(categoryId);
          }
          return newSet;
        });
      };

      const availableCategories = existingCategories.filter(ec =>
          !categories.some(c => c.name === ec.title)
      );

      return (
          <Box display="flex" flexDirection="column" gap={1} mb={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Categories</Typography>
              <IconButton
                  size="small"
                  onClick={handleClick}
                  aria-controls={open ? 'category-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  disabled={availableCategories.length === 0}
              >
                <AddIcon fontSize="small"/>
              </IconButton>
            </Box>

            <Divider/>

            {categories.map((category) => (
                <Box
                    key={category.id}
                    sx={{
                      border: '1px solid',
                      borderColor: selectedCategoryId === category.id ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      overflow: 'hidden',
                      mb: 1
                    }}
                >
                  <Box
                      onClick={() => onCategorySelect(category.id)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        backgroundColor: selectedCategoryId === category.id ? 'action.selected' : 'background.paper',
                        '&:hover': {
                          backgroundColor: 'action.hover'
                        },
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                  >
                    <Typography fontWeight="medium">{category.name}</Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategoryExpand(category.id);
                          }}
                      >
                        {expandedCategories.has(category.id) ? (
                            <ExpandLessIcon fontSize="small"/>
                        ) : (
                            <ExpandMoreIcon fontSize="small"/>
                        )}
                      </IconButton>
                      <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCategoryRemove(category.id);
                          }}
                      >
                        <CloseIcon fontSize="small"/>
                      </IconButton>
                    </Box>
                  </Box>

                  <Collapse in={expandedCategories.has(category.id)}>
                    <Box sx={{p: 2, bgcolor: 'background.default'}}>
                      {category.questions.length > 0 ? (
                          category.questions.map((question) => (
                              <CheatSheetQuestionCard
                                  key={question.id}
                                  question={question}
                                  onRemove={() => onQuestionRemove(category.id, question.id)}
                                  onClick={() => {
                                  }}
                              />
                          ))
                      ) : (
                          <Typography variant="body2" color="text.secondary">
                            No questions in this category
                          </Typography>
                      )}
                    </Box>
                  </Collapse>
                </Box>
            ))}

            <Menu
                id="category-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
              {availableCategories.map((category) => (
                  <MenuItem
                      key={category.id}
                      onClick={() => handleAddCategory(category.title)}
                  >
                    {category.title}
                  </MenuItem>
              ))}
              {availableCategories.length === 0 && (
                  <MenuItem disabled>All categories added</MenuItem>
              )}
            </Menu>
          </Box>
      );
    };