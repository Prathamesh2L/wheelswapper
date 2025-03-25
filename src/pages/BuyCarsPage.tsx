
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Car, FilterOptions } from "@/lib/types";
import { getFilteredCars } from "@/lib/data-service";
import CarCard from "@/components/cars/CarCard";
import CarFilters from "@/components/cars/CarFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const BuyCarsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
  });
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    // Extract search params from URL
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    const brandParam = params.get("brand");

    if (searchParam) {
      setSearchTerm(searchParam);
    }

    if (brandParam) {
      setFilters((prev) => ({
        ...prev,
        brands: [brandParam],
      }));
      setFiltersApplied(true);
    }

    // Apply filters
    const filteredCars = getFilteredCars(searchParam || "", {
      ...filters,
      brands: brandParam ? [brandParam] : filters.brands,
    }, sortOption);
    setCars(filteredCars);
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    const filteredCars = getFilteredCars(searchTerm, filters, sortOption);
    setCars(filteredCars);
    setFiltersApplied(true);
    setIsFiltersOpen(false);

    // Update URL with search term
    if (searchTerm) {
      navigate(`/buy?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/buy");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      brands: [],
    });
    setSortOption("newest");
    setFiltersApplied(false);
    
    const allCars = getFilteredCars("", {}, "newest");
    setCars(allCars);
    
    navigate("/buy");
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const filteredCars = getFilteredCars(searchTerm, filters, value);
    setCars(filteredCars);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Browse Available Cars</h1>
          <p className="text-muted-foreground mt-2">
            Find your perfect car from our curated selection of premium vehicles
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Input
              type="text"
              placeholder="Search cars by brand, model, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search size={18} />
            </Button>
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilters}
              className="md:hidden"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </Button>

            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="mileage-low-high">Mileage: Low to High</SelectItem>
                <SelectItem value="year-newest">Year: Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtersApplied && (
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">
              {cars.length} {cars.length === 1 ? "result" : "results"} found
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 text-muted-foreground hover:text-foreground"
            >
              <X size={14} className="mr-1" />
              Clear filters
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <CarFilters
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={applyFilters}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Filters - Mobile */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
              >
                <motion.div
                  className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-background shadow-xl"
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                >
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Filters</h3>
                    <Button variant="ghost" size="icon" onClick={toggleFilters}>
                      <X size={18} />
                    </Button>
                  </div>
                  <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto">
                    <CarFilters
                      filters={filters}
                      setFilters={setFilters}
                      onApplyFilters={applyFilters}
                      onResetFilters={resetFilters}
                      className="shadow-none p-0"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Car Results */}
          <div className="md:col-span-3">
            {cars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-xl font-medium mb-2">No cars found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or browse all available cars.
                </p>
                <Button onClick={resetFilters}>View All Cars</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCarsPage;
