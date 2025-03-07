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
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  YouTube as YouTubeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
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
              <LocationIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                123 Tech Avenue, Digital City, 10001
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                info@chronotech.com
              </Typography>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <List dense disablePadding>
              {['Home', 'About Us', 'Products', 'Contact', 'FAQ'].map((text) => (
                <ListItem key={text} disablePadding sx={{ pb: 1 }}>
                  <ListItemText 
                    primary={
                      <FooterLink href="#">{text}</FooterLink>
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
              {['Luxury Watches', 'Smart Watches', 'Gaming PCs', 'Laptops', 'Accessories'].map((text) => (
                <ListItem key={text} disablePadding sx={{ pb: 1 }}>
                  <ListItemText 
                    primary={
                      <FooterLink href="#">{text}</FooterLink>
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
                  <FacebookIcon fontSize="small" />
                </SocialIconButton>
                <SocialIconButton size="small" aria-label="twitter">
                  <TwitterIcon fontSize="small" />
                </SocialIconButton>
                <SocialIconButton size="small" aria-label="instagram">
                  <InstagramIcon fontSize="small" />
                </SocialIconButton>
                <SocialIconButton size="small" aria-label="youtube">
                  <YouTubeIcon fontSize="small" />
                </SocialIconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 4, mb: 2 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} CHRONO TECH. All rights reserved.
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