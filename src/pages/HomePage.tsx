
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, FilterOptions } from "@/lib/types";
import { getRecentCars, getUniqueCarBrands } from "@/lib/data-service";
import CarCard from "@/components/cars/CarCard";
import { ArrowRight, Car as CarIcon, Search } from "lucide-react";

const HomePage = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get featured cars
    const cars = getRecentCars(6);
    setFeaturedCars(cars);

    // Get unique brands for search suggestions
    setBrands(getUniqueCarBrands());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/buy?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl overflow-hidden">
          <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                  Find Your Perfect Car With Ease
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  Browse our curated selection of premium vehicles or list your own car for sale on our trusted platform.
                </p>

                <form onSubmit={handleSearch} className="relative mb-8">
                  <Input
                    type="text"
                    placeholder="Search by brand, model, or keywords..."
                    className="w-full pr-12 h-12 rounded-lg border-input focus:ring-2 focus:ring-primary/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    className="absolute right-1.5 top-1.5"
                  >
                    <Search size={18} />
                  </Button>
                </form>

                <div className="flex flex-wrap gap-2 mb-6">
                  {brands.slice(0, 5).map((brand) => (
                    <Button
                      key={brand}
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/buy?brand=${brand}`)}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/buy')}
                    className="flex-1"
                  >
                    Browse Cars
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => navigate('/sell')}
                    className="flex-1"
                  >
                    Sell Your Car
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative hidden md:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop"
                  alt="Featured Car"
                  className="rounded-lg shadow-2xl object-cover aspect-[4/3] w-full"
                />
                <div className="absolute inset-0 rounded-lg shadow-inner bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Cars</h2>
            <Button 
              variant="ghost"
              onClick={() => navigate('/buy')}
              className="group"
            >
              View All
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car, index) => (
              <CarCard key={car.id} car={car} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose WheelSwap</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're dedicated to providing a premium car buying and selling experience that puts your needs first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CarIcon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-muted-foreground">
                Every vehicle on our platform is vetted for quality and value, ensuring you find only the best options.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Stress-Free Process</h3>
              <p className="text-muted-foreground">
                Our streamlined approach makes buying or selling a car simple, transparent, and enjoyable.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Every interaction and transaction on our platform is protected with bank-level security for peace of mind.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Next Car?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have found their perfect vehicle through WheelSwap.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/buy')}
            >
              Browse Cars
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
