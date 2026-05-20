'use client';

import { observer } from 'mobx-react-lite';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useStore } from '@/shared/store';

export const ThemeSwitcher = observer(() => {
  const { settingsStore } = useStore();
  const isDark = settingsStore.isDarkTheme;
  
  const handleToggle = () => {
    settingsStore.toggleTheme();
  };
  
  return (
    <Tooltip title={isDark ? 'Светлая тема' : 'Тёмная тема'}>
      <IconButton onClick={handleToggle} color="inherit">
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
});