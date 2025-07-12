import { db } from "./db";
import { products, categories, videos } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(videos);
  await db.delete(products);
  await db.delete(categories);

  // Seed categories
  const categoryData = [
    {
      name: "Roasted Makhana",
      slug: "roasted",
      description: "Premium roasted fox nuts with natural flavors",
      imageUrl: "/api/placeholder/300/200"
    },
    {
      name: "Raw Makhana",
      slug: "raw",
      description: "Fresh, unprocessed fox nuts in their natural form",
      imageUrl: "/api/placeholder/300/200"
    },
    {
      name: "Flavored Makhana",
      slug: "flavored",
      description: "Delicious flavored varieties of roasted makhana",
      imageUrl: "/api/placeholder/300/200"
    },
    {
      name: "Makhana Powder",
      slug: "powder",
      description: "Fine makhana powder for health supplements",
      imageUrl: "/api/placeholder/300/200"
    }
  ];

  await db.insert(categories).values(categoryData);
  console.log("✓ Categories seeded");

  // Seed products
  const productData = [
    {
      name: "Classic Roasted Makhana",
      description: "Premium quality roasted makhana with a perfect crunch. Rich in protein and minerals.",
      category: "roasted",
      flavor: null,
      weight: "100g",
      imageUrl: "/attached_assets/rostedmakhana_1752243656549.png",
      isNew: false,
      isBestseller: true,
      isOrganic: true,
      rating: "4.8",
      reviewCount: 124,
      nutritionalInfo: JSON.stringify({
        protein: "9.7g",
        carbs: "76.9g",
        fat: "0.1g",
        fiber: "14.5g",
        calories: "347"
      }),
      minerals: JSON.stringify([
        "Calcium",
        "Magnesium",
        "Iron",
        "Phosphorus",
        "Potassium"
      ]),
      inStock: true
    },
    {
      name: "Pineapple Flavored Makhana",
      description: "Tropical pineapple flavored roasted makhana for a delightful snacking experience.",
      category: "flavored",
      flavor: "pineapple",
      weight: "100g",
      imageUrl: "/attached_assets/flavours_1752243675544.png",
      isNew: true,
      isBestseller: false,
      isOrganic: true,
      rating: "4.6",
      reviewCount: 89,
      nutritionalInfo: JSON.stringify({
        protein: "9.2g",
        carbs: "78.1g",
        fat: "0.2g",
        fiber: "14.0g",
        calories: "352"
      }),
      minerals: JSON.stringify([
        "Calcium",
        "Magnesium",
        "Iron",
        "Vitamin C"
      ]),
      inStock: true
    },
    {
      name: "Chocolate Flavored Makhana",
      description: "Rich chocolate flavored makhana that combines health with indulgence.",
      category: "flavored",
      flavor: "chocolate",
      weight: "100g",
      imageUrl: "/attached_assets/flavours_1752243675544.png",
      isNew: true,
      isBestseller: false,
      isOrganic: true,
      rating: "4.7",
      reviewCount: 67,
      nutritionalInfo: JSON.stringify({
        protein: "9.5g",
        carbs: "77.3g",
        fat: "0.3g",
        fiber: "13.8g",
        calories: "355"
      }),
      minerals: JSON.stringify([
        "Calcium",
        "Magnesium",
        "Iron",
        "Antioxidants"
      ]),
      inStock: true
    },
    {
      name: "Spicy Chili Makhana",
      description: "Perfectly spiced makhana with a hint of chili for those who love a kick.",
      category: "flavored",
      flavor: "chili",
      weight: "100g",
      imageUrl: "/attached_assets/flavours_1752243675544.png",
      isNew: false,
      isBestseller: true,
      isOrganic: true,
      rating: "4.5",
      reviewCount: 156,
      nutritionalInfo: JSON.stringify({
        protein: "9.8g",
        carbs: "76.2g",
        fat: "0.2g",
        fiber: "15.1g",
        calories: "349"
      }),
      minerals: JSON.stringify([
        "Calcium",
        "Magnesium",
        "Iron",
        "Capsaicin"
      ]),
      inStock: true
    },
    {
      name: "Premium Raw Makhana",
      description: "Fresh, unprocessed makhana in its natural form. Perfect for home roasting.",
      category: "raw",
      flavor: null,
      weight: "250g",
      imageUrl: "/attached_assets/raw_makhana_1752243663105.png",
      isNew: false,
      isBestseller: false,
      isOrganic: true,
      rating: "4.4",
      reviewCount: 98,
      nutritionalInfo: JSON.stringify({
        protein: "9.7g",
        carbs: "76.9g",
        fat: "0.1g",
        fiber: "14.5g",
        calories: "347"
      }),
      minerals: JSON.stringify([
        "Calcium",
        "Magnesium",
        "Iron",
        "Phosphorus",
        "Potassium"
      ]),
      inStock: true
    },
    {
      name: "Makhana Protein Powder",
      description: "Fine makhana powder rich in protein and minerals. Perfect for smoothies and health drinks.",
      category: "powder",
      flavor: null,
      weight: "500g",
      imageUrl: "/attached_assets/powder_1752243668411.png",
      isNew: true,
      isBestseller: false,
      isOrganic: true,
      rating: "4.3",
      reviewCount: 45,
      nutritionalInfo: JSON.stringify({
        protein: "12.5g",
        carbs: "72.1g",
        fat: "0.2g",
        fiber: "16.3g",
        calories: "340"
      }),
      minerals: JSON.stringify([
        "Calcium",
        "Magnesium",
        "Iron",
        "Phosphorus",
        "Potassium",
        "Zinc"
      ]),
      inStock: true
    }
  ];

  await db.insert(products).values(productData);
  console.log("✓ Products seeded");

  // Seed videos
  const videoData = [
    {
      title: "Post-Workout Power Snack",
      description: "Perfect makhana snack for fitness enthusiasts and gym-goers",
      videoUrl: "/attached_assets/video1_1752220611235.mp4",
      thumbnailUrl: "",
      isActive: true,
      displayOrder: 1
    }
  ];

  await db.insert(videos).values(videoData);
  console.log("✓ Videos seeded");

  console.log("🎉 Database seeded successfully!");
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}

export { seedDatabase };