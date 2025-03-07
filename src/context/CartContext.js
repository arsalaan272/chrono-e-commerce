import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the cart
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the context
const CartContext = createContext();

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        // Add new item to cart
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (!existingItem) return state;

      if (existingItem.quantity === 1) {
        // Remove item completely if quantity is 1
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - action.payload.price,
        };
      } else {
        // Decrease quantity by 1
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - action.payload.price,
        };
      }
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        Object.keys(cartReducer(initialState, { type: '' })).forEach(key => {
          if (!(key in parsedCart)) {
            throw new Error(`Invalid cart data: missing ${key}`);
          }
        });
        dispatch({ type: 'REPLACE_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 