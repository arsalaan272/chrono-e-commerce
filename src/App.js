import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme';
import { CartProvider } from './context/CartContext';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <Router>
            <div className="App">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/products" element={<CategoryPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
