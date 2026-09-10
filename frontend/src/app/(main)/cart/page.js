'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './cart.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h1 className={styles.emptyTitle}>Your sanctum is empty</h1>
        <p className={styles.emptyText}>Discover devotional masterpieces to adorn your sacred space.</p>
        <Link href="/collections" className="btn btn-primary">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>
      
      <div className={styles.cartContainer}>
        <div className={styles.itemsSection}>
          {cart.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <div className={styles.itemImageWrapper}>
                <Link href={`/products/${item.slug}`}>
                  <img 
                    src={item.images?.[0]?.url || 'https://via.placeholder.com/150'} 
                    alt={item.name} 
                    className={styles.itemImage} 
                  />
                </Link>
              </div>
              
              <div className={styles.itemDetails}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemName}>
                    <Link href={`/products/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item._id)}
                    aria-label="Remove item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                
                <p className={styles.itemCategory}>{item.category?.name || 'Sanctum Item'}</p>
                
                <div className={styles.itemFooter}>
                  <div className={styles.quantityControls}>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                      className={styles.qtyBtn}
                    >-</button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, Math.min(item.stock || 99, item.quantity + 1))} 
                      className={styles.qtyBtn}
                    >+</button>
                  </div>
                  <div className={styles.itemPrice}>
                    {item.currency === 'INR' ? '₹' : '$'}{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{cartTotal > 5000 ? 'Complimentary' : 'Calculated at checkout'}</span>
            </div>
            
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Estimated Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            
            <button className={`btn btn-primary ${styles.checkoutBtn}`}>
              Proceed to Secure Checkout
            </button>
            
            <div className={styles.secureCheckout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>100% Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
