
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Appointment } from "@/lib/types";
import { getAppointmentsByUserId } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { CalendarDays, Check, Clock, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<{
    upcoming: Appointment[];
    past: Appointment[];
  }>({
    upcoming: [],
    past: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Load user's appointments
      const userAppointments = getAppointmentsByUserId(parsedUser.id);
      setAppointments(userAppointments);

      // Filter appointments
      const now = new Date();
      const upcoming = userAppointments.filter(
        (appointment) => new Date(appointment.date) >= now
      );
      const past = userAppointments.filter(
        (appointment) => new Date(appointment.date) < now
      );

      setFilteredAppointments({
        upcoming,
        past,
      });
    }

    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    // This would call an API in a real application
    toast.success(`Appointment status updated to ${newStatus}`);
    
    // Update local state for demo purposes
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus as any };
      }
      return appointment;
    });
    
    setAppointments(updatedAppointments);
    
    // Re-filter appointments
    const now = new Date();
    const upcoming = updatedAppointments.filter(
      (appointment) => new Date(appointment.date) >= now
    );
    const past = updatedAppointments.filter(
      (appointment) => new Date(appointment.date) < now
    );
    
    setFilteredAppointments({
      upcoming,
      past,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-2">
            Manage your car viewing appointments
          </p>
        </div>

        {!user ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Sign In Required</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Please sign in to view and manage your appointments
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button variant="outline" onClick={() => navigate("/register")}>
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming">
                Upcoming ({filteredAppointments.upcoming.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({filteredAppointments.past.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {filteredAppointments.upcoming.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments.upcoming.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row gap-4 p-6">
                          <div className="w-full md:w-1/4">
                            <div className="aspect-video rounded-md overflow-hidden bg-muted">
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center">
                                <CalendarDays size={16} className="mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Date</p>
                                  <p className="font-medium">
                                    {new Date(appointment.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Clock size={16} className="mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Time</p>
                                  <p className="font-medium">
                                    {appointment.time.includes(":") 
                                      ? appointment.time 
                                      : `${appointment.time}:00`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Location</p>
                                  <p className="font-medium">{appointment.car.location}</p>
                                </div>
                              </div>
                            </div>
                            
                            {appointment.notes && (
                              <div className="mb-4">
                                <p className="text-sm text-muted-foreground">Notes</p>
                                <p className="text-sm">{appointment.notes}</p>
                              </div>
                            )}
                            
                            <div className="flex space-x-2">
                              <Button asChild>
                                <Link to={`/car/${appointment.car.id}`}>
                                  View Car
                                </Link>
                              </Button>
                              
                              {appointment.status === "pending" && (
                                <>
                                  <Button 
                                    variant="outline"
                                    className="gap-1"
                                    onClick={() => handleStatusChange(appointment.id, "confirmed")}
                                  >
                                    <Check size={16} />
                                    Confirm
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    className="text-destructive hover:text-destructive gap-1"
                                    onClick={() => handleStatusChange(appointment.id, "cancelled")}
                                  >
                                    <X size={16} />
                                    Cancel
                                  </Button>
                                </>
                              )}
                              
                              {appointment.status === "confirmed" && (
                                <Button 
                                  variant="outline"
                                  className="text-destructive hover:text-destructive gap-1"
                                  onClick={() => handleStatusChange(appointment.id, "cancelled")}
                                >
                                  <X size={16} />
                                  Cancel
                                </Button>
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
                      <CalendarDays className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Upcoming Appointments</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      You don't have any upcoming appointments. Browse cars and schedule a viewing!
                    </p>
                    <Button onClick={() => navigate("/buy")}>
                      Browse Cars
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past">
              {filteredAppointments.past.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments.past.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row gap-4 p-6">
                          <div className="w-full md:w-1/4">
                            <div className="aspect-video rounded-md overflow-hidden bg-muted">
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center">
                                <CalendarDays size={16} className="mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Date</p>
                                  <p className="font-medium">
                                    {new Date(appointment.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Clock size={16} className="mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Time</p>
                                  <p className="font-medium">
                                    {appointment.time.includes(":") 
                                      ? appointment.time 
                                      : `${appointment.time}:00`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Location</p>
                                  <p className="font-medium">{appointment.car.location}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button asChild>
                                <Link to={`/car/${appointment.car.id}`}>
                                  View Car
                                </Link>
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => toast.info("Feature coming soon")}
                              >
                                Schedule Again
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
                      <CalendarDays className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Past Appointments</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      You don't have any past appointments. Your appointment history will appear here.
                    </p>
                    <Button onClick={() => navigate("/buy")}>
                      Browse Cars
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
