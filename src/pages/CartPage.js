import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Divider, 
  IconButton, 
  TextField, 
  Card, 
  CardContent,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import 'remixicon/fonts/remixicon.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const steps = ['Shopping Cart', 'Shipping Information', 'Payment', 'Order Complete'];
  
  const handleQuantityChange = (product, action) => {
    if (action === 'increase') {
      addToCart(product);
    } else if (action === 'decrease') {
      removeFromCart(product);
    }
  };
  
  const handleRemoveItem = (product) => {
    // Remove all quantities of this product
    const quantity = cart.items.find(item => item.id === product.id)?.quantity || 0;
    for (let i = 0; i < quantity; i++) {
      removeFromCart(product);
    }
  };
  
  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      // Process payment and complete order
      clearCart();
    }
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const isShippingFormValid = () => {
    return Object.values(shippingInfo).every(value => value.trim() !== '');
  };
  
  const isPaymentFormValid = () => {
    return Object.values(paymentInfo).every(value => value.trim() !== '');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };
  
  // Render shopping cart
  const renderCart = () => {
    if (cart.items.length === 0) {
      return (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="ri-shopping-cart-line" style={{ fontSize: '80px', color: 'gray', marginBottom: '16px', display: 'block' }} />
          </motion.div>
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button 
            component={Link} 
            to="/products" 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<i className="ri-arrow-left-line" />}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      );
    }
    
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Shopping Cart ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'})
          </Typography>
          
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {cart.items.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      display: 'flex', 
                      alignItems: 'center',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        backgroundImage: `url(${item.image || 'https://via.placeholder.com/80?text=' + item.name})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        mr: 2,
                        borderRadius: 1
                      }} 
                    />
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.category === 'watches' ? 'Watch' : 'Computer'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleQuantityChange(item, 'decrease')}
                      >
                        <i className="ri-subtract-line" style={{ fontSize: '18px' }} />
                      </IconButton>
                      <Typography sx={{ mx: 1, minWidth: 20, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => handleQuantityChange(item, 'increase')}
                      >
                        <i className="ri-add-line" style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: 80, textAlign: 'right' }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    
                    <IconButton 
                      color="error" 
                      sx={{ ml: 1 }}
                      onClick={() => handleRemoveItem(item)}
                    >
                      <i className="ri-delete-bin-line" style={{ fontSize: '20px' }} />
                    </IconButton>
                  </Paper>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              component={Link} 
              to="/products" 
              startIcon={<i className="ri-arrow-left-line" />}
              variant="outlined"
            >
              Continue Shopping
            </Button>
            
            <Button 
              onClick={clearCart} 
              color="error" 
              variant="outlined"
              startIcon={<i className="ri-delete-bin-line" />}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ position: 'sticky', top: 100 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Order Summary
                </Typography>
                
                <Box sx={{ my: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">
                      Subtotal ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'})
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ₹{cart.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">
                      Shipping
                    </Typography>
                    <Typography variant="body1">
                      Free
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">
                      Tax
                    </Typography>
                    <Typography variant="body1">
                      ₹{(cart.totalPrice * 0.1).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ₹{(cart.totalPrice + cart.totalPrice * 0.1).toFixed(2)}
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  fullWidth
                  onClick={handleNext}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    );
  };
  
  // Render shipping information form
  const renderShippingInfo = () => {
    return (
      <Box>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Shipping Information
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={shippingInfo.firstName}
              onChange={handleShippingInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={shippingInfo.lastName}
              onChange={handleShippingInfoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={shippingInfo.email}
              onChange={handleShippingInfoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="State/Province"
              name="state"
              value={shippingInfo.state}
              onChange={handleShippingInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="ZIP / Postal code"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleShippingInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Country"
              name="country"
              value={shippingInfo.country}
              onChange={handleShippingInfoChange}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={handleBack} startIcon={<i className="ri-arrow-left-line" />}>
            Back to Cart
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleNext}
            disabled={!isShippingFormValid()}
          >
            Continue to Payment
          </Button>
        </Box>
      </Box>
    );
  };
  
  // Render payment form
  const renderPayment = () => {
    return (
      <Box>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Payment Information
        </Typography>
        
        <Alert severity="info" sx={{ my: 2 }}>
          This is a demo website. No real payment will be processed.
        </Alert>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentInfoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Name on Card"
              name="cardName"
              value={paymentInfo.cardName}
              onChange={handlePaymentInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiry Date"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={handlePaymentInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              name="cvv"
              type="password"
              value={paymentInfo.cvv}
              onChange={handlePaymentInfoChange}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">
              Subtotal
            </Typography>
            <Typography variant="body1">
              ₹{cart.totalPrice.toFixed(2)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">
              Shipping
            </Typography>
            <Typography variant="body1">
              Free
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">
              Tax
            </Typography>
            <Typography variant="body1">
              ₹{(cart.totalPrice * 0.1).toFixed(2)}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">
              Total
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary">
              ₹{(cart.totalPrice + cart.totalPrice * 0.1).toFixed(2)}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={handleBack} startIcon={<i className="ri-arrow-left-line" />}>
            Back to Shopping
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleNext}
            disabled={!isPaymentFormValid()}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    );
  };
  
  // Render order complete
  const renderOrderComplete = () => {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <i className="ri-check-double-line" style={{ fontSize: '100px', color: '#4caf50', marginBottom: '24px', display: 'block' }} />
        </motion.div>
        
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Thank You for Your Order!
        </Typography>
        
        <Typography variant="body1" paragraph>
          Your order has been placed successfully. We've sent a confirmation email to {shippingInfo.email}.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Order Number: <strong>#{Math.floor(Math.random() * 1000000)}</strong>
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ mx: 1 }}
          >
            Back to Home
          </Button>
          
          <Button 
            component={Link} 
            to="/products" 
            variant="outlined" 
            color="primary" 
            size="large"
            sx={{ mx: 1 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    );
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeStep === 0 && renderCart()}
          {activeStep === 1 && renderShippingInfo()}
          {activeStep === 2 && renderPayment()}
          {activeStep === 3 && renderOrderComplete()}
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default CartPage; 