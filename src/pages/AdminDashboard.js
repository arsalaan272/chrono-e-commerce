import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  FormControlLabel,
  Switch,
  Chip,
  IconButton,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import 'remixicon/fonts/remixicon.css';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { addProduct, getAllProducts, deleteProduct } from '../services/productService';

const StyledPaper = styled(Paper)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 247, 250, 0.98) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`;

const GradientHeader = styled(Box)`
  background: linear-gradient(45deg, #2E3B55 30%, #4F5B75 90%);
  color: white;
  padding: 2rem;
  border-radius: 8px 8px 0 0;
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    features: [],
    inStock: true,
    rating: '4.0',
  });
  const [featureInput, setFeatureInput] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Load existing products
    loadProducts();
  }, [navigate]);

  const loadProducts = () => {
    const allProducts = getAllProducts();
    // Only show dynamic products (those added by admin)
    const dynamicProductsJson = localStorage.getItem('dynamicProducts');
    const dynamicProducts = dynamicProductsJson ? JSON.parse(dynamicProductsJson) : [];
    setProducts(dynamicProducts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.price || !formData.image || !formData.description || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (isNaN(parseFloat(formData.rating)) || parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      setError('Rating must be between 0 and 5');
      return;
    }

    try {
      // Add product
      const newProduct = addProduct({
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
      });

      setSuccess(`Product "${newProduct.name}" added successfully!`);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        image: '',
        description: '',
        category: '',
        features: [],
        inStock: true,
        rating: '4.0',
      });

      // Reload products
      loadProducts();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add product. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      loadProducts();
      setSuccess('Product deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Left Brand Name */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #2E3B55, #F50057)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: 1,
            }}
          >
            CHRONO E-COMMERCE
          </Typography>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StyledPaper elevation={24} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            {/* Header */}
            <GradientHeader>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <i className="ri-admin-line" style={{ fontSize: '40px' }} />
                  <Box>
                    <Typography variant="h5" component="h1" fontWeight="bold" sx={{ mb: 0.5 }}>
                      CHRONO E-COMMERCE
                    </Typography>
                    <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 0.5 }}>
                      Admin Dashboard
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Manage your products
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<i className="ri-logout-circle-r-line" />}
                  onClick={handleLogout}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </GradientHeader>

            <Box sx={{ p: 4 }}>
              {/* Alerts */}
              {success && (
                <Alert
                  severity="success"
                  icon={<i className="ri-check-double-line" />}
                  sx={{ mb: 3, borderRadius: 2 }}
                  onClose={() => setSuccess('')}
                >
                  {success}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              <Grid container spacing={4}>
                {/* Add Product Form */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                    Add New Product
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      margin="normal"
                      sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth margin="normal" sx={{ mb: 2 }} required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        label="Category"
                      >
                        <MenuItem value="">
                          <em>Select a category</em>
                        </MenuItem>
                        <MenuItem value="smart-watches">Smart Watches</MenuItem>
                        <MenuItem value="smart-mobiles">Smart Mobiles</MenuItem>
                        <MenuItem value="laptops">Laptops</MenuItem>
                        <MenuItem value="grocery">Grocery</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      margin="normal"
                      inputProps={{ step: '0.01', min: '0' }}
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      fullWidth
                      label="Image URL"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      margin="normal"
                      placeholder="https://example.com/image.jpg"
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={4}
                      margin="normal"
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      fullWidth
                      label="Rating"
                      name="rating"
                      type="number"
                      value={formData.rating}
                      onChange={handleInputChange}
                      margin="normal"
                      inputProps={{ step: '0.1', min: '0', max: '5' }}
                      helperText="Rating from 0 to 5"
                      sx={{ mb: 2 }}
                    />

                    {/* Features */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Features
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Add a feature"
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddFeature();
                            }
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={handleAddFeature}
                          sx={{ minWidth: 'auto', px: 2 }}
                        >
                          <i className="ri-add-line" />
                        </Button>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {formData.features.map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            onDelete={() => handleRemoveFeature(index)}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.inStock}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
                          }
                          color="primary"
                        />
                      }
                      label="In Stock"
                      sx={{ mb: 3 }}
                    />

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<i className="ri-add-line" />}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #2E3B55 30%, #4F5B75 90%)',
                          boxShadow: '0 4px 15px rgba(46, 59, 85, 0.4)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1E2B45 30%, #2E3B55 90%)',
                            boxShadow: '0 6px 20px rgba(46, 59, 85, 0.5)',
                          },
                        }}
                      >
                        Add Product
                      </Button>
                    </motion.div>
                  </Box>
                </Grid>

                {/* Existing Products */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                    Added Products ({products.length})
                  </Typography>

                  <Box sx={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {products.length === 0 ? (
                      <Paper
                        sx={{
                          p: 4,
                          textAlign: 'center',
                          bgcolor: 'background.default',
                          borderRadius: 2,
                        }}
                      >
                        <Typography color="text.secondary">
                          No products added yet. Add your first product using the form!
                        </Typography>
                      </Paper>
                    ) : (
                      products.map((product) => (
                        <Paper
                          key={product.id}
                          sx={{
                            p: 2,
                            mb: 2,
                            borderRadius: 2,
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 2,
                                backgroundImage: `url(${product.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                flexShrink: 0,
                              }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" fontWeight="bold">
                                {product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {product.category}
                              </Typography>
                              <Typography variant="body1" color="primary" fontWeight="bold">
                                ₹{product.price.toFixed(2)}
                              </Typography>
                            </Box>
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteProduct(product.id)}
                              sx={{ alignSelf: 'flex-start' }}
                            >
                              <i className="ri-delete-bin-line" style={{ fontSize: '20px' }} />
                            </IconButton>
                          </Box>
                        </Paper>
                      ))
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminDashboard;

