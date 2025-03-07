import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ProductList from '../components/ProductList';
import products from '../data/products';

const CategoryPage = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({
    title: '',
    description: '',
    image: ''
  });
  
  useEffect(() => {
    // Set category products based on URL parameter
    if (category === 'watches') {
      setCategoryProducts(products.watches);
      setCategoryInfo({
        title: 'Luxury Watches',
        description: 'Discover our exclusive collection of premium watches. From elegant chronographs to smart fitness trackers, find the perfect timepiece to match your style and needs.',
        image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop'
      });
    } else if (category === 'computers') {
      setCategoryProducts(products.computers);
      setCategoryInfo({
        title: 'High-Performance Computers',
        description: "Explore our range of powerful computers designed for every need. Whether you're a gamer seeking ultimate performance, a professional requiring a reliable workstation, or simply looking for an everyday PC, we have the perfect solution for you.",
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop'
      });
    } else {
      // Default to all products if category is not recognized
      setCategoryProducts([...products.watches, ...products.computers]);
      setCategoryInfo({
        title: 'All Products',
        description: 'Browse our complete collection of premium watches and high-performance computers.',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop'
      });
    }
    
    // Scroll to top when category changes
    window.scrollTo(0, 0);
  }, [category]);
  
  return (
    <Box>
      {/* Category Banner */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: 200, md: 300 },
          overflow: 'hidden',
          mb: 4
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${categoryInfo.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }
          }}
        />
        
        <Container 
          maxWidth="lg" 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            color: 'white'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumbs 
              aria-label="breadcrumb" 
              sx={{ 
                mb: 2,
                '& .MuiBreadcrumbs-ol': {
                  color: 'white'
                },
                '& .MuiBreadcrumbs-separator': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
            >
              <Link 
                component={RouterLink} 
                to="/" 
                color="inherit"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: 'white'
                  }
                }}
              >
                Home
              </Link>
              <Typography color="white">
                {categoryInfo.title}
              </Typography>
            </Breadcrumbs>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold"
              sx={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                mb: 2
              }}
            >
              {categoryInfo.title}
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Typography 
              variant="h6"
              sx={{ 
                maxWidth: 700,
                textShadow: '0 1px 5px rgba(0,0,0,0.3)',
                display: { xs: 'none', md: 'block' }
              }}
            >
              {categoryInfo.description}
            </Typography>
          </motion.div>
        </Container>
      </Box>
      
      {/* Mobile description (only shown on small screens) */}
      <Container maxWidth="lg" sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {categoryInfo.description}
        </Typography>
      </Container>
      
      {/* Product List */}
      <ProductList 
        products={categoryProducts} 
        title={null}
        description={null}
      />
    </Box>
  );
};

export default CategoryPage; 