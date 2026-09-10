'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Folder, 
  Tag, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import styles from '@/styles/admin/AdminLayout.module.css';

const navigation = [
  {
    group: 'DASHBOARD',
    items: [
      { name: 'Overview', href: '/admin', icon: LayoutDashboard }
    ]
  },
  {
    group: 'POSTS',
    items: [
      { name: 'Posts', href: '/admin/posts', icon: FileText },
      { name: 'Post Categories', href: '/admin/post-categories', icon: Folder },
      { name: 'Post Tags', href: '/admin/post-tags', icon: Tag },
    ]
  },
  {
    group: 'PRODUCTS',
    items: [
      { name: 'Products', href: '/admin/products', icon: Package },
      { name: 'Product Categories', href: '/admin/product-categories', icon: Layers },
    ]
  },
  {
    group: 'ORDERS',
    items: [
      { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
      { name: 'Customers', href: '/admin/customers', icon: Users },
    ]
  },
  {
    group: 'SETTINGS',
    items: [
      { name: 'Terms and Condition', href: '/admin/terms', icon: ShieldCheck },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoIcon}>CW</div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>Client Website</span>
          <span className={styles.logoSubtitle}>Admin Panel</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navigation.map((group, i) => (
          <div key={i} className={styles.navGroup}>
            <div className={styles.groupTitle}>{group.group}</div>
            {group.items.map((item, j) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              
              // For overview to not match every sub-route, exact match needed.
              const isExactActive = item.href === '/admin' ? pathname === '/admin' : isActive;

              return (
                <Link 
                  key={j} 
                  href={item.href}
                  className={`${styles.navItem} ${isExactActive ? styles.active : ''}`}
                >
                  <Icon className={styles.navIcon} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
