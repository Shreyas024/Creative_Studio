'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './product.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState('');
  
  const { addToCart } = useCart();
  const { addToWishlist, isAuthenticated } = useAuth();
  const [wishlistStatus, setWishlistStatus] = useState('');
  const [cartStatus, setCartStatus] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product);
        if (res.data.product.images?.length > 0) {
          const primaryIndex = res.data.product.images.findIndex(img => img.isPrimary);
          setActiveImage(primaryIndex !== -1 ? primaryIndex : 0);
        }
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setCartStatus('Added to cart!');
      setTimeout(() => setCartStatus(''), 3000);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      alert('Please log in to add items to your wishlist.');
      return;
    }
    
    try {
      setWishlistStatus('Adding...');
      await addToWishlist(product._id);
      setWishlistStatus('Saved to wishlist!');
      setTimeout(() => setWishlistStatus(''), 3000);
    } catch (err) {
      setWishlistStatus('Failed to save.');
      setTimeout(() => setWishlistStatus(''), 3000);
    }
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading devotional masterpiece...</div>;
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error || 'Product not found'}</h2>
        <Link href="/" className={styles.backLink}>Return to Sanctum</Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link> &gt; 
        <Link href="/collections"> Collections</Link> &gt; 
        {product.category?.name && <><Link href={`/collections/${product.category.slug}`}> {product.category.name}</Link> &gt;</>} 
        <span className={styles.currentCrumb}> {product.name}</span>
      </div>

      <div className={styles.productContainer}>
        {/* Gallery Section */}
        <div className={styles.gallerySection}>
          <div className={styles.mainImageWrapper}>
            <img 
              src={product.images?.[activeImage]?.url || 'https://via.placeholder.com/600'} 
              alt={product.images?.[activeImage]?.alt || product.name} 
              className={styles.mainImage}
            />
          </div>
          
          {product.images?.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  className={`${styles.thumbnailBtn} ${activeImage === idx ? styles.activeThumbnail : ''}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img.url} alt={`View ${idx + 1}`} className={styles.thumbnailImg} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          <div className={styles.brandInfo}>
            {product.artisan?.name ? (
              <span className={styles.artisanName}>Crafted by {product.artisan.name}</span>
            ) : (
              <span className={styles.brandName}>Creative Studios</span>
            )}
            {product.isFeatured && <span className={styles.badge}>FEATURED</span>}
          </div>

          <h1 className={styles.productTitle}>{product.name}</h1>
          
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString()}
            </span>
            <span className={styles.taxInfo}>Inclusive of all taxes</span>
          </div>

          <div className={styles.description}>
            <p>{product.description}</p>
          </div>

          <div className={styles.actionsContainer}>
            <div className={styles.quantitySelector}>
              <span className={styles.quantityLabel}>Quantity</span>
              <div className={styles.quantityControls}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className={styles.qtyBtn}>-</button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className={styles.qtyBtn}>+</button>
              </div>
              <span className={styles.stockInfo}>{product.stock} left in stock</span>
            </div>

            <div className={styles.buttonGroup}>
              <div className={styles.primaryAction}>
                <button 
                  className={`btn btn-primary ${styles.addToCartBtn}`} 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                {cartStatus && <span className={styles.statusMsg}>{cartStatus}</span>}
              </div>

              <div className={styles.secondaryAction}>
                <button 
                  className={`btn btn-outline ${styles.wishlistBtn}`} 
                  onClick={handleAddToWishlist}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Add to Wishlist
                </button>
                {wishlistStatus && <span className={styles.statusMsg}>{wishlistStatus}</span>}
              </div>
            </div>
          </div>

          {/* Collapsible Info Sections (Dummy for now) */}
          <div className={styles.additionalInfo}>
            <div className={styles.infoAccordion}>
              <h3 className={styles.accordionHeader}>Materials & Care</h3>
              <div className={styles.accordionContent}>
                <p>Pure brass and hand-woven silk. Wipe with a dry, soft cloth. Avoid harsh chemicals.</p>
              </div>
            </div>
            <div className={styles.infoAccordion}>
              <h3 className={styles.accordionHeader}>Shipping & Returns</h3>
              <div className={styles.accordionContent}>
                <p>Complimentary shipping on orders over ₹5,000. 7-day return policy for unused items in original packaging.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
