const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} → ${res.statusCode} in ${duration}ms`);
  });
  next();
});

// Mock data for products (replace with database calls later)
const products = [
  {
    id: 1,
    name: "Classic Roasted Makhana",
    description: "Premium quality roasted fox nuts with perfect crunch",
    category: "roasted",
    image: "/api/placeholder/300/300",
    nutritionFacts: {
      calories: 347,
      protein: "9.7g",
      carbs: "76.9g", 
      fat: "0.1g",
      fiber: "14.5g"
    }
  },
  {
    id: 2,
    name: "Chocolate Flavored Makhana",
    description: "Delicious chocolate coated fox nuts for sweet cravings",
    category: "flavored",
    image: "/api/placeholder/300/300",
    nutritionFacts: {
      calories: 380,
      protein: "8.5g",
      carbs: "78.2g",
      fat: "2.1g", 
      fiber: "12.3g"
    }
  }
];

const categories = [
  { id: 1, name: "Roasted Makhana", slug: "roasted", description: "Traditional roasted fox nuts" },
  { id: 2, name: "Flavored Varieties", slug: "flavored", description: "Exciting flavored options" }
];

const videos = [
  {
    id: 1,
    title: "Post-Workout Power Snack",
    description: "Perfect protein-rich snack after your workout session",
    url: "https://example.com/video1.mp4",
    category: "fitness"
  }
];

// API Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/videos', (req, res) => {
  res.json(videos);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Catch all handler for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Mineral Balls server running on port ${port}`);
  console.log(`📱 WhatsApp: +91-9829649640`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});