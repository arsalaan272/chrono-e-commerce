import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  Chip, 
  Rating, 
  Stack 
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon, 
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

// Styled components
const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const ProductImage = styled(CardMedia)`
  height: 200px;
  background-size: contain;
  transition: transform 0.6s ease;
  
  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const OutOfStockOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [favorite, setFavorite] = React.useState(false);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ height: '100%' }}
    >
      <StyledCard>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <ProductImage
            component="img"
            image={product.image || 'https://via.placeholder.com/300x200?text=Product+Image'}
            alt={product.name}
          />
          
          {/* Favorite button */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 2
            }}
          >
            <IconButton
              onClick={toggleFavorite}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              {favorite ? 
                <FavoriteIcon color="secondary" /> : 
                <FavoriteBorderIcon />
              }
            </IconButton>
          </motion.div>
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <OutOfStockOverlay>
              <Chip 
                label="Out of Stock" 
                color="secondary" 
                sx={{ 
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  padding: '20px 10px'
                }} 
              />
            </OutOfStockOverlay>
          )}
        </Box>
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" color="text.secondary">
                {product.category === 'watches' ? 'Watch' : 'Computer'}
              </Typography>
              <Rating value={product.rating} precision={0.5} size="small" readOnly />
            </Stack>
          </Box>
          
          <Typography 
            gutterBottom 
            variant="h6" 
            component={Link} 
            to={`/product/${product.id}`}
            sx={{ 
              textDecoration: 'none', 
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
              }
            }}
          >
            {product.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
            {product.description.length > 100 
              ? `${product.description.substring(0, 100)}...` 
              : product.description}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              ${product.price.toFixed(2)}
            </Typography>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
            </motion.div>
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

// IconButton component for the favorite button
const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export default ProductCard; 