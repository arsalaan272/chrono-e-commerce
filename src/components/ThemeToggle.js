import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import 'remixicon/fonts/remixicon.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isDark = mode === 'dark';

  const iconVariants = {
    hidden: { 
      rotate: -180, 
      opacity: 0,
      scale: 0.5
    },
    visible: { 
      rotate: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.5
      }
    },
    exit: { 
      rotate: 180, 
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          position: 'relative',
          width: 48,
          height: 48,
          borderRadius: '50%',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(46, 59, 85, 0.1)' 
              : 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="dark"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ 
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i 
                className="ri-sun-line"
                style={{ 
                  fontSize: 28,
                  color: theme.palette.text.primary,
                }} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="light"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ 
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i 
                className="ri-moon-line"
                style={{ 
                  fontSize: 28,
                  color: theme.palette.text.primary,
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
