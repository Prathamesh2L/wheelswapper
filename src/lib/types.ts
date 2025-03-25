
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would not be stored in the client
  phone?: string;
  listings?: Car[];
  appointments?: Appointment[];
}

export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid";
  transmission: "automatic" | "manual";
  description: string;
  features: string[];
  images: string[];
  condition: "new" | "excellent" | "good" | "fair" | "poor";
  sellerId: string;
  sellerName: string;
  sellerPhone?: string;
  location: string;
  listed: Date;
  status: "available" | "pending" | "sold";
}

export interface Appointment {
  id: string;
  carId: string;
  car: Car;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

export interface Transaction {
  id: string;
  carId: string;
  car: Car;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  price: number;
  date: Date;
  status: "completed" | "refunded" | "disputed";
}

export type FilterOptions = {
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  transmission?: string[];
  fuelType?: string[];
  condition?: string[];
};
