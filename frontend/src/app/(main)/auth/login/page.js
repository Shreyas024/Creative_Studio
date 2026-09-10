'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await login(email, password);
    
    if (!res.success) {
      setError(res.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img 
            src="https://images.unsplash.com/photo-1605335504780-6927d7fc4916?q=80&w=800&auto=format&fit=crop" 
            alt="Artisanal devotion" 
            className={styles.image}
          />
          <div className={styles.imageOverlay}>
            <div className={styles.quoteBox}>
              <p className={styles.quote}>"The purest devotion is expressed through the finest craftsmanship."</p>
              <span className={styles.quoteAuthor}>— Creative Studios</span>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.header}>
              <h1 className={styles.title}>Welcome Back</h1>
              <p className={styles.subtitle}>Enter your details to access your sanctum.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && (
                <div style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <div className={styles.passwordHeader}>
                  <label htmlFor="password" className="form-label" style={{ marginBottom: 0 }}>Password</label>
                  <Link href="/auth/forgot-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary ${styles.submitBtn}`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className={styles.footer}>
              <p className={styles.footerText}>
                New to Creative Studios?{' '}
                <Link href="/auth/register" className={styles.registerLink}>
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
