import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';
import Icon from '../AppIcon';

const ThemeToggle = ({ className = '', size = 'sm', variant = 'ghost' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={`focus-ring-adaptive ${className}`}
      iconName={isDarkMode ? 'Sun' : 'Moon'}
      iconSize={16}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </Button>
  );
};

export default ThemeToggle;
