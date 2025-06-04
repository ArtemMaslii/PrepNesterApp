import {Button, ButtonProps} from "@mui/material";
import React, {FC} from "react";

type AddButtonProps = {
  variant: 'primary' | 'secondary';
} & Omit<ButtonProps, 'variant'>;

export const CustomButton: FC<AddButtonProps> = ({variant, children, ...props}) => {
  return (
      <Button
          {...props}
          sx={{
            borderRadius: '24px',
            height: '40px',
            fontSize: '0.875rem',
            color: variant === 'primary' ? 'white' : '#000048',
            backgroundColor: variant === 'primary' ? '#000048' : '#ffffff',
            textTransform: "none",
            border: variant === 'primary' ? 'none' : '1px solid #DDDDDD',
            '&:hover': {backgroundColor: variant === 'primary' ? '#000060' : 'grey'},
            ...props.sx
          }}
      >
        {children}
      </Button>
  );
}