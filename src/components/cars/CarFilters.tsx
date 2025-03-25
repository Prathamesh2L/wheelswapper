
import { useState, useEffect } from "react";
import { FilterOptions } from "@/lib/types";
import { getUniqueCarBrands } from "@/lib/data-service";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CarFiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  className?: string;
}

export default function CarFilters({
  filters,
  setFilters,
  onApplyFilters,
  onResetFilters,
  className,
}: CarFiltersProps) {
  const [carBrands, setCarBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2010, 2024]);
  const [openSections, setOpenSections] = useState({
    brands: true,
    price: true,
    year: true,
    transmission: true,
    fuelType: true,
    condition: true,
  });

  useEffect(() => {
    setCarBrands(getUniqueCarBrands());
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setFilters((prev) => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1],
    }));
  };

  const handleYearChange = (values: number[]) => {
    setYearRange([values[0], values[1]]);
    setFilters((prev) => ({
      ...prev,
      minYear: values[0],
      maxYear: values[1],
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => {
      const brands = prev.brands || [];
      if (brands.includes(brand)) {
        return {
          ...prev,
          brands: brands.filter((b) => b !== brand),
        };
      } else {
        return {
          ...prev,
          brands: [...brands, brand],
        };
      }
    });
  };

  const toggleOption = (category: string, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category as keyof FilterOptions] as string[] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentValues, value],
        };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
    });
    setPriceRange([0, 100000]);
    setYearRange([2010, 2024]);
    onResetFilters();
  };

  return (
    <div className={cn("bg-card rounded-lg shadow-sm p-4", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
          <X size={14} className="mr-2" />
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        {/* Brands Filter */}
        <Collapsible
          open={openSections.brands}
          onOpenChange={() => toggleSection("brands")}
          className="border-b pb-3"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
              <span className="font-medium">Brand</span>
              <ChevronsUpDown size={16} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="grid grid-cols-2 gap-1">
              {carBrands.map((brand) => (
                <Button
                  key={brand}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "justify-start h-8",
                    filters.brands?.includes(brand) && "bg-primary/10 text-primary"
                  )}
                  onClick={() => toggleBrand(brand)}
                >
                  <div className="flex items-center">
                    <div className={cn(
                      "mr-2 h-4 w-4 rounded-sm border flex items-center justify-center",
                      filters.brands?.includes(brand) ? "bg-primary border-primary" : "border-input"
                    )}>
                      {filters.brands?.includes(brand) && <Check size={12} className="text-primary-foreground" />}
                    </div>
                    {brand}
                  </div>
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range Filter */}
        <Collapsible
          open={openSections.price}
          onOpenChange={() => toggleSection("price")}
          className="border-b pb-3"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
              <span className="font-medium">Price Range</span>
              <ChevronsUpDown size={16} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="px-2">
              <Slider
                defaultValue={[0, 100000]}
                min={0}
                max={100000}
                step={5000}
                value={[filters.minPrice || 0, filters.maxPrice || 100000]}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.minPrice || 0}</span>
                <span>${filters.maxPrice || 100000}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Year Range Filter */}
        <Collapsible
          open={openSections.year}
          onOpenChange={() => toggleSection("year")}
          className="border-b pb-3"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
              <span className="font-medium">Year</span>
              <ChevronsUpDown size={16} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="px-2">
              <Slider
                defaultValue={[2010, 2024]}
                min={2000}
                max={2024}
                step={1}
                value={[filters.minYear || 2010, filters.maxYear || 2024]}
                onValueChange={handleYearChange}
                className="mb-6"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{filters.minYear || 2010}</span>
                <span>{filters.maxYear || 2024}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Transmission Filter */}
        <Collapsible
          open={openSections.transmission}
          onOpenChange={() => toggleSection("transmission")}
          className="border-b pb-3"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
              <span className="font-medium">Transmission</span>
              <ChevronsUpDown size={16} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex gap-2">
              {["automatic", "manual"].map((type) => (
                <Badge
                  key={type}
                  variant={
                    filters.transmission?.includes(type) ? "default" : "outline"
                  }
                  className="cursor-pointer capitalize"
                  onClick={() => toggleOption("transmission", type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Fuel Type Filter */}
        <Collapsible
          open={openSections.fuelType}
          onOpenChange={() => toggleSection("fuelType")}
          className="border-b pb-3"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
              <span className="font-medium">Fuel Type</span>
              <ChevronsUpDown size={16} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-2">
              {["gasoline", "diesel", "electric", "hybrid"].map((type) => (
                <Badge
                  key={type}
                  variant={
                    filters.fuelType?.includes(type) ? "default" : "outline"
                  }
                  className="cursor-pointer capitalize"
                  onClick={() => toggleOption("fuelType", type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Condition Filter */}
        <Collapsible
          open={openSections.condition}
          onOpenChange={() => toggleSection("condition")}
          className="pb-3"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
              <span className="font-medium">Condition</span>
              <ChevronsUpDown size={16} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-2">
              {["new", "excellent", "good", "fair", "poor"].map((condition) => (
                <Badge
                  key={condition}
                  variant={
                    filters.condition?.includes(condition) ? "default" : "outline"
                  }
                  className="cursor-pointer capitalize"
                  onClick={() => toggleOption("condition", condition)}
                >
                  {condition}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button onClick={onApplyFilters} className="w-full mt-4">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
