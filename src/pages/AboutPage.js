import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import 'remixicon/fonts/remixicon.css';

const HeroSection = styled(Box)`
  background: linear-gradient(135deg, #2E3B55 0%, #4F5B75 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.05)" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const ServiceCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme?.palette?.divider};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatBox = styled(Box)`
  background: linear-gradient(135deg, #2E3B55 0%, #4F5B75 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
`;

const RemixIcon = styled.i`
  font-size: 40px;
  color: #2E3B55;
`;

const AboutPage = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const services = [
    {
      icon: <RemixIcon className="ri-shopping-bag-line" />,
      title: 'Wide Product Range',
      description:
        'Explore thousands of products across multiple categories including electronics, groceries, fashion, and more.',
    },
    {
      icon: <RemixIcon className="ri-truck-line" />,
      title: 'Fast Delivery',
      description:
        'We ensure quick and reliable delivery to your doorstep with multiple shipping options available.',
    },
    {
      icon: <RemixIcon className="ri-shield-check-line" />,
      title: 'Secure Shopping',
      description:
        'Your data is protected with industry-leading encryption and secure payment gateways.',
    },
    {
      icon: <RemixIcon className="ri-customer-service-2-line" />,
      title: '24/7 Customer Support',
      description:
        'Our dedicated support team is always ready to help you with any questions or concerns.',
    },
    {
      icon: <RemixIcon className="ri-trending-up-line" />,
      title: 'Best Prices',
      description:
        'We offer competitive prices and regular deals to ensure you get the best value for your money.',
    },
    {
      icon: <RemixIcon className="ri-team-line" />,
      title: 'Community Driven',
      description:
        'Join thousands of satisfied customers who trust us for their shopping needs.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
              About CHRONO E-COMMERCE
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
              Your Trusted Online Shopping Destination for Quality Products and Exceptional Service
            </Typography>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Our Story */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                CHRONO E-COMMERCE was founded with a vision to revolutionize online shopping by providing customers with
                an exceptional platform that combines convenience, reliability, and quality. We started with a small team
                of passionate entrepreneurs dedicated to creating a seamless shopping experience.
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                Over the years, we've grown to become a trusted name in e-commerce, serving thousands of satisfied
                customers across the region. Our commitment to excellence, innovation, and customer satisfaction has been
                the driving force behind our success.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                Today, we continue to expand our product catalog, improve our services, and invest in technology to make
                shopping even easier for our customers.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #2E3B55 0%, #4F5B75 100%)',
                  height: 400,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 80,
                }}
              >
                🛍️
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Mission & Vision */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 2 }}>
                  <Typography variant="h4" gutterBottom fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                    To provide an accessible, secure, and convenient online shopping platform that offers a diverse range
                    of quality products at competitive prices, while delivering exceptional customer service and support.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 2 }}>
                  <Typography variant="h4" gutterBottom fontWeight="bold" color="secondary" sx={{ mb: 2 }}>
                    Our Vision
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                    To become the most trusted and preferred e-commerce platform in the region, recognized for our
                    commitment to quality, innovation, and customer satisfaction. We aim to empower millions of customers
                    with convenient access to quality products.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ textAlign: 'center', mb: 6 }}>
            Our Services
          </Typography>
        </motion.div>

        <Grid container spacing={4} component={motion.div} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} component={motion.div} variants={itemVariants}>
              <ServiceCard>
                <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Statistics */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ textAlign: 'center', mb: 6 }}>
              By The Numbers
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[
              { number: '500+', label: 'Products' },
              { number: '10k+', label: 'Happy Customers' },
              { number: '50+', label: 'Categories' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StatBox>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1">{stat.label}</Typography>
                </StatBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Core Values */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ textAlign: 'center', mb: 6 }}>
            Our Core Values
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {[
            {
              title: 'Integrity',
              description: 'We conduct our business with honesty, transparency, and ethical practices.',
            },
            {
              title: 'Customer Focus',
              description: 'Our customers are at the heart of everything we do, and their satisfaction is our priority.',
            },
            {
              title: 'Quality',
              description: 'We are committed to providing high-quality products and services consistently.',
            },
            {
              title: 'Innovation',
              description: 'We continuously innovate to improve our platform and offer better experiences.',
            },
          ].map((value, index) => (
            <Grid item xs={12} md={6} key={index} component={motion.div}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ p: 3, border: `2px solid ${theme.palette.primary.main}`, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'linear-gradient(135deg, #2E3B55 0%, #4F5B75 100%)', color: 'white', py: 10, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mb: 2, color: theme.palette.mode === 'dark' ? 'white' : '#000000' }}>
              Ready to Shop?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 1, color: theme.palette.mode === 'dark' ? '#f5f5f5' : '#000000' }}>
              Explore our vast collection of products and experience exceptional shopping with CHRONO E-COMMERCE.
            </Typography>
          </Container>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AboutPage;
