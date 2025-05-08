'use client';

import React, {useState} from 'react';
import {Box, Chip, IconButton, Menu, MenuItem} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {CheatSheetCategory} from '@/interface/requestCreateCheatSheet/CheatSheetCategory';
import CloseIcon from '@mui/icons-material/Close';

interface CategoryListProps {
  categories: CheatSheetCategory[];
  selectedCategoryId: string | null;
  onCategorySelect: (id: string) => void;
  onCategoryAdd: (name: string) => void;
  onCategoryRemove: (id: string) => void;
  existingCategories: { id: string; title: string }[];
}

export const CheatSheetCategoryList: React.FC<CategoryListProps> = ({
                                                                      categories,
                                                                      selectedCategoryId,
                                                                      onCategorySelect,
                                                                      onCategoryAdd,
                                                                      onCategoryRemove,
                                                                      existingCategories
                                                                    }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl as boolean);

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

  const handleDelete = (e: React.MouseEvent, categoryId: string) => {
    e.stopPropagation();
    onCategoryRemove(categoryId);
  };

  // Filter out existing categories that are already selected
  const availableCategories = existingCategories.filter(ec =>
      !categories.some(c => c.name === ec.title)
  );

  return (
      <Box display="flex" gap={1} flexWrap="wrap" mb={2} alignItems="center">
        <span>Categories:</span>
        {categories.map((category) => (
            <Chip
                key={category.id}
                label={category.name}
                onClick={() => onCategorySelect(category.id)}
                color={selectedCategoryId === category.id ? 'primary' : 'default'}
                onDelete={(e) => handleDelete(e, category.id)}
                deleteIcon={<CloseIcon fontSize="small"/> as any}
            />
        ))}

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