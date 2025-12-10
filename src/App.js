import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Snackbar, Alert } from '@mui/material';
import getTheme from './theme';
import { CartProvider, useCart } from './context/CartContext';
import { ThemeProvider as CustomThemeProvider, useThemeMode } from './context/ThemeContext';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const { notification, closeNotification } = useCart();

  return (
    <div className="App">
      {!isAdminPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<CategoryPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      
      {/* Cart Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Alert 
          onClose={closeNotification} 
          severity="success" 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

function ThemedApp() {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <ThemedApp />
    </CustomThemeProvider>
  );
}

export default App;
