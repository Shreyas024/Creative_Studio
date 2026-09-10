import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata = {
  title: "Creative Studios | Devotional Atelier",
  description: "Meticulously handcrafted deity poshaks, pure brass sanctuary urlis, and sanctified festival heirlooms designed to enrich devotional living with quiet luxury.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />
        <Header />
        <CategoryNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
