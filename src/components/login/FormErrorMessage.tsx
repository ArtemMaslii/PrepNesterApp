import React from 'react';
import {Typography} from '@mui/material';

interface FormErrorMessageProps {
  message: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({message}) => (
    <Typography color="error" sx={{mt: 1}}>
      {message}
    </Typography>
);