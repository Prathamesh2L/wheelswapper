
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Car, LogIn, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Check if user is logged in (this would be replaced with actual auth logic)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Buy Cars", path: "/buy" },
    { name: "Sell Your Car", path: "/sell" },
    { name: "Appointments", path: "/appointments" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary font-bold text-xl"
          >
            <Car className="w-6 h-6" />
            <span>WheelSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-base font-medium transition-colors relative py-1",
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="ghost" className="gap-2">
                  <User size={18} />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="gap-2">
                  <LogIn size={18} />
                  Sign In
                </Button>
              </Link>
            )}
            <Link to={user ? "/sell" : "/register"}>
              <Button>{user ? "Sell Your Car" : "Register"}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-in-top">
          <div className="bg-white shadow-lg rounded-b-lg m-2 p-4 glass-morphism">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-base font-medium p-2 rounded-md transition-colors",
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-secondary hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-border">
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="ghost" className="w-full justify-start gap-2 mb-2">
                        <User size={18} />
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/sell">
                      <Button className="w-full">Sell Your Car</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" className="w-full justify-start gap-2 mb-2">
                        <LogIn size={18} />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full">Register</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
