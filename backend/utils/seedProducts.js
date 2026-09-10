require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

const categories = [
  { name: 'Jewellery & Hair', description: 'Exquisite adornments.' },
  { name: 'Furniture & Comfort', description: 'Sacred seating.' },
  { name: 'Pooja Essentials', description: 'Daily devotion items.' },
  { name: 'Home Decor & Festive', description: 'Celebratory decorations.' },
  { name: 'Sanctum Home', description: 'Temple aesthetics.' },
  { name: 'Poshak', description: 'Deity vestments.' },
  { name: 'Bespoke', description: 'Custom creations.' },
  { name: 'Gifts & Sets', description: 'Curated sets.' },
  { name: 'Fragrance', description: 'Sacred scents.' }
];

const products = [
  {
    name: 'Mayura Zardozi Poshak',
    description: 'Hand-embroidered poshak featuring intricate peacock motifs.',
    shortDescription: 'Exquisite Zardozi work on pure silk.',
    price: 12499,
    categoryName: 'Jewellery & Hair',
    images: [{ url: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=400&auto=format&fit=crop', isPrimary: true }],
    stock: 10,
    isFeatured: true,
    artisan: { name: 'Varanasi Atelier', location: 'Varanasi' }
  },
  {
    name: 'Solid Brass Akhand Diya',
    description: 'Heavy brass diya designed for continuous burning.',
    shortDescription: 'Traditional akhand diya.',
    price: 2899,
    categoryName: 'Pooja Essentials',
    images: [{ url: 'https://images.unsplash.com/photo-1514948011270-4f52636222b4?q=80&w=400&auto=format&fit=crop', isPrimary: true }],
    stock: 50,
    isFeatured: true,
    artisan: { name: 'Moradabad Mastersmiths', location: 'Moradabad' }
  },
  {
    name: 'Teakwood Singhasan',
    description: 'Carved teakwood throne for deities.',
    shortDescription: 'Hand-carved wooden singhasan.',
    price: 18500,
    categoryName: 'Furniture & Comfort',
    images: [{ url: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=400&auto=format&fit=crop', isPrimary: true }],
    stock: 5,
    isFeatured: true,
    artisan: { name: 'Jaipur Carvers Guild', location: 'Jaipur' }
  },
  {
    name: 'Kundan Embedded Mukut',
    description: 'Stunning mukut studded with semi-precious kundan stones.',
    shortDescription: 'Kundan deity crown.',
    price: 4299,
    categoryName: 'Jewellery & Hair',
    images: [{ url: 'https://images.unsplash.com/photo-1599643478514-4a52023050b1?q=80&w=400&auto=format&fit=crop', isPrimary: true }],
    stock: 20,
    isFeatured: true,
    artisan: { name: 'Jaipur Jewellers', location: 'Jaipur' }
  },
  {
    name: 'Silver Plated Aarti Thali',
    description: 'Complete aarti set with silver plating.',
    shortDescription: 'Elegant pooja thali set.',
    price: 5500,
    categoryName: 'Pooja Essentials',
    images: [{ url: 'https://images.unsplash.com/photo-1603731114513-58135805561a?q=80&w=400&auto=format&fit=crop', isPrimary: true }],
    stock: 15,
    isFeatured: true,
    artisan: { name: 'Silvercrafters', location: 'Udaipur' }
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing
    await Product.deleteMany();
    await Category.deleteMany();
    console.log('Cleared existing products and categories');

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories seeded');

    // Map category names to ObjectIds
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Insert products
    const productsToInsert = products.map(p => ({
      ...p,
      category: categoryMap[p.categoryName]
    }));

    // Insert products one by one to ensure pre-save hooks run (slug generation)
    for (const p of productsToInsert) {
      await Product.create(p);
    }
    console.log('Products seeded');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
