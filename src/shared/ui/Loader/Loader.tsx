'use client';

import { CircularProgress, Box, BoxProps, Typography } from '@mui/material';

interface LoaderProps extends BoxProps {
  fullScreen?: boolean;
  text?: string;
}

export const Loader = ({ fullScreen = false, text = 'Загрузка...', sx, ...props }: LoaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        ...(fullScreen && { height: '100vh' }),
        ...sx,
      }}
      {...props}
    >
      <CircularProgress />
      {text && <Typography color="text.secondary">{text}</Typography>}
    </Box>
  );
};