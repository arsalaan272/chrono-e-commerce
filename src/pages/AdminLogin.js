import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.95) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

const GradientBox = styled(Box)`
  background: linear-gradient(45deg, #2E3B55 30%, #4F5B75 90%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin credentials
  const ADMIN_USERNAME = 'sairab';
  const ADMIN_PASSWORD = 'Sairab@2005';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Store admin session
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <GradientBox>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StyledPaper elevation={24} sx={{ p: 4, borderRadius: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    padding: '8px',
                  }}
                >
                  <img 
                    src="/favicon.svg" 
                    alt="CHRONO E-COMMERCE" 
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'contain'
                    }} 
                  />
                </Box>
              </motion.div>
              
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                CHRONO E-COMMERCE
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom color="text.secondary">
                Admin Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your credentials to access the admin dashboard
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                autoComplete="username"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img 
                        src="/favicon.svg" 
                        alt="Logo" 
                        style={{ 
                          width: '20px', 
                          height: '20px',
                          objectFit: 'contain'
                        }} 
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="current-password"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #2E3B55 30%, #4F5B75 90%)',
                    boxShadow: '0 4px 15px rgba(46, 59, 85, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1E2B45 30%, #2E3B55 90%)',
                      boxShadow: '0 6px 20px rgba(46, 59, 85, 0.5)',
                    },
                  }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </motion.div>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  component="a"
                  href="/"
                  color="inherit"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  ← Back to Store
                </Button>
              </Box>
            </Box>
          </StyledPaper>
        </motion.div>
      </Container>
    </GradientBox>
  );
};

export default AdminLogin;

