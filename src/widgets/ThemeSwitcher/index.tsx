'use client';

import { observer } from 'mobx-react-lite';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useStore } from '@/shared/lib/mobxStore';

export const ThemeSwitcher = observer(() => {
  const { themeStore } = useStore();
  const theme = useTheme();
  
  const isDark = theme.palette.mode === 'dark';
  
  const handleToggle = () => {
    themeStore.toggleTheme();
  };
  
  return (
    <Tooltip title={isDark ? 'Светлая тема' : 'Тёмная тема'}>
      <IconButton onClick={handleToggle} color="inherit">
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
});