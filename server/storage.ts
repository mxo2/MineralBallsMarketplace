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
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Raw Makhana",
        slug: "raw",
        description: "Natural and unprocessed makhana seeds",
        imageUrl: "https://pixabay.com/get/gea31665ab88990b6761ea75864e378300ca3862c951bff69eefa9079d6367c3039b48aeeaf846ec8489cc3d620183c4a293b7b6da662c34943ab7f7d6b923953_1280.jpg"
      },
      {
        name: "Makhana Powder",
        slug: "powder",
        description: "Fine ground makhana for versatile use",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Flavored Varieties",
        slug: "flavored",
        description: "Delicious flavored makhana varieties",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    categoryData.forEach(cat => this.createCategory(cat));

    // Seed sample videos
    const videoData: InsertVideo[] = [
      {
        title: "Farm to Table: Our Makhana Journey",
        description: "See how we source premium makhana directly from farmers",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        isActive: true,
        displayOrder: 1
      },
      {
        title: "Traditional Roasting Process",
        description: "Discover our authentic roasting techniques passed down through generations",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        isActive: true,
        displayOrder: 2
      },
      {
        title: "Health Benefits Explained",
        description: "Learn about the incredible nutritional value of makhana",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        isActive: true,
        displayOrder: 3
      },
      {
        title: "Customer Stories",
        description: "Hear from our satisfied customers about their makhana experience",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
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
        price: "249",
        category: "roasted",
        weight: "100g",
        imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
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
        price: "269",
        category: "flavored",
        flavor: "chili",
        weight: "100g",
        imageUrl: "https://pixabay.com/get/g4767a44f6177f34b3ee85a68e990da928f7ff4ce843d8f2ff0be71446a4c5bbc8556cba2e4a4700ab9149657f4a93661484f51362dad7eb4d95c3c43a5b52d1b_1280.jpg",
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
        price: "199",
        category: "raw",
        weight: "250g",
        imageUrl: "https://pixabay.com/get/g4f21dfce2c2d10a483fc3bf39e14eca0de20b37a98c8e6398c88235abeea0653db229e889f9e9e4c36faa32d96792ff8bedee0585ba1ce34d7b2d386b64da438_1280.jpg",
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
        price: "299",
        originalPrice: "329",
        category: "flavored",
        flavor: "chocolate",
        weight: "65g",
        imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
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
        price: "279",
        category: "flavored",
        flavor: "pineapple",
        weight: "80g",
        imageUrl: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
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
        price: "349",
        category: "powder",
        weight: "200g",
        imageUrl: "https://pixabay.com/get/g14db28416d8e130f4ae63ced61cb40c92b0245ed4b48273d7ad1bd67391849e3ca779a4836511e59ca914668ce72e1b27bee3379485626d8c2d196b0ef68ec55_1280.jpg",
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
        price: "399",
        originalPrice: "450",
        category: "flavored",
        weight: "300g",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
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
        price: "289",
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

export const storage = new MemStorage();
