
import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 bg-secondary/50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl mb-4">
              <Car className="w-6 h-6" />
              <span>WheelSwap</span>
            </Link>
            <p className="text-foreground/70 text-sm">
              The premiere destination for buying and selling premium vehicles with a seamless, transparent experience.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/buy" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Appointments
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Car Buying Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Financing Options
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Vehicle History Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-foreground/70 text-sm">
                123 Car Avenue
              </li>
              <li className="text-foreground/70 text-sm">
                Automotive City, AC 12345
              </li>
              <li className="text-foreground/70 text-sm">
                contact@wheelswap.com
              </li>
              <li className="text-foreground/70 text-sm">
                (123) 456-7890
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-foreground/60 text-sm">
          <p>© {currentYear} WheelSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
