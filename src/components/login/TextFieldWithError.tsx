import React from 'react';
import {TextField} from '@mui/material';

interface TextFieldWithErrorProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
  focused: boolean;
}

export const TextFieldWithError: React.FC<TextFieldWithErrorProps> =
    ({
       id,
       label,
       value,
       onChange,
       error,
       helperText,
       focused
     }) => (
        <TextField
            margin="normal"
            required
            fullWidth
            id={id}
            label={label}
            value={value}
            onChange={onChange}
            focused={focused}
            error={error}
            helperText={helperText}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: '44px',
                fontSize: '0.875rem'
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.875rem',
                transform: 'translate(14px, 12px) scale(1)'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -9px) scale(0.75)'
              }
            }}
        />
    );