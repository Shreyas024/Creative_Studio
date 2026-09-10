'use client';

import { usePathname } from 'next/navigation';
import { Moon, LogOut } from 'lucide-react';
import styles from '@/styles/admin/AdminLayout.module.css';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  // Simple breadcrumb logic based on path
  const pathParts = pathname.split('/').filter(Boolean);
  const pageTitle = pathParts[pathParts.length - 1] || 'Dashboard';
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).replace('-', ' ');

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <span>Client Website — Admin Panel</span>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <span className={styles.breadcrumbActive}>
          {pathParts.length > 1 ? formattedTitle : 'Overview'}
        </span>
      </div>

      <div className={styles.headerRight}>
        <button className={styles.themeToggle}>
          <Moon size={16} />
          Dark
        </button>

        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.name || 'Admin User'}</p>
            <p className={styles.userRole}>{user?.role === 'admin' ? 'SUPER ADMIN' : 'ADMIN'}</p>
            <p className={styles.userEmail}>{user?.email || 'admin@developerbox.work'}</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn} title="Log Out">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
