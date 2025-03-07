import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { 
  Watch as WatchIcon,
  Computer as ComputerIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled(Box)`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.svg');
    opacity: 0.1;
    z-index: 0;
  }
`;

const ShapeBottom = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;
  }
  
  .shape-fill {
    fill: #FFFFFF;
  }
`;

const CategoryButton = styled(Button)`
  border-radius: 30px;
  padding: 12px 24px;
  font-weight: 600;
  text-transform: none;
  font-size: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  return (
    <HeroContainer sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={4} 
          alignItems="center" 
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Text Content */}
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Box sx={{ maxWidth: 500, mx: isMobile ? 'auto' : 0, textAlign: isMobile ? 'center' : 'left' }}>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="overline" 
                  component="div" 
                  color="primary" 
                  fontWeight="bold"
                  sx={{ mb: 1, letterSpacing: 2 }}
                >
                  PREMIUM SELECTION
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  fontWeight="bold" 
                  sx={{ 
                    mb: 2,
                    background: 'linear-gradient(45deg, #2E3B55, #F50057)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0px 2px 5px rgba(0,0,0,0.1)'
                  }}
                >
                  Luxury Watches & High-Performance PCs
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  Discover our exclusive collection of premium timepieces and cutting-edge computers.
                  Elevate your style and performance with CHRONO TECH.
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  mb: 4
                }}>
                  <CategoryButton
                    component={Link}
                    to="/category/watches"
                    variant="contained"
                    color="primary"
                    startIcon={<WatchIcon />}
                  >
                    Explore Watches
                  </CategoryButton>
                  
                  <CategoryButton
                    component={Link}
                    to="/category/computers"
                    variant="contained"
                    color="secondary"
                    startIcon={<ComputerIcon />}
                  >
                    Browse Computers
                  </CategoryButton>
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  gap: 3
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      500+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Products
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      10k+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Happy Customers
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      4.9
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Star Rating
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Grid>
          
          {/* Hero Image */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box sx={{ position: 'relative', height: { xs: 300, md: 500 } }}>
              <motion.div
                variants={imageVariants}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Replace placeholder with actual image */}
                <Box
                  sx={{
                    width: '80%',
                    height: '80%',
                    background: 'url(https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }}
                />
              </motion.div>
              
              {/* Floating elements for decoration */}
              <motion.div
                initial={{ x: -20, y: -10 }}
                animate={{ x: 0, y: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '10%',
                  zIndex: 2
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: theme.palette.primary.main,
                    opacity: 0.2
                  }}
                />
              </motion.div>
              
              <motion.div
                initial={{ x: 20, y: 10 }}
                animate={{ x: 0, y: 0 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  bottom: '20%',
                  right: '10%',
                  zIndex: 2
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: theme.palette.secondary.main,
                    opacity: 0.2
                  }}
                />
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Wave shapes */}
      <ShapeBottom>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </ShapeBottom>
    </HeroContainer>
  );
};

export default Hero;