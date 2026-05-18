'use client';

import { CircularProgress, Box, BoxProps } from '@mui/material';

interface LoaderProps extends BoxProps {
  fullScreen?: boolean;
}

export const Loader = ({ fullScreen = false, sx, ...props }: LoaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(fullScreen && { height: '100vh' }),
        ...sx,
      }}
      {...props}
    >
      <CircularProgress />
    </Box>
  );
};