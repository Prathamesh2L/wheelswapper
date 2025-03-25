
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

export function Layout() {
  useEffect(() => {
    // Smooth scroll to top when navigating between pages
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 py-6 animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
