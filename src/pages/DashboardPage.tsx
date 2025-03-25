
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, Appointment, Transaction } from "@/lib/types";
import { getFilteredCars, getAppointmentsByUserId, getTransactionsByUserId, formatCurrency, logoutUser } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Car as CarIcon, Calendar, History, LogOut, Plus, User } from "lucide-react";
import { motion } from "framer-motion";
import CarCard from "@/components/cars/CarCard";
import { cn } from "@/lib/utils";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Load user's cars, appointments, and transactions
    const userCars = getFilteredCars("", { sellerId: parsedUser.id });
    setUserCars(userCars);

    const userAppointments = getAppointmentsByUserId(parsedUser.id);
    setAppointments(userAppointments);

    const userTransactions = getTransactionsByUserId(parsedUser.id);
    setTransactions(userTransactions);

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">You're not logged in</h2>
        <p className="text-muted-foreground mb-8">
          Please log in to access your dashboard
        </p>
        <Button onClick={() => navigate("/login")}>Log in</Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
      case "disputed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}!
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/sell")} className="gap-2">
              <Plus size={16} />
              Sell a Car
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut size={16} />
              Log Out
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <CarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">My Listings</p>
                  <p className="text-2xl font-bold">{userCars.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Appointments</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <History className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">{transactions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            {userCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCars.map((car) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center justify-center"
                >
                  <Card className="w-full h-full flex flex-col items-center justify-center p-6 border-dashed">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">List a New Car</h3>
                      <p className="text-muted-foreground mb-4">
                        Ready to sell another vehicle?
                      </p>
                      <Button onClick={() => navigate("/sell")}>
                        Sell Your Car
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CarIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Cars Listed Yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You haven't listed any cars for sale yet. Start selling your vehicle today!
                  </p>
                  <Button onClick={() => navigate("/sell")}>
                    List Your First Car
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="appointments">
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row gap-4 p-6">
                        <div className="w-full md:w-1/4">
                          <div className="aspect-[4/3] rounded-md overflow-hidden bg-muted">
                            <img
                              src={appointment.car.images[0]}
                              alt={`${appointment.car.brand} ${appointment.car.model}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-medium">
                                {appointment.car.brand} {appointment.car.model}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {appointment.car.year} • {appointment.car.mileage.toLocaleString()} miles
                              </p>
                            </div>
                            <Badge 
                              className={cn(
                                "capitalize", 
                                getStatusColor(appointment.status)
                              )}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Date</p>
                              <p className="font-medium">
                                {new Date(appointment.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Time</p>
                              <p className="font-medium">
                                {appointment.time.includes(":") 
                                  ? appointment.time 
                                  : `${appointment.time}:00`}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {user.id === appointment.sellerId ? "Buyer" : "Seller"}
                              </p>
                              <p className="font-medium">
                                {user.id === appointment.sellerId 
                                  ? appointment.buyerName 
                                  : appointment.car.sellerName}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Location</p>
                              <p className="font-medium">{appointment.car.location}</p>
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <div className="mb-4">
                              <p className="text-sm text-muted-foreground">Notes</p>
                              <p className="text-sm">{appointment.notes}</p>
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            <Button size="sm" asChild>
                              <Link to={`/car/${appointment.car.id}`}>
                                View Car
                              </Link>
                            </Button>
                            {appointment.status === "pending" && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => toast.info("Coming soon! This feature is under development.")}
                                >
                                  {user.id === appointment.sellerId 
                                    ? "Confirm" 
                                    : "Reschedule"}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => toast.info("Coming soon! This feature is under development.")}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Appointments</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You don't have any scheduled appointments yet. Browse cars and request a viewing!
                  </p>
                  <Button onClick={() => navigate("/buy")}>
                    Browse Cars
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row gap-4 p-6">
                        <div className="w-full md:w-1/4">
                          <div className="aspect-[4/3] rounded-md overflow-hidden bg-muted">
                            <img
                              src={transaction.car.images[0]}
                              alt={`${transaction.car.brand} ${transaction.car.model}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-medium">
                                {transaction.car.brand} {transaction.car.model}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {transaction.car.year} • {transaction.car.mileage.toLocaleString()} miles
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-primary">
                                {formatCurrency(transaction.price)}
                              </p>
                              <Badge 
                                className={cn(
                                  "capitalize mt-1", 
                                  getStatusColor(transaction.status)
                                )}
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Transaction Date</p>
                              <p className="font-medium">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {user.id === transaction.sellerId ? "Sold To" : "Purchased From"}
                              </p>
                              <p className="font-medium">
                                {user.id === transaction.sellerId 
                                  ? transaction.buyerName 
                                  : transaction.sellerName}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" asChild>
                              <Link to={`/car/${transaction.car.id}`}>
                                View Car
                              </Link>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toast.info("Coming soon! This feature is under development.")}
                            >
                              Transaction Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <History className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Transaction History</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You haven't completed any transactions yet. Browse cars to find your next vehicle!
                  </p>
                  <Button onClick={() => navigate("/buy")}>
                    Browse Cars
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
