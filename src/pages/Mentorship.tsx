
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Video } from "lucide-react";

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState("programs");
  
  const mentorshipPrograms = [
    {
      title: "Career Guidance Program",
      description: "Get paired with an experienced professional in your field of interest for career guidance and advice.",
      duration: "3 months",
      commitment: "2 hours per week",
      areas: ["Career Planning", "Industry Insights", "Professional Development"]
    },
    {
      title: "Technical Mentorship",
      description: "Learn from industry experts who will guide you through technical challenges and help you grow your skills.",
      duration: "6 months",
      commitment: "4 hours per week",
      areas: ["Technical Skills", "Project Guidance", "Best Practices"]
    },
    {
      title: "Leadership Development",
      description: "Develop your leadership skills with guidance from successful alumni leaders in various industries.",
      duration: "4 months",
      commitment: "3 hours per week",
      areas: ["Leadership Skills", "Team Management", "Strategic Thinking"]
    }
  ];

  const liveSessions = [
    {
      id: "session-1",
      title: "Career Paths in Technology",
      host: "Dr. Sarah Johnson",
      scheduled: "2025-04-23T14:00:00",
      participants: 24,
      description: "Learn about various career paths in the technology sector and how to prepare for them."
    },
    {
      id: "session-2",
      title: "Building Your Professional Network",
      host: "Michael Chen",
      scheduled: "2025-04-25T16:00:00",
      participants: 18,
      description: "Strategies for building and maintaining a professional network that can help advance your career."
    },
    {
      id: "session-3",
      title: "Resume Workshop",
      host: "Priya Patel",
      scheduled: "2025-04-28T15:30:00",
      participants: 32,
      description: "Learn how to create a standout resume that will get you noticed by recruiters."
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Mentorship</h1>
          
          <Tabs defaultValue="programs" onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="programs">Mentorship Programs</TabsTrigger>
              <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="programs">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mentorshipPrograms.map((program, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{program.title}</CardTitle>
                      <CardDescription>Duration: {program.duration}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Time Commitment: {program.commitment}</p>
                        <div className="flex flex-wrap gap-2">
                          {program.areas.map((area, idx) => (
                            <span key={idx} className="bg-gray-100 dark:bg-navy-700 px-2 py-1 rounded-full text-xs">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply for Program</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sessions">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {liveSessions.map((session, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Video className="h-5 w-5 mr-2 text-amber-500" />
                        <CardTitle>{session.title}</CardTitle>
                      </div>
                      <CardDescription>Hosted by {session.host}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{session.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm text-gray-500">{formatDate(session.scheduled)}</p>
                        </div>
                        <p className="text-sm text-gray-500">{session.participants} participants registered</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link to={`/live-session/${session.id}`}>Join Session</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mentorship;
