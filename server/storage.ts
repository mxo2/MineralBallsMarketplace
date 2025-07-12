import { products, categories, cartItems, videos, type Product, type InsertProduct, type Category, type InsertCategory, type CartItem, type InsertCartItem, type Video, type InsertVideo } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Videos
  getVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: number, video: Partial<InsertVideo>): Promise<Video | undefined>;
  deleteVideo(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private cartItems: Map<number, CartItem>;
  private videos: Map<number, Video>;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentCartItemId: number;
  private currentVideoId: number;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.videos = new Map();
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentCartItemId = 1;
    this.currentVideoId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData: InsertCategory[] = [
      {
        name: "Roasted Makhana",
        slug: "roasted",
        description: "Perfectly roasted and seasoned makhana",
        imageUrl: "/roasted_category.png"
      },
      {
        name: "Raw Makhana",
        slug: "raw",
        description: "Natural and unprocessed makhana seeds",
        imageUrl: "/raw_category.png"
      },
      {
        name: "Makhana Powder",
        slug: "powder",
        description: "Fine ground makhana for versatile use",
        imageUrl: "/powder_category.png"
      },
      {
        name: "Flavored Varieties",
        slug: "flavored",
        description: "Delicious flavored makhana varieties",
        imageUrl: "/flavours_category.png"
      }
    ];

    categoryData.forEach(cat => this.createCategory(cat));

    // Seed sample videos
    const videoData: InsertVideo[] = [
      {
        title: "Post-Workout Power Snack",
        description: "Refuel with Mineral Balls: The Perfect Post-Workout Makhana Snack",
        videoUrl: "https://raahuketu.com/public/video/video1.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        isActive: true,
        displayOrder: 1
      },
      {
        title: "Healthy Makhana Milk for Kids",
        description: "Smart Sips: Kids' Juice with Mineral Balls Makhana Powder",
        videoUrl: "https://raahuketu.com/public/video/video2.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        isActive: true,
        displayOrder: 2
      },
      {
        title: "Premium Makhana Quality",
        description: "Experience the superior quality of Mineral Balls makhana products",
        videoUrl: "https://raahuketu.com/public/video/video3.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        isActive: true,
        displayOrder: 3
      },
      {
        title: "Tea-Time Cold Drink & Roasted Makhana for Elders",
        description: "Golden Moments: Mineral Balls Roasted Makhana with Cold Drinks",
        videoUrl: "https://raahuketu.com/public/video/video4.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        isActive: true,
        displayOrder: 4
      }
    ];

    videoData.forEach(vid => this.createVideo(vid));

    // Seed products
    const productData: InsertProduct[] = [
      {
        name: "Classic Roasted Makhana",
        description: "Traditional roasted makhana with light seasoning, perfect for snacking",
        category: "roasted",
        weight: "100g",
        imageUrl: "/rostedmakhana_new.png",
        isBestseller: true,
        rating: "4.8",
        reviewCount: 156,
        nutritionalInfo: JSON.stringify({
          calories: 347,
          protein: "9.7g",
          carbs: "76.9g",
          fat: "0.1g",
          fiber: "14.5g"
        }),
        minerals: JSON.stringify({
          magnesium: "210mg",
          potassium: "500mg",
          calcium: "120mg",
          phosphorus: "540mg"
        }),
        inStock: true
      },
      {
        name: "Spicy Chili Makhana",
        description: "Perfectly spiced with natural chili powder for those who love heat",
        category: "flavored",
        flavor: "chili",
        weight: "100g",
        imageUrl: "/spicychilly_1752242265988.png",
        rating: "4.6",
        reviewCount: 89,
        nutritionalInfo: JSON.stringify({
          calories: 352,
          protein: "9.5g",
          carbs: "77.2g",
          fat: "0.2g",
          fiber: "14.8g"
        }),
        inStock: true
      },
      {
        name: "Premium Raw Makhana",
        description: "Unprocessed natural makhana seeds, perfect for home cooking",
        category: "raw",
        weight: "250g",
        imageUrl: "/raw_makhana_new.png",
        isOrganic: true,
        rating: "4.9",
        reviewCount: 234,
        nutritionalInfo: JSON.stringify({
          calories: 347,
          protein: "9.7g",
          carbs: "76.9g",
          fat: "0.1g",
          fiber: "14.5g"
        }),
        inStock: true
      },
      {
        name: "Chocolate Makhana",
        description: "Rich chocolate coating with crispy makhana center",
        category: "flavored",
        flavor: "chocolate",
        weight: "65g",
        imageUrl: "/chocalate_1752242243647.png",
        isNew: true,
        rating: "4.7",
        reviewCount: 45,
        nutritionalInfo: JSON.stringify({
          calories: 420,
          protein: "8.5g",
          carbs: "65.2g",
          fat: "12.3g",
          fiber: "12.1g"
        }),
        inStock: true
      },
      {
        name: "Pineapple Makhana",
        description: "Tropical pineapple flavor with natural sweetness",
        category: "flavored",
        flavor: "pineapple",
        weight: "80g",
        imageUrl: "/pianpple_1752242265988.png",
        isNew: true,
        rating: "4.5",
        reviewCount: 67,
        nutritionalInfo: JSON.stringify({
          calories: 365,
          protein: "9.2g",
          carbs: "78.5g",
          fat: "0.3g",
          fiber: "13.8g"
        }),
        inStock: true
      },
      {
        name: "Makhana Powder",
        description: "Fine powder perfect for smoothies, baking and healthy recipes",
        category: "powder",
        weight: "200g",
        imageUrl: "/powder_new.png",
        isNew: true,
        rating: "4.8",
        reviewCount: 123,
        nutritionalInfo: JSON.stringify({
          calories: 347,
          protein: "9.7g",
          carbs: "76.9g",
          fat: "0.1g",
          fiber: "14.5g"
        }),
        inStock: true
      },
      {
        name: "Variety Pack",
        description: "Mix of all flavors in one convenient pack",
        category: "flavored",
        weight: "300g",
        imageUrl: "/flavours_new.png",
        rating: "4.6",
        reviewCount: 178,
        nutritionalInfo: JSON.stringify({
          calories: 365,
          protein: "9.2g",
          carbs: "75.8g",
          fat: "1.2g",
          fiber: "14.2g"
        }),
        inStock: true
      },
      {
        name: "Himalayan Salt Roasted",
        description: "Roasted with premium Himalayan pink salt",
        category: "roasted",
        weight: "120g",
        imageUrl: "https://pixabay.com/get/g4130ec1b4f32bb753e3e2841c199e8f73e40ae7156b288802db3700e7b6fbe6d4c242fd98ccb3dbf8a84f44655d5f9cd6eaead86be809c88087ea324b9b746c5_1280.jpg",
        rating: "4.7",
        reviewCount: 92,
        nutritionalInfo: JSON.stringify({
          calories: 350,
          protein: "9.6g",
          carbs: "77.1g",
          fat: "0.2g",
          fiber: "14.7g"
        }),
        inStock: true
      }
    ];

    productData.forEach(prod => this.createProduct(prod));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(c => c.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId);
    
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return { ...item, product };
    });
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values())
      .find(item => item.productId === insertItem.productId && item.sessionId === insertItem.sessionId);
    
    if (existingItem) {
      existingItem.quantity += insertItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = this.currentCartItemId++;
    const item: CartItem = { ...insertItem, id };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    
    if (quantity <= 0) {
      this.cartItems.delete(id);
      return undefined;
    }
    
    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id, _]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
    return true;
  }

  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values())
      .filter(video => video.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const video: Video = { 
      ...insertVideo, 
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.videos.set(id, video);
    return video;
  }

  async updateVideo(id: number, updateVideo: Partial<InsertVideo>): Promise<Video | undefined> {
    const video = this.videos.get(id);
    if (!video) return undefined;
    
    const updatedVideo: Video = { 
      ...video, 
      ...updateVideo,
      updatedAt: new Date()
    };
    this.videos.set(id, updatedVideo);
    return updatedVideo;
  }

  async deleteVideo(id: number): Promise<boolean> {
    return this.videos.delete(id);
  }
}

import { DatabaseStorage } from "./database-storage";

// Switch between MemStorage and DatabaseStorage based on environment
export const storage = process.env.NODE_ENV === "production" 
  ? new DatabaseStorage() 
  : new MemStorage();
