'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import styles from './wishlist.module.css';

export default function WishlistPage() {
  const { isAuthenticated, isLoading: authLoading, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/account/wishlist');
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await api.get('/users/wishlist');
        setWishlistItems(res.data.wishlist);
      } catch (err) {
        setError('Failed to load your wishlist.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated, authLoading, router]);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      setWishlistItems(prev => prev.filter(item => item._id !== productId));
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  const handleMoveToCart = async (product) => {
    addToCart(product, 1);
    await handleRemove(product._id);
  };

  if (authLoading || isLoading) {
    return <div className={styles.loadingContainer}>Accessing your personal sanctum...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Your Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className={styles.emptyContainer}>
          <svg className={styles.emptyIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
          <p className={styles.emptyText}>Save your favorite pieces here to easily find them later.</p>
          <Link href="/collections" className="btn btn-primary">
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {wishlistItems.map((item) => (
            <div key={item._id} className={styles.wishlistCard}>
              <button 
                className={styles.removeBtn} 
                onClick={() => handleRemove(item._id)}
                aria-label="Remove from wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              <div className={styles.imageWrapper}>
                <Link href={`/products/${item.slug}`}>
                  <img 
                    src={item.images?.[0]?.url || 'https://via.placeholder.com/400'} 
                    alt={item.name} 
                    className={styles.productImage} 
                  />
                </Link>
              </div>
              
              <div className={styles.cardInfo}>
                <p className={styles.brand}>{item.artisan?.name || 'Creative Studios'}</p>
                <h3 className={styles.productName}>
                  <Link href={`/products/${item.slug}`}>{item.name}</Link>
                </h3>
                <p className={styles.price}>
                  {item.currency === 'INR' ? '₹' : '$'}{item.price.toLocaleString()}
                </p>
                
                <button 
                  className={`btn btn-primary ${styles.moveToCartBtn}`}
                  onClick={() => handleMoveToCart(item)}
                  disabled={item.stock === 0}
                >
                  {item.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
