
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Events = () => {
  const upcomingEvents = [
    {
      title: "Alumni Networking Night",
      date: "May 15, 2025",
      time: "6:00 PM - 8:00 PM",
      description: "Connect with fellow alumni over drinks and appetizers. Share experiences and expand your professional network.",
      location: "Campus Center Ballroom"
    },
    {
      title: "Career Development Workshop",
      date: "May 20, 2025",
      time: "2:00 PM - 4:00 PM",
      description: "Learn about the latest industry trends and enhance your career prospects with expert guidance.",
      location: "Technical Building, Room 305"
    },
    {
      title: "Annual Alumni Reunion",
      date: "June 5, 2025",
      time: "11:00 AM - 5:00 PM",
      description: "Join us for our biggest event of the year! Reconnect with classmates and celebrate your alma mater.",
      location: "University Main Ground"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Events</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4" />
                    {event.time}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
                  <p className="text-sm font-medium text-gray-500">📍 {event.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
