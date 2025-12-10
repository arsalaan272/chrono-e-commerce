import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SocialIconButton = styled(IconButton)`
  margin: 0 8px;
  background-color: ${props => props.theme.palette?.primary.main || '#2E3B55'};
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.palette?.secondary.main || '#F50057'};
    transform: translateY(-5px);
  }
`;

const FooterLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${props => props.theme.palette?.secondary.main || '#F50057'};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.palette?.secondary.main || '#F50057'};
    
    &:after {
      width: 100%;
    }
  }
`;

const Footer = () => {
  const theme = useTheme();
  
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <Box 
      component={motion.footer}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      sx={{ 
        bgcolor: 'background.paper',
        pt: 6,
        pb: 3,
        mt: 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 -5px 20px rgba(0,0,0,0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
              CHRONO TECH
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your one-stop shop for premium watches and high-performance computers.
              We offer the best selection of timepieces and computing devices to suit your lifestyle.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <i className="ri-map-pin-line" style={{ marginRight: '8px', color: 'primary' }} />
              <Typography variant="body2" color="text.secondary">
                Telangana, Hyderabad, 500001
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <i className="ri-phone-line" style={{ marginRight: '8px', color: 'primary' }} />
              <Typography variant="body2" color="text.secondary">
                +91 7386XXXXXX
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <i className="ri-mail-line" style={{ marginRight: '8px', color: 'primary' }} />
              <Typography variant="body2" color="text.secondary">
                arsalaansairab8@gmail.com
              </Typography>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <List dense disablePadding>
              {[
                { text: 'Home', path: '/' },
                { text: 'Products', path: '/products' },
                { text: 'About Us', path: '#' },
                { text: 'Contact', path: '#' },
                { text: 'FAQ', path: '#' }
              ].map((link) => (
                <ListItem key={link.text} disablePadding sx={{ pb: 1 }}>
                  <ListItemText 
                    primary={
                      <FooterLink component={RouterLink} to={link.path}>{link.text}</FooterLink>
                    } 
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          {/* Categories */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              Categories
            </Typography>
            <List dense disablePadding>
              {[
                { text: 'Smart Watches', path: '/category/smart-watches' },
                { text: 'Smartphones', path: '/category/smart-mobiles' },
                { text: 'Laptops', path: '/category/laptops' },
                { text: 'Grocery', path: '/category/grocery' }
              ].map((link) => (
                <ListItem key={link.text} disablePadding sx={{ pb: 1 }}>
                  <ListItemText 
                    primary={
                      <FooterLink component={RouterLink} to={link.path}>{link.text}</FooterLink>
                    } 
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Stay updated with our latest products and offers.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
              >
                Subscribe
              </Button>
            </Box>
            
            {/* Social Media */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Follow us on social media:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <SocialIconButton size="small" aria-label="facebook">
                  <i className="ri-facebook-box-line" />
                </SocialIconButton>
                <SocialIconButton size="small" aria-label="twitter">
                  <i className="ri-twitter-line" />
                </SocialIconButton>
                <SocialIconButton size="small" aria-label="instagram">
                  <i className="ri-instagram-line" />
                </SocialIconButton>
                <SocialIconButton size="small" aria-label="youtube">
                  <i className="ri-youtube-line" />
                </SocialIconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 4, mb: 2 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} CHRONO E-COMMERCE. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FooterLink href="#" variant="body2" color="text.secondary">
              Privacy Policy
            </FooterLink>
            <FooterLink href="#" variant="body2" color="text.secondary">
              Terms of Service
            </FooterLink>
            <FooterLink href="#" variant="body2" color="text.secondary">
              Shipping Policy
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 