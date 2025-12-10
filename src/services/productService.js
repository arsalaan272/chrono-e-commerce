import products from '../data/products';

// Get all products (static + dynamic from localStorage)
export const getAllProducts = () => {
  // Get static products from all categories
  const staticProducts = [
    ...(products['smart-watches'] || []),
    ...(products['smart-mobiles'] || []),
    ...(products['laptops'] || []),
    ...(products['grocery'] || []),
    ...(products['watches'] || []),
    ...(products['computers'] || []),
  ];
  
  // Get dynamic products from localStorage
  const dynamicProductsJson = localStorage.getItem('dynamicProducts');
  const dynamicProducts = dynamicProductsJson ? JSON.parse(dynamicProductsJson) : [];
  
  // Combine and return all products
  return [...staticProducts, ...dynamicProducts];
};

// Get products by category
export const getProductsByCategory = (category) => {
  const allProducts = getAllProducts();
  
  // Filter products by category
  return allProducts.filter(p => p.category === category);
};

// Get product by ID
export const getProductById = (id) => {
  const allProducts = getAllProducts();
  return allProducts.find(p => p.id === parseInt(id));
};

// Add a new product (dynamic)
export const addProduct = (product) => {
  // Get existing dynamic products
  const dynamicProductsJson = localStorage.getItem('dynamicProducts');
  const dynamicProducts = dynamicProductsJson ? JSON.parse(dynamicProductsJson) : [];
  
  // Generate new ID (find max ID from all products + 1)
  const allProducts = getAllProducts();
  const maxId = Math.max(...allProducts.map(p => p.id), 0);
  const newId = maxId + 1;
  
  // Create new product with ID
  const newProduct = {
    ...product,
    id: newId,
    inStock: product.inStock !== undefined ? product.inStock : true,
    rating: product.rating || 4.0,
  };
  
  // Add to dynamic products
  dynamicProducts.push(newProduct);
  
  // Save to localStorage
  localStorage.setItem('dynamicProducts', JSON.stringify(dynamicProducts));
  
  return newProduct;
};

// Delete a dynamic product
export const deleteProduct = (id) => {
  const dynamicProductsJson = localStorage.getItem('dynamicProducts');
  const dynamicProducts = dynamicProductsJson ? JSON.parse(dynamicProductsJson) : [];
  
  const filtered = dynamicProducts.filter(p => p.id !== parseInt(id));
  localStorage.setItem('dynamicProducts', JSON.stringify(filtered));
  
  return filtered;
};

// Get all categories (including dynamic ones)
export const getAllCategories = () => {
  const allProducts = getAllProducts();
  const categories = [...new Set(allProducts.map(p => p.category))];
  return categories;
};

