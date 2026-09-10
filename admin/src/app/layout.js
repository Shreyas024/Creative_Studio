import { AuthProvider } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import "./globals.css";
import styles from "@/styles/admin/AdminLayout.module.css";

export const metadata = {
  title: "Creative Studios | Admin Dashboard",
  description: "Manage products, categories, orders and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className={styles.adminContainer}>
            <AdminSidebar />
            <div className={styles.mainContent}>
              <AdminHeader />
              <div className={styles.pageContent}>
                {children}
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
