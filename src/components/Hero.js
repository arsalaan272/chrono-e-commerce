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
import 'remixicon/fonts/remixicon.css';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled(Box)`
  background: ${props => props.theme?.palette?.mode === 'dark'
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'};
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.svg');
    opacity: ${props => props.theme?.palette?.mode === 'dark' ? '0.05' : '0.1'};
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
    fill: ${props => props.theme?.palette?.background?.default || '#FFFFFF'};
    transition: fill 0.3s ease;
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
  
  // const imageVariants = {
  //   hidden: { scale: 0.8, opacity: 0 },
  //   visible: {
  //     scale: 1,
  //     opacity: 1,
  //     transition: { duration: 0.7, ease: "easeOut" }
  //   }
  // };
  
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
                  Your One-Stop E-Commerce Destination
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                  Discover a wide range of products from smart watches and mobiles to laptops and groceries.
                  Shop with confidence at CHRONO E-COMMERCE.
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
                    to="/products"
                    variant="contained"
                    color="primary"
                    startIcon={<i className="ri-shopping-bag-line" />}
                  >
                    Shop Now
                  </CategoryButton>
                  
                  <CategoryButton
                    component={Link}
                    to="/category/smart-watches"
                    variant="contained"
                    color="secondary"
                    startIcon={<i className="ri-window-line" />}
                  >
                    Browse Categories
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
          
          {/* Hero Image - Marquee Product Showcase */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box 
              sx={{ 
                position: 'relative', 
                height: { xs: 300, md: 500 },
                overflow: 'hidden',
                borderRadius: 4,
              }}
            >
              {/* Mist overlay at top with blur effect */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '25%',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0.95) 30%, rgba(26, 26, 46, 0.7) 60%, rgba(26, 26, 46, 0) 100%)'
                    : 'linear-gradient(to bottom, rgba(245, 247, 250, 1) 0%, rgba(245, 247, 250, 0.95) 30%, rgba(245, 247, 250, 0.7) 60%, rgba(245, 247, 250, 0) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  zIndex: 3,
                  pointerEvents: 'none',
                  transition: 'background 0.3s ease',
                }}
              />
              
              {/* Additional top mist layer for more depth */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '15%',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0) 100%)'
                    : 'linear-gradient(to bottom, rgba(245, 247, 250, 1) 0%, rgba(245, 247, 250, 0) 100%)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  zIndex: 4,
                  pointerEvents: 'none',
                  transition: 'background 0.3s ease',
                }}
              />
              
              {/* Mist overlay at bottom with blur effect */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '25%',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to top, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0.95) 30%, rgba(26, 26, 46, 0.7) 60%, rgba(26, 26, 46, 0) 100%)'
                    : 'linear-gradient(to top, rgba(245, 247, 250, 1) 0%, rgba(245, 247, 250, 0.95) 30%, rgba(245, 247, 250, 0.7) 60%, rgba(245, 247, 250, 0) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  zIndex: 3,
                  pointerEvents: 'none',
                  transition: 'background 0.3s ease',
                }}
              />
              
              {/* Additional bottom mist layer for more depth */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '15%',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to top, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0) 100%)'
                    : 'linear-gradient(to top, rgba(245, 247, 250, 1) 0%, rgba(245, 247, 250, 0) 100%)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  zIndex: 4,
                  pointerEvents: 'none',
                  transition: 'background 0.3s ease',
                }}
              />
              
              {/* Marquee Container */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '200%', // Double height for seamless loop
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(6, 1fr)', // 6 rows for seamless loop
                  gap: 2,
                  p: 2,
                }}
                component={motion.div}
                animate={{
                  y: ['0%', '-50%'], // Move from 0 to -50% to loop seamlessly
                }}
                transition={{
                  duration: 20, // Slow scroll
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* First set of images */}
                {/* Top Left - Smart Watch */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Top Right - Smartphone */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Middle Left - Laptop */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Middle Right - Grocery */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Bottom Left - Grocery */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Bottom Right - Sunglasses */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Duplicate set for seamless loop */}
                {/* Top Left - Smart Watch */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Top Right - Smartphone */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Bottom Left - Laptop */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Bottom Right - Grocery */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Bottom Left - Grocery */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
                
                {/* Bottom Right - Sunglasses */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'url(https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '3px solid white',
                  }}
                />
              </Box>
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