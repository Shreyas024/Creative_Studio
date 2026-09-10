'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import styles from './category.module.css';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CategoryPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useAuth();

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        // Fetch category details
        const catRes = await api.get(`/categories/${slug}`);
        const categoryData = catRes.data.category;
        setCategory(categoryData);

        if (categoryData) {
          // Fetch products for this category
          const prodRes = await api.get(`/products?category=${categoryData._id}`);
          setProducts(prodRes.data.products);
        }
      } catch (error) {
        console.error('Failed to fetch category data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchCategoryAndProducts();
    }
  }, [slug]);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const handleWishlistToggle = async (e, product) => {
    e.preventDefault(); // Prevent link click
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent link click
    addToCart(product, 1);
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading sanctum collection...</div>;
  }

  if (!category) {
    return (
      <div className={styles.errorContainer}>
        <h1>Collection Not Found</h1>
        <p>The collection you are looking for does not exist.</p>
        <Link href="/collections" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
          View All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Category Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>{category.name}</h1>
          <p className={styles.description}>{category.description || `Explore our exquisite collection of ${category.name}.`}</p>
        </div>
      </div>

      {/* Filters & Sort (Placeholder for future) */}
      <div className={styles.controlsBar}>
        <span className={styles.productCount}>{products.length} Products found</span>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <p>We are currently curating pieces for this collection.</p>
          <p>Please check back soon.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product.slug || product._id}`} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img 
                  src={product.images && product.images[0] ? product.images[0].url : 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop'} 
                  alt={product.name}
                  className={styles.productImage} 
                />
                <button 
                  className={styles.wishlistBtn} 
                  onClick={(e) => handleWishlistToggle(e, product)}
                  aria-label="Toggle Wishlist"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <div className={styles.quickAdd}>
                  <button 
                    className={styles.quickAddBtn}
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
