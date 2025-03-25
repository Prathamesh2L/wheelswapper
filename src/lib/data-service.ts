
import { Car, User, Appointment, Transaction } from "./types";

// Sample car data
const cars: Car[] = [
  {
    id: "car-1",
    title: "Luxury Sedan with Premium Features",
    brand: "BMW",
    model: "5 Series",
    year: 2021,
    price: 45000,
    mileage: 15000,
    fuelType: "gasoline",
    transmission: "automatic",
    description: "This BMW 5 Series is a stunning luxury sedan in excellent condition. It offers a perfect blend of performance, comfort, and technology, making every drive enjoyable. The car features premium leather seats, advanced driver assistance systems, and a state-of-the-art infotainment system.",
    features: ["Leather Seats", "Navigation System", "Sunroof", "Bluetooth", "Backup Camera", "Heated Seats"],
    images: [
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "excellent",
    sellerId: "user-1",
    sellerName: "John Smith",
    sellerPhone: "(555) 123-4567",
    location: "Los Angeles, CA",
    listed: new Date("2023-12-15"),
    status: "available"
  },
  {
    id: "car-2",
    title: "Electric SUV with Long Range",
    brand: "Tesla",
    model: "Model Y",
    year: 2022,
    price: 58000,
    mileage: 8000,
    fuelType: "electric",
    transmission: "automatic",
    description: "This Tesla Model Y is an all-electric SUV with impressive range and performance. It's equipped with Tesla's Autopilot system, making commuting easier. The spacious interior and minimal design create a modern, comfortable space for all passengers.",
    features: ["Autopilot", "All-Wheel Drive", "Glass Roof", "Premium Audio", "Heated Seats", "360-degree cameras"],
    images: [
      "https://images.unsplash.com/photo-1619623829795-219c8b2df26f?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537620618127-55c10b14528a?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "excellent",
    sellerId: "user-2",
    sellerName: "Emily Jones",
    sellerPhone: "(555) 987-6543",
    location: "San Francisco, CA",
    listed: new Date("2024-01-10"),
    status: "available"
  },
  {
    id: "car-3",
    title: "Sporty Coupe with Low Mileage",
    brand: "Porsche",
    model: "911",
    year: 2020,
    price: 95000,
    mileage: 12000,
    fuelType: "gasoline",
    transmission: "automatic",
    description: "This Porsche 911 delivers exhilarating performance with its powerful engine and precise handling. The sleek design turns heads wherever you go, while the premium interior provides comfort during every drive. It's been meticulously maintained and is in excellent condition.",
    features: ["Sport Package", "Leather Interior", "Navigation", "Premium Sound System", "Sport Exhaust", "Carbon Fiber Trim"],
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f371e?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "excellent",
    sellerId: "user-3",
    sellerName: "Michael Brown",
    sellerPhone: "(555) 789-0123",
    location: "Miami, FL",
    listed: new Date("2023-11-05"),
    status: "available"
  },
  {
    id: "car-4",
    title: "Family-Friendly SUV",
    brand: "Toyota",
    model: "Highlander",
    year: 2021,
    price: 38000,
    mileage: 22000,
    fuelType: "hybrid",
    transmission: "automatic",
    description: "This Toyota Highlander Hybrid combines space, efficiency, and reliability. It's perfect for family trips with its spacious interior and comfortable seating for seven. The hybrid powertrain delivers excellent fuel economy without sacrificing performance.",
    features: ["Third Row Seating", "Hybrid Powertrain", "Apple CarPlay", "Android Auto", "Safety Sense Package", "Roof Rails"],
    images: [
      "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "good",
    sellerId: "user-4",
    sellerName: "Sarah Wilson",
    sellerPhone: "(555) 234-5678",
    location: "Chicago, IL",
    listed: new Date("2024-01-20"),
    status: "available"
  },
  {
    id: "car-5",
    title: "Premium Truck with Off-Road Package",
    brand: "Ford",
    model: "F-150 Raptor",
    year: 2022,
    price: 72000,
    mileage: 9000,
    fuelType: "gasoline",
    transmission: "automatic",
    description: "This Ford F-150 Raptor is ready for any adventure, whether on-road or off-road. It features a powerful engine, specialized suspension, and rugged design. The interior provides luxury comfort with durable materials designed to withstand the elements.",
    features: ["Off-Road Package", "Fox Shocks", "All-Terrain Tires", "Terrain Management System", "Premium Sound", "360-degree Camera"],
    images: [
      "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609152840889-3a28d768dd5e?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599912027611-484b9fc447af?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "excellent",
    sellerId: "user-5",
    sellerName: "James Thompson",
    sellerPhone: "(555) 345-6789",
    location: "Dallas, TX",
    listed: new Date("2023-12-28"),
    status: "available"
  },
  {
    id: "car-6",
    title: "Luxury Convertible",
    brand: "Mercedes-Benz",
    model: "E-Class Cabriolet",
    year: 2021,
    price: 68000,
    mileage: 11000,
    fuelType: "gasoline",
    transmission: "automatic",
    description: "This Mercedes-Benz E-Class Cabriolet offers the perfect open-air driving experience. With its elegant design and powerful performance, it combines luxury and excitement. The premium interior features high-quality materials and cutting-edge technology.",
    features: ["Convertible Top", "Heated/Ventilated Seats", "Burmester Sound System", "AIRSCARF", "Driver Assistance Package", "AMG Line Exterior"],
    images: [
      "https://images.unsplash.com/photo-1501066927591-314112b5888e?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525264626954-d57032431ca5?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530197553541-ee21bdebb229?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "excellent",
    sellerId: "user-6",
    sellerName: "Sophia Martinez",
    sellerPhone: "(555) 456-7890",
    location: "San Diego, CA",
    listed: new Date("2023-10-15"),
    status: "available"
  },
  {
    id: "car-7",
    title: "Efficient Compact Car",
    brand: "Honda",
    model: "Civic",
    year: 2022,
    price: 25000,
    mileage: 18000,
    fuelType: "gasoline",
    transmission: "automatic",
    description: "This Honda Civic offers excellent fuel efficiency and reliability in a stylish package. The modern interior includes advanced technology features and comfortable seating. It's perfect for city driving and daily commutes.",
    features: ["Touchscreen Infotainment", "Honda Sensing Suite", "Apple CarPlay", "Android Auto", "Backup Camera", "Keyless Entry"],
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532937522333-68be36e05eda?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1665956346078-f231e9d25ee3?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "good",
    sellerId: "user-7",
    sellerName: "David Johnson",
    sellerPhone: "(555) 567-8901",
    location: "Seattle, WA",
    listed: new Date("2024-01-05"),
    status: "available"
  },
  {
    id: "car-8",
    title: "Rugged Off-Road SUV",
    brand: "Jeep",
    model: "Wrangler",
    year: 2020,
    price: 42000,
    mileage: 28000,
    fuelType: "gasoline",
    transmission: "manual",
    description: "This Jeep Wrangler is built for adventure with its rugged design and off-road capabilities. It features removable doors and roof for an open-air experience. The upgraded suspension and tires make it ready for any terrain.",
    features: ["4x4 System", "Removable Top", "Upgraded Suspension", "Off-Road Tires", "LED Lighting", "Alpine Premium Audio"],
    images: [
      "https://images.unsplash.com/photo-1626096633059-7e871d6b33be?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578384407072-2ef539eb04dc?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572850498425-c0bef17c8499?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "good",
    sellerId: "user-8",
    sellerName: "Robert Davis",
    sellerPhone: "(555) 678-9012",
    location: "Denver, CO",
    listed: new Date("2023-11-20"),
    status: "available"
  },
  {
    id: "car-9",
    title: "Classic Muscle Car",
    brand: "Chevrolet",
    model: "Camaro SS",
    year: 2019,
    price: 39000,
    mileage: 25000,
    fuelType: "gasoline",
    transmission: "manual",
    description: "This Chevrolet Camaro SS delivers classic American muscle car performance with modern technology. The powerful V8 engine and sport-tuned suspension provide an exhilarating driving experience. The aggressive styling makes a bold statement on the road.",
    features: ["V8 Engine", "Sport Suspension", "Brembo Brakes", "Performance Exhaust", "Recaro Seats", "Head-Up Display"],
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594611342073-4bb7683c27ad?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544830281-1d4d8b8f2cd1?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "good",
    sellerId: "user-9",
    sellerName: "Jennifer Miller",
    sellerPhone: "(555) 789-0123",
    location: "Atlanta, GA",
    listed: new Date("2023-09-10"),
    status: "available"
  },
  {
    id: "car-10",
    title: "Luxury Executive Sedan",
    brand: "Audi",
    model: "A8",
    year: 2021,
    price: 82000,
    mileage: 14000,
    fuelType: "gasoline",
    transmission: "automatic",
    description: "This Audi A8 represents the pinnacle of luxury sedan engineering. The interior features premium materials and cutting-edge technology for an exceptional driving experience. The powerful engine and advanced suspension system deliver smooth performance on any road.",
    features: ["Adaptive Air Suspension", "Matrix LED Headlights", "Bang & Olufsen Sound", "Executive Rear Seat Package", "Night Vision Assistant", "Massage Seats"],
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606073668584-bbc78964a285?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518987048-93e29699e79a?q=80&w=2000&auto=format&fit=crop"
    ],
    condition: "excellent",
    sellerId: "user-10",
    sellerName: "William Taylor",
    sellerPhone: "(555) 890-1234",
    location: "Washington, DC",
    listed: new Date("2023-12-05"),
    status: "available"
  }
];

// Sample users
const users: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    phone: "(555) 123-4567"
  },
  {
    id: "user-2",
    name: "Emily Jones",
    email: "emily@example.com",
    password: "password123",
    phone: "(555) 987-6543"
  }
];

// Sample appointments
const appointments: Appointment[] = [
  {
    id: "appointment-1",
    carId: "car-1",
    car: cars.find(car => car.id === "car-1")!,
    buyerId: "user-2",
    buyerName: "Emily Jones",
    sellerId: "user-1",
    date: new Date("2024-03-15"),
    time: "14:00",
    status: "confirmed",
    notes: "Looking forward to seeing the car"
  }
];

// Sample transactions
const transactions: Transaction[] = [
  {
    id: "transaction-1",
    carId: "car-3",
    car: cars.find(car => car.id === "car-3")!,
    buyerId: "user-1",
    buyerName: "John Smith",
    sellerId: "user-3",
    sellerName: "Michael Brown",
    price: 95000,
    date: new Date("2023-12-20"),
    status: "completed"
  }
];

// Simulated data service methods
export const getRecentCars = (limit: number = 6): Car[] => {
  return [...cars]
    .sort((a, b) => b.listed.getTime() - a.listed.getTime())
    .slice(0, limit);
};

export const getCarById = (id: string): Car | undefined => {
  return cars.find(car => car.id === id);
};

export const getAllCars = (): Car[] => {
  return [...cars];
};

export const getFilteredCars = (
  searchTerm: string = "",
  filters: any = {},
  sort: string = "newest"
): Car[] => {
  let filteredCars = [...cars];

  // Apply search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredCars = filteredCars.filter(
      car =>
        car.title.toLowerCase().includes(term) ||
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.description.toLowerCase().includes(term)
    );
  }

  // Apply filters
  if (filters.brands && filters.brands.length > 0) {
    filteredCars = filteredCars.filter(car => filters.brands.includes(car.brand));
  }

  if (filters.minPrice !== undefined) {
    filteredCars = filteredCars.filter(car => car.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice);
  }

  if (filters.minYear !== undefined) {
    filteredCars = filteredCars.filter(car => car.year >= filters.minYear);
  }

  if (filters.maxYear !== undefined) {
    filteredCars = filteredCars.filter(car => car.year <= filters.maxYear);
  }

  if (filters.fuelType && filters.fuelType.length > 0) {
    filteredCars = filteredCars.filter(car => filters.fuelType.includes(car.fuelType));
  }

  if (filters.transmission && filters.transmission.length > 0) {
    filteredCars = filteredCars.filter(car => filters.transmission.includes(car.transmission));
  }

  if (filters.condition && filters.condition.length > 0) {
    filteredCars = filteredCars.filter(car => filters.condition.includes(car.condition));
  }

  // Apply sorting
  switch (sort) {
    case "newest":
      filteredCars.sort((a, b) => b.listed.getTime() - a.listed.getTime());
      break;
    case "oldest":
      filteredCars.sort((a, b) => a.listed.getTime() - b.listed.getTime());
      break;
    case "price-low-high":
      filteredCars.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      filteredCars.sort((a, b) => b.price - a.price);
      break;
    case "mileage-low-high":
      filteredCars.sort((a, b) => a.mileage - b.mileage);
      break;
    case "year-newest":
      filteredCars.sort((a, b) => b.year - a.year);
      break;
    default:
      filteredCars.sort((a, b) => b.listed.getTime() - a.listed.getTime());
  }

  return filteredCars;
};

export const getUniqueCarBrands = (): string[] => {
  return Array.from(new Set(cars.map(car => car.brand))).sort();
};

export const getAppointmentsByUserId = (userId: string): Appointment[] => {
  return appointments.filter(
    appointment => appointment.buyerId === userId || appointment.sellerId === userId
  );
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getTransactionsByUserId = (userId: string): Transaction[] => {
  return transactions.filter(
    transaction => transaction.buyerId === userId || transaction.sellerId === userId
  );
};

// Auth methods
export const loginUser = (email: string, password: string): User | null => {
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    // In a real app, you would set cookies/tokens here
    localStorage.setItem("user", JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    return user;
  }
  return null;
};

export const registerUser = (name: string, email: string, password: string): User | null => {
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return null;
  }

  // Create new user
  const newId = `user-${users.length + 1}`;
  const newUser: User = {
    id: newId,
    name,
    email,
    password, // In a real app, this would be hashed
  };

  // Add to users array (in a real app, this would be saved to a database)
  users.push(newUser);

  // Set local storage
  localStorage.setItem("user", JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }));

  return newUser;
};

export const logoutUser = (): void => {
  localStorage.removeItem("user");
};

// Mock API Functions (these would call actual APIs in a real app)
export const addCar = (car: Omit<Car, "id" | "listed" | "status">): Car => {
  const newCar: Car = {
    ...car,
    id: `car-${cars.length + 1}`,
    listed: new Date(),
    status: "available",
  };

  cars.push(newCar);
  return newCar;
};

export const updateCar = (car: Car): Car => {
  const index = cars.findIndex(c => c.id === car.id);
  if (index !== -1) {
    cars[index] = car;
    return car;
  }
  throw new Error("Car not found");
};

export const deleteCar = (id: string): boolean => {
  const index = cars.findIndex(c => c.id === id);
  if (index !== -1) {
    cars.splice(index, 1);
    return true;
  }
  return false;
};

export const addAppointment = (appointment: Omit<Appointment, "id" | "car">): Appointment => {
  const car = getCarById(appointment.carId);
  if (!car) {
    throw new Error("Car not found");
  }

  const newAppointment: Appointment = {
    ...appointment,
    id: `appointment-${appointments.length + 1}`,
    car,
  };

  appointments.push(newAppointment);
  return newAppointment;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
