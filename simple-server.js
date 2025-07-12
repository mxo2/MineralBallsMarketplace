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

// Product data with real images
const products = [
  {
    id: 1,
    name: "Premium Roasted Makhana",
    description: "Classic roasted fox nuts with perfect crunch and natural flavor",
    category: "roasted",
    imageUrl: "/assets/rostedmakhana_1752243656549.png",
    weight: "100g",
    isNew: true,
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
    name: "Chocolate Makhana",
    description: "Rich chocolate flavored makhana for sweet cravings",
    category: "flavored", 
    imageUrl: "/assets/chocalate_1752242243647.png",
    weight: "80g",
    isNew: true,
    nutritionFacts: {
      calories: 380,
      protein: "8.5g",
      carbs: "78.2g",
      fat: "2.1g", 
      fiber: "12.3g"
    }
  },
  {
    id: 3,
    name: "Raw Makhana",
    description: "Natural unprocessed fox nuts perfect for healthy snacking",
    category: "raw",
    imageUrl: "/assets/raw_makhana_1752243663105.png", 
    weight: "150g",
    isNew: true,
    nutritionFacts: {
      calories: 325,
      protein: "10.2g",
      carbs: "72.1g",
      fat: "0.1g",
      fiber: "16.2g"
    }
  },
  {
    id: 4,
    name: "Makhana Powder",
    description: "Finely ground makhana powder for beverages and recipes",
    category: "powder",
    imageUrl: "/assets/powder_1752243668411.png",
    weight: "200g", 
    isNew: true,
    nutritionFacts: {
      calories: 340,
      protein: "9.8g",
      carbs: "75.3g",
      fat: "0.1g",
      fiber: "15.1g"
    }
  },
  {
    id: 5,
    name: "Flavored Varieties Pack",
    description: "Assorted pack of different makhana flavors",
    category: "flavored",
    imageUrl: "/assets/flavours_1752243675544.png",
    weight: "Mix Pack",
    isNew: false,
    nutritionFacts: {
      calories: 365,
      protein: "9.2g",
      carbs: "77.8g",
      fat: "1.8g",
      fiber: "13.7g"
    }
  },
  {
    id: 6,
    name: "Spicy Chilly Makhana",
    description: "Spicy and tangy chilly flavored makhana",
    category: "flavored",
    imageUrl: "/assets/spicychilly_1752242265988.png",
    weight: "90g",
    isNew: false,
    nutritionFacts: {
      calories: 355,
      protein: "9.1g", 
      carbs: "76.5g",
      fat: "1.2g",
      fiber: "14.8g"
    }
  },
  {
    id: 7,
    name: "Pineapple Makhana",
    description: "Sweet and tangy pineapple flavored makhana",
    category: "flavored",
    imageUrl: "/assets/pianpple_1752242265988.png",
    weight: "85g",
    isNew: false,
    nutritionFacts: {
      calories: 370,
      protein: "8.8g",
      carbs: "78.9g", 
      fat: "1.5g",
      fiber: "13.2g"
    }
  }
];

const categories = [
  { id: 1, name: "Roasted Makhana", slug: "roasted", description: "Traditional roasted fox nuts with perfect crunch" },
  { id: 2, name: "Flavored Varieties", slug: "flavored", description: "Exciting flavored options for every taste" },
  { id: 3, name: "Raw Makhana", slug: "raw", description: "Natural unprocessed fox nuts" },
  { id: 4, name: "Makhana Powder", slug: "powder", description: "Ground makhana for beverages and recipes" }
];

const videos = [
  {
    id: 1,
    title: "Post-Workout Power Snack",
    description: "Perfect protein-rich snack after your workout session",
    videoUrl: "/assets/video1_1752220611235.mp4",
    thumbnailUrl: "/assets/rostedmakhana_1752243656549.png",
    category: "fitness"
  },
  {
    id: 2,
    title: "Healthy Kids Snack",
    description: "Nutritious and delicious snack for growing children",
    videoUrl: "https://raahuketu.com/public/video/video2.mp4",
    thumbnailUrl: "/assets/flavours_1752243675544.png", 
    category: "kids"
  },
  {
    id: 3,
    title: "Elder-Friendly Nutrition",
    description: "Easy-to-digest superfood for senior citizens",
    videoUrl: "https://raahuketu.com/public/video/video3.mp4",
    thumbnailUrl: "/assets/powder_1752243668411.png",
    category: "seniors"
  },
  {
    id: 4,
    title: "Natural Energy Booster",
    description: "Raw makhana for natural energy throughout the day",
    videoUrl: "https://raahuketu.com/public/video/video4.mp4", 
    thumbnailUrl: "/assets/raw_makhana_1752243663105.png",
    category: "energy"
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

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'public')));

// Serve attached assets
app.use('/assets', express.static(path.join(__dirname, '..', 'attached_assets')));

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