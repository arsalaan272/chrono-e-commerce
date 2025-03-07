import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Container, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  InputAdornment,
  Pagination,
  Skeleton
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductList = ({ products, title, description }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 6;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // 'featured'
        // Assuming products are already in featured order
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, sortBy]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of product list
    window.scrollTo({
      top: document.getElementById('product-list-top').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box id="product-list-top">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              {title || 'Our Products'}
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
              {description || 'Explore our collection of premium products.'}
            </Typography>
          </motion.div>
        </Box>
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </motion.div>
        
        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Showing {filteredProducts.length} products
            </Typography>
          </Box>
        </motion.div>
        
        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {loading ? (
              // Loading skeletons
              Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <Skeleton variant="rectangular" height={200} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Skeleton variant="text" width={80} height={30} />
                      <Skeleton variant="rectangular" width={120} height={36} />
                    </Box>
                  </Box>
                </Grid>
              ))
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h5" color="text.secondary" gutterBottom>
                    No products found
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Try adjusting your search or filter to find what you're looking for.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </motion.div>
        
        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </motion.div>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProductList; 