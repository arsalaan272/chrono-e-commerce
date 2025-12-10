import React from 'react';
import { Box, Container, Typography, Grid, Button, Divider, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import { getAllProducts } from '../services/productService';

const FeaturedSection = ({ title, subtitle, children }) => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              {title}
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              {subtitle}
            </Typography>
          </motion.div>
        </Box>
        
        {children}
      </Container>
    </Box>
  );
};

const CategoryBanner = ({ category, title, description, image, reverse }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      sx={{ 
        py: 6, 
        background: reverse 
          ? (isDark 
              ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
              : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)')
          : theme.palette.background.paper,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: reverse 
          ? (isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.1)')
          : 'none',
        my: 8,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} direction={reverse ? 'row-reverse' : 'row'} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography 
                  variant="overline" 
                  component="div" 
                  color="primary" 
                  fontWeight="bold"
                  sx={{ mb: 1, letterSpacing: 2 }}
                >
                  {category.toUpperCase()}
                </Typography>
                
                <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                  {title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" paragraph>
                  {description}
                </Typography>
                
                <Button 
                  component={Link} 
                  to={`/category/${category}`} 
                  variant="contained" 
                  color={reverse ? "secondary" : "primary"} 
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Explore {category}
                </Button>
              </motion.div>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  height: 400,
                  background: `url(${image || 'https://via.placeholder.com/600x400?text=' + category})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const NewsletterSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box 
      sx={{ 
        py: 10, 
        background: isDark
          ? 'linear-gradient(45deg, #1E2B45, #2E3B55)'
          : 'linear-gradient(45deg, #2E3B55, #4F5B75)',
        color: 'white',
        textAlign: 'center',
        transition: 'background 0.3s ease',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Stay Updated
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Subscribe to our newsletter for exclusive offers, new product announcements, and shopping tips.
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ 
                flex: 1, 
                padding: '12px 20px', 
                borderRadius: 30, 
                border: 'none',
                fontSize: '1rem',
                outline: 'none',
                color: '#333',
                backgroundColor: 'white',
              }} 
            />
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ 
                borderRadius: 30, 
                px: 4,
                whiteSpace: 'nowrap'
              }}
            >
              Subscribe Now
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

const HomePage = () => {
  const theme = useTheme();
  // Get all products (static + dynamic)
  const allProducts = getAllProducts();
  
  // Get featured products (first 6 products)
  const featuredProducts = allProducts.slice(0, 6);
  
  return (
    <Box>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <FeaturedSection 
        title="Featured Products" 
        subtitle="Discover our handpicked selection of quality products across all categories."
      >
        <ProductList 
          products={featuredProducts} 
          title={null} 
          description={null} 
        />
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            component={Link} 
            to="/products" 
            variant="outlined" 
            color="primary" 
            size="large"
          >
            View All Products
          </Button>
        </Box>
      </FeaturedSection>
      
      {/* Category Banners */}
      <CategoryBanner 
        category="smart-watches"
        title="Smart Watches & Wearables"
        description="Discover our exclusive collection of smart watches and fitness trackers. From elegant smartwatches to advanced fitness trackers, find the perfect wearable to match your lifestyle. Each device is designed with cutting-edge technology and premium quality."
        image="https://images.unsplash.com/photo-1619946794135-5bc917a27793?q=80&w=1000&auto=format&fit=crop"
        reverse={false}
      />
      
      <CategoryBanner 
        category="smart-mobiles"
        title="Latest Smartphones"
        description="Explore our collection of cutting-edge smartphones from top brands. Experience stunning displays, powerful processors, and advanced cameras. Find the perfect device that fits your lifestyle and budget."
        image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop"
        reverse={true}
      />
      
      <CategoryBanner 
        category="laptops"
        title="Premium Laptops & Computing"
        description="Explore our range of powerful laptops and computing devices designed for every need. Whether you're a student, professional, or gamer, we have the perfect solution for you. All our devices feature the latest technology and premium components."
        image="https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=1000&auto=format&fit=crop"
        reverse={false}
      />
      
      <CategoryBanner 
        category="grocery"
        title="Fresh Grocery & Essentials"
        description="Shop fresh groceries and everyday essentials delivered right to your door. From organic produce to premium pantry staples, everything you need for a healthy lifestyle. Get the best quality at competitive prices."
        image="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        reverse={true}
      />
      
      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                What Our Customers Say
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Don't just take our word for it. Here's what our satisfied customers have to say.
              </Typography>
            </motion.div>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                name: "John D.",
                role: "Tech Enthusiast",
                comment: "The gaming PC I purchased exceeded all my expectations. The build quality is exceptional, and the performance is outstanding. Customer service was also top-notch!",
                rating: 5
              },
              {
                name: "Sarah M.",
                role: "Business Professional",
                comment: "I've been wearing my Chronograph watch daily for the past 6 months, and it still looks and functions perfectly. The attention to detail is remarkable.",
                rating: 5
              },
              {
                name: "Michael T.",
                role: "Student",
                comment: "The laptop I bought for my studies is perfect. Fast, reliable, and the battery life is amazing. The price was also very reasonable for the quality.",
                rating: 4.5
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: 'background.paper', 
                      p: 4, 
                      borderRadius: 4,
                      height: '100%',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 10px 30px rgba(0,0,0,0.4)'
                        : '0 10px 30px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 15px 35px rgba(0,0,0,0.6)'
                          : '0 15px 35px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                      "{testimonial.comment}"
                    </Typography>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          mr: 2
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </Box>
  );
};

export default HomePage; 