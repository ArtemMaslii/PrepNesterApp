import {Typography} from "@mui/material";
import React, {FC, ReactNode} from "react";
import {TypographyProps} from "@mui/system";

type CustomTextFieldProps = {
  variant: 'primary' | 'secondary';
  children?: ReactNode;
} & Omit<TypographyProps, 'variant'>;

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