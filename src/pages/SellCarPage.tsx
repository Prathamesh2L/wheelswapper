
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { addCar } from "@/lib/data-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Car } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Upload } from "lucide-react";

const carSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title can't exceed 100 characters"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().regex(/^\d{4}$/, "Please enter a valid year (e.g., 2022)"),
  price: z.string().min(1, "Price is required"),
  mileage: z.string().min(1, "Mileage is required"),
  fuelType: z.enum(["gasoline", "diesel", "electric", "hybrid"]),
  transmission: z.enum(["automatic", "manual"]),
  description: z.string().min(30, "Description must be at least 30 characters"),
  condition: z.enum(["new", "excellent", "good", "fair", "poor"]),
  location: z.string().min(1, "Location is required"),
  features: z.array(z.string()).optional(),
});

type CarFormValues = z.infer<typeof carSchema>;

const SellCarPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop",
  ]);
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([
    "Bluetooth", "Navigation System", "Backup Camera"
  ]);

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      title: "",
      brand: "",
      model: "",
      year: new Date().getFullYear().toString(),
      price: "",
      mileage: "",
      fuelType: "gasoline",
      transmission: "automatic",
      description: "",
      condition: "good",
      location: "",
      features: ["Bluetooth", "Navigation System", "Backup Camera"],
    },
  });

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addImageUrl = () => {
    const sampleImages = [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619623829795-219c8b2df26f?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599912027611-484b9fc447af?q=80&w=2000&auto=format&fit=crop",
    ];

    if (imageUrls.length < 5) {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      setImageUrls([...imageUrls, randomImage]);
    } else {
      toast.error("You can only add up to 5 images");
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (featureInput.trim() !== "") {
      if (features.length < 10) {
        setFeatures([...features, featureInput.trim()]);
        setFeatureInput("");
        form.setValue("features", [...features, featureInput.trim()]);
      } else {
        toast.error("You can only add up to 10 features");
      }
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    form.setValue("features", updatedFeatures);
  };

  const onSubmit = (data: CarFormValues) => {
    if (!user) {
      toast.error("Please login to list your car");
      navigate("/login");
      return;
    }

    if (imageUrls.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    try {
      // Prepare car data
      const carData: Omit<Car, "id" | "listed" | "status"> = {
        title: data.title,
        brand: data.brand,
        model: data.model,
        year: parseInt(data.year),
        price: parseInt(data.price),
        mileage: parseInt(data.mileage),
        fuelType: data.fuelType,
        transmission: data.transmission,
        description: data.description,
        features: features,
        images: imageUrls,
        condition: data.condition,
        sellerId: user.id,
        sellerName: user.name,
        sellerPhone: user.phone || undefined,
        location: data.location,
      };

      // Add car
      const newCar = addCar(carData);

      // Show success message
      toast.success("Your car has been listed successfully!");

      // Navigate to car details page
      navigate(`/car/${newCar.id}`);
    } catch (error) {
      toast.error("Failed to list your car. Please try again.");
      console.error("Error listing car:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Sell Your Car</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to list your car for sale
          </p>
        </div>

        {!user && (
          <Alert className="mb-8">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Login required</AlertTitle>
            <AlertDescription>
              Please <a href="/login" className="underline text-primary">log in</a> to list your car for sale. If you don't have an account, you can <a href="/register" className="underline text-primary">register here</a>.
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Luxury Sedan with Premium Features" {...field} />
                        </FormControl>
                        <FormDescription>
                          A concise, descriptive title for your car listing
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="BMW" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="5 Series" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input placeholder="2022" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="45000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mileage</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="15000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transmission" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="gasoline">Gasoline</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Los Angeles, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description & Features</h2>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a detailed description of your car, including its history, any modifications, and why it stands out." 
                          rows={6} 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A comprehensive description helps potential buyers make informed decisions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div>
                    <FormLabel>Features</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-2 py-1"
                        >
                          {feature}
                          <button
                            type="button"
                            className="ml-1 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFeature(index)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a feature (e.g., Leather Seats)"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addFeature();
                          }
                        }}
                      />
                      <Button type="button" onClick={addFeature}>
                        Add
                      </Button>
                    </div>
                    <FormDescription className="mt-2">
                      Add up to 10 key features that highlight your car's selling points
                    </FormDescription>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Images</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative aspect-[4/3] rounded-md overflow-hidden border">
                        <img
                          src={url}
                          alt={`Car image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/90"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {imageUrls.length < 5 && (
                      <button
                        type="button"
                        onClick={addImageUrl}
                        className="aspect-[4/3] flex flex-col items-center justify-center border border-dashed rounded-md bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mb-1" />
                        <span className="text-sm text-muted-foreground">Add Image</span>
                      </button>
                    )}
                  </div>
                  <FormDescription>
                    Add up to 5 high-quality images of your car from different angles
                  </FormDescription>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button type="submit">List My Car</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SellCarPage;
