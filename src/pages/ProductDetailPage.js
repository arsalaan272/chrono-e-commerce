import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Breadcrumbs, 
  Link, 
  Chip, 
  Rating, 
  Divider, 
  TextField, 
  IconButton, 
  Tabs,
  Tab,
  Skeleton,
  Alert
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon, 
  Favorite as FavoriteIcon, 
  FavoriteBorder as FavoriteBorderIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // Find product by ID
    const id = parseInt(productId);
    const allProducts = [...products.watches, ...products.computers];
    const foundProduct = allProducts.find(p => p.id === id);
    
    // Simulate loading
    const timer = setTimeout(() => {
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products from the same category
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    }, 800);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, [productId]);
  
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      // Add product to cart with quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Show success message or navigate to cart
      // For now, we'll just navigate to the cart
      navigate('/cart');
    }
  };
  
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={24} width={120} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={100} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={50} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={50} />
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          Product not found. The product you're looking for might have been removed or doesn't exist.
        </Alert>
        <Button 
          component={RouterLink} 
          to="/products" 
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          Back to Products
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Breadcrumbs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link 
            component={RouterLink} 
            to={`/category/${product.category}`} 
            color="inherit"
          >
            {product.category === 'watches' ? 'Watches' : 'Computers'}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </motion.div>
      
      <Grid 
        container 
        spacing={6}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                height: { xs: 300, md: 500 },
                background: `url(${product.image || 'https://via.placeholder.com/600x600?text=' + product.name})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: 2,
                position: 'relative',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            />
          </motion.div>
        </Grid>
        
        {/* Product Details */}
        <Grid item xs={12} md={6}>
          {/* Category */}
          <motion.div variants={itemVariants}>
            <Chip 
              label={product.category === 'watches' ? 'Watch' : 'Computer'} 
              color="primary" 
              size="small" 
              sx={{ mb: 2 }}
            />
          </motion.div>
          
          {/* Product Name */}
          <motion.div variants={itemVariants}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              {product.name}
            </Typography>
          </motion.div>
          
          {/* Rating */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.rating.toFixed(1)})
              </Typography>
            </Box>
          </motion.div>
          
          {/* Price */}
          <motion.div variants={itemVariants}>
            <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
              ${product.price.toFixed(2)}
            </Typography>
          </motion.div>
          
          {/* Description */}
          <motion.div variants={itemVariants}>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
          </motion.div>
          
          {/* Features */}
          <motion.div variants={itemVariants}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Key Features:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {product.features.map((feature, index) => (
                <Chip 
                  key={index} 
                  label={feature} 
                  variant="outlined" 
                  size="small" 
                />
              ))}
            </Box>
          </motion.div>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Availability */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Availability:
              </Typography>
              <Chip 
                label={product.inStock ? 'In Stock' : 'Out of Stock'} 
                color={product.inStock ? 'success' : 'error'} 
                size="small" 
              />
            </Box>
          </motion.div>
          
          {/* Quantity Selector */}
          {product.inStock && (
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Quantity:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    onClick={decrementQuantity} 
                    disabled={quantity <= 1}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={quantity}
                    onChange={handleQuantityChange}
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    size="small"
                    sx={{ width: 60, mx: 1 }}
                  />
                  <IconButton 
                    onClick={incrementQuantity}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </motion.div>
          )}
          
          {/* Action Buttons */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                fullWidth
                sx={{ py: 1.5 }}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={toggleFavorite}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                {favorite ? 'Saved' : 'Save'}
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
      
      {/* Product Tabs */}
      <Box sx={{ mt: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            centered
            sx={{ mb: 4 }}
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>
          
          {/* Description Tab */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </Typography>
              <Typography variant="body1" paragraph>
                Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </Typography>
            </Box>
          )}
          
          {/* Specifications Tab */}
          {activeTab === 1 && (
            <Box>
              <Grid container spacing={2}>
                {product.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ 
                      p: 2, 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 1,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <Typography variant="body2" fontWeight="bold">
                        Feature {index + 1}
                      </Typography>
                      <Typography variant="body2">
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ 
                    p: 2, 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="body2" fontWeight="bold">
                      Category
                    </Typography>
                    <Typography variant="body2">
                      {product.category === 'watches' ? 'Watch' : 'Computer'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ 
                    p: 2, 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="body2" fontWeight="bold">
                      Rating
                    </Typography>
                    <Typography variant="body2">
                      {product.rating.toFixed(1)} / 5.0
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Customer Reviews
              </Typography>
              
              {/* Sample reviews */}
              {[
                {
                  name: "John D.",
                  date: "2 months ago",
                  rating: 5,
                  comment: "Excellent product! Exactly as described and arrived quickly."
                },
                {
                  name: "Sarah M.",
                  date: "1 month ago",
                  rating: 4,
                  comment: "Very good quality. The only reason I'm not giving 5 stars is because the delivery was a bit delayed."
                },
                {
                  name: "Michael T.",
                  date: "2 weeks ago",
                  rating: 5,
                  comment: "Perfect! I'm very happy with my purchase. Will definitely buy from this store again."
                }
              ].map((review, index) => (
                <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: index < 2 ? '1px solid' : 'none', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} size="small" readOnly sx={{ mb: 1 }} />
                  <Typography variant="body2">
                    {review.comment}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </motion.div>
      </Box>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
              Related Products
            </Typography>
          </motion.div>
          
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    component={RouterLink}
                    to={`/product/${relatedProduct.id}`}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      p: 2,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 150,
                        background: `url(${relatedProduct.image || 'https://via.placeholder.com/300x200?text=' + relatedProduct.name})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        mb: 2
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {relatedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                      {relatedProduct.description.substring(0, 60)}...
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ${relatedProduct.price.toFixed(2)}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetailPage; 