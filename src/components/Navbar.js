import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Box, 
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon, 
  Menu as MenuIcon,
  Watch as WatchIcon,
  Computer as ComputerIcon,
  Home as HomeIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

// Styled components
const StyledAppBar = styled(AppBar)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(Button)`
  margin: 0 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${props => props.theme.palette?.primary.main || '#2E3B55'};
    transition: width 0.3s ease, left 0.3s ease;
  }
  
  &:hover::after,
  &.active::after {
    width: 80%;
    left: 10%;
  }
`;

const LogoText = styled(Typography)`
  background: linear-gradient(45deg, #2E3B55, #F50057);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Watches', path: '/category/watches', icon: <WatchIcon /> },
    { text: 'Computers', path: '/category/computers', icon: <ComputerIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <StyledAppBar 
        position="sticky" 
        color="default"
        elevation={scrolled ? 4 : 0}
        sx={{
          py: scrolled ? 0.5 : 1.5,
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <LogoText variant="h5" component="div" sx={{ flexGrow: 0, mr: 2 }}>
                  CHRONO TECH
                </LogoText>
              </Link>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex' }}>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    component={Link}
                    to={link.path}
                    color="inherit"
                    className={isActive(link.path) ? 'active' : ''}
                    startIcon={link.icon}
                  >
                    {link.text}
                  </NavLink>
                ))}
              </Box>
            )}

            {/* Cart Icon */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton 
                component={Link} 
                to="/cart" 
                color="primary" 
                aria-label="cart"
                sx={{ ml: 2 }}
              >
                <Badge badgeContent={cart.totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </motion.div>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={toggleMobileMenu}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMobileMenu}
          onKeyDown={toggleMobileMenu}
        >
          <List>
            <ListItem>
              <LogoText variant="h6">CHRONO TECH</LogoText>
            </ListItem>
            <Divider sx={{ mb: 2 }} />
            {navLinks.map((link) => (
              <ListItem 
                button 
                key={link.path} 
                component={Link} 
                to={link.path}
                selected={isActive(link.path)}
              >
                <Box sx={{ mr: 2 }}>{link.icon}</Box>
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </motion.div>
  );
};

export default Navbar; 