
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Car, Users, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getFilteredCars } from "@/lib/data-service";
import { Car as CarType } from "@/lib/types";
import CarCard from "@/components/cars/CarCard";

const HomePage = () => {
  const [featuredCars, setFeaturedCars] = useState<CarType[]>([]);

  useEffect(() => {
    // Get 3 recent cars for the featured section
    const cars = getFilteredCars("", {}, "newest").slice(0, 3);
    setFeaturedCars(cars);
  }, []);

  const benefits = [
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "Wide Selection",
      description: "Browse thousands of verified cars from trusted sellers.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Direct Contact",
      description: "Connect directly with sellers without middlemen.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Quick Process",
      description: "Schedule appointments and finalize deals efficiently.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Transactions",
      description: "Feel confident with our secure transaction process.",
    },
  ];

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0 rounded-3xl" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-muted/40 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Find Your Perfect Car Match
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
                Buy and sell cars with confidence. Access thousands of listings from verified sellers across the country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-semibold">
                  <Link to="/buy">
                    Browse Cars <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                  <Link to="/sell">Sell Your Car</Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Luxury car"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Cars</h2>
            <p className="text-muted-foreground mt-1">
              Discover our top picks this week
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/buy">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car, index) => (
            <CarCard 
              key={car.id} 
              car={car} 
              priority={index === 0} 
            />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose WheelSwap</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect car match with our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-sm"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Car?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Join thousands of car enthusiasts and access the best deals in your area.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/buy">Browse Cars</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 font-semibold">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple process makes buying and selling cars easy and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Browse Listings",
              description:
                "Search through verified cars with detailed information and high-quality photos.",
            },
            {
              step: "02",
              title: "Schedule Viewings",
              description:
                "Book appointments with sellers directly through our platform at your convenience.",
            },
            {
              step: "03",
              title: "Close the Deal",
              description:
                "Finalize your purchase with our secure transaction process for peace of mind.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-primary/10 absolute -top-6 left-0">
                {item.step}
              </div>
              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
