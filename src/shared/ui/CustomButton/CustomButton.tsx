'use client';

import React from 'react';
import { Button, Tooltip } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  tooltipText?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  tooltipText, 
  ...props 
}) => {
  const button = (
    <Button variant="contained" {...props}>
      {children}
    </Button>
  );

  return tooltipText ? <Tooltip title={tooltipText}>{button}</Tooltip> : button;
};