
import { Link } from "react-router-dom";
import { Car } from "@/lib/types";
import { formatCurrency } from "@/lib/data-service";
import { motion } from "framer-motion";
import { Calendar, IndianRupee, Info, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  const formattedDate = new Date(car.listed).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: priority ? 0 : 0.1 }}
      className="group w-full rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              "px-2 py-1 rounded-md text-xs font-medium",
              getStatusClass(car.status)
            )}
          >
            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium truncate">{car.brand} {car.model}</h3>
          <span className="text-primary font-semibold flex items-center">
            <IndianRupee size={16} className="mr-1" />
            {formatCurrency(car.price).replace('₹', '')}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{car.title}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="font-medium mr-1">{car.year}</span> • {car.mileage.toLocaleString()} mi
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="capitalize">{car.transmission}</span> • {car.fuelType}
          </div>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <MapPin size={14} className="mr-1" />
          <span>{car.location}</span>
          <span className="mx-2">•</span>
          <Calendar size={14} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button asChild className="w-full">
            <Link to={`/car/${car.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
