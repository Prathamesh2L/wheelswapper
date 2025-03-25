import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Car, Appointment } from "@/lib/types";
import { getCarById, formatCurrency, addAppointment } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Check, 
  ChevronLeft, 
  Clock, 
  ExternalLink, 
  MapPin, 
  Phone, 
  Share2, 
  User 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    notes: "",
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    // Get car details
    const carDetails = getCarById(id);
    if (carDetails) {
      setCar(carDetails);
    }
    setLoading(false);

    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [id]);

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }

    if (!car) return;

    try {
      // Create appointment
      const appointment: Omit<Appointment, "id" | "car"> = {
        carId: car.id,
        buyerId: user.id,
        buyerName: user.name,
        sellerId: car.sellerId,
        date: new Date(appointmentDetails.date),
        time: appointmentDetails.time,
        status: "pending",
        notes: appointmentDetails.notes,
      };

      addAppointment(appointment);

      // Show success message
      toast.success("Appointment requested successfully!");
      setShowAppointmentForm(false);
      setAppointmentDetails({
        date: "",
        time: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
      console.error("Error booking appointment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Car Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The car you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/buy")}>Browse Other Cars</Button>
      </div>
    );
  }

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "new":
        return "Brand New";
      case "excellent":
        return "Excellent";
      case "good":
        return "Good";
      case "fair":
        return "Fair";
      case "poor":
        return "Poor";
      default:
        return condition;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "bg-green-100 text-green-800";
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "fair":
        return "bg-yellow-100 text-yellow-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Results
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{car.brand} {car.model} {car.year}</h1>
            <p className="text-muted-foreground">{car.title}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">{formatCurrency(car.price)}</span>
            <Badge 
              variant="outline" 
              className={cn(
                "capitalize ml-2 px-2 py-1", 
                getConditionColor(car.condition)
              )}
            >
              {getConditionLabel(car.condition)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={car.images[selectedImage]}
                alt={`${car.brand} ${car.model}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md bg-gray-100",
                    selectedImage === index && "ring-2 ring-primary"
                  )}
                >
                  <img
                    src={image}
                    alt={`${car.brand} ${car.model} - View ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Details Tabs */}
          <Tabs defaultValue="details" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 bg-card rounded-lg mt-2 border">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Brand</p>
                  <p className="font-medium">{car.brand}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{car.model}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{car.year}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">{car.mileage.toLocaleString()} miles</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium capitalize">{car.transmission}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-medium capitalize">{car.fuelType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <p className="font-medium capitalize">{car.condition}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{car.location}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="p-4 bg-card rounded-lg mt-2 border">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check size={16} className="text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="description" className="p-4 bg-card rounded-lg mt-2 border">
              <p className="whitespace-pre-line">{car.description}</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          {/* Seller Info & Contact */}
          <Card className="mb-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{car.sellerName}</p>
                  <p className="text-sm text-muted-foreground">Seller</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm">
                  <Phone size={16} className="mr-2 text-muted-foreground" />
                  <span>{car.sellerPhone || "Contact through platform"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin size={16} className="mr-2 text-muted-foreground" />
                  <span>{car.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="mr-2 text-muted-foreground" />
                  <span>Listed on {new Date(car.listed).toLocaleDateString()}</span>
                </div>
              </div>
              <Button 
                className="w-full mb-2"
                onClick={() => setShowAppointmentForm(!showAppointmentForm)}
              >
                {showAppointmentForm ? "Cancel" : "Schedule a Viewing"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  window.open(`mailto:contact@wheelswap.com?subject=Inquiry about ${car.brand} ${car.model}&body=Hello, I am interested in the ${car.year} ${car.brand} ${car.model} listed on WheelSwap (ID: ${car.id}). Please provide more information.`);
                }}
              >
                Contact Seller
              </Button>
            </CardContent>
          </Card>

          {/* Appointment Form */}
          <AnimatePresence>
            {showAppointmentForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-4">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Schedule a Viewing</h3>
                    <form onSubmit={handleAppointmentSubmit}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            required
                            min={tomorrowStr}
                            value={appointmentDetails.date}
                            onChange={(e) => setAppointmentDetails({
                              ...appointmentDetails,
                              date: e.target.value,
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Preferred Time</Label>
                          <Select
                            value={appointmentDetails.time}
                            onValueChange={(value) => setAppointmentDetails({
                              ...appointmentDetails,
                              time: value,
                            })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Any specific questions or requirements?"
                            value={appointmentDetails.notes}
                            onChange={(e) => setAppointmentDetails({
                              ...appointmentDetails,
                              notes: e.target.value,
                            })}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Confirm Appointment
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Car Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Specs</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium capitalize">{car.status}</span>
                </li>
                <Separator />
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">{car.year}</span>
                </li>
                <Separator />
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Mileage</span>
                  <span className="font-medium">{car.mileage.toLocaleString()} miles</span>
                </li>
                <Separator />
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Transmission</span>
                  <span className="font-medium capitalize">{car.transmission}</span>
                </li>
                <Separator />
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Type</span>
                  <span className="font-medium capitalize">{car.fuelType}</span>
                </li>
                <Separator />
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Condition</span>
                  <span className="font-medium capitalize">{car.condition}</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => {
                    const shareUrl = window.location.href;
                    const shareText = `Check out this ${car.year} ${car.brand} ${car.model} on WheelSwap!`;
                    
                    if (navigator.share) {
                      navigator.share({
                        title: `${car.year} ${car.brand} ${car.model}`,
                        text: shareText,
                        url: shareUrl,
                      }).catch((error) => console.log('Error sharing', error));
                    } else {
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
