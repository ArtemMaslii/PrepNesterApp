import {TextFieldProps, Typography} from "@mui/material";
import React, {FC} from "react";

type CustomTextFieldProps = {
  variant: 'primary' | 'secondary';
} & TextFieldProps;

export const CustomTextField: FC<CustomTextFieldProps> =
    ({
       variant,
       children,
       ...props
     }) => {
      return (
          <Typography
              {...props}
              sx={{
                fontSize: variant === 'primary' ? '22px' : '14px',
                color: variant === 'primary' ? '#000048' : '#999999',
              }}>
            {children}
          </Typography>
      )
    }