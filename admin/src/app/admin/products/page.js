'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '@/styles/admin/AdminProducts.module.css';
import api from '@/utils/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error('Failed to delete product', error);
        alert('Error deleting product');
      }
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <div className={styles.topBar}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b' }}>Products</h1>
        <Link href="/admin/products/new" className={styles.addBtn}>
          <Plus size={16} />
          Add New Product
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Feature Image</th>
              <th>Meta Title</th>
              <th>Meta Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="10" className={styles.emptyText} style={{ textAlign: 'center' }}>
                  No products found. Add a new product to get started.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td style={{ fontWeight: '600' }}>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.slug || '-'}</td>
                  <td>
                    <span style={{ 
                      display: 'inline-block', 
                      maxWidth: '150px', 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis' 
                    }}>
                      {product.description || '-'}
                    </span>
                  </td>
                  <td>₹{product.price}</td>
                  <td>{product.stock || 0}</td>
                  <td>
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} className={styles.productImage} />
                    ) : (
                      <span className={styles.emptyText}>No image</span>
                    )}
                  </td>
                  <td><span className={styles.emptyText}>—</span></td>
                  <td><span className={styles.emptyText}>—</span></td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.deleteBtn}`} 
                        onClick={() => handleDelete(product._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
