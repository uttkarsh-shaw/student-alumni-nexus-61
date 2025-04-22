
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Users } from "lucide-react";

const LiveSession = () => {
  const [sessionStatus, setSessionStatus] = useState("not-started"); // "not-started", "joining", "in-session"
  
  // In a real implementation, we would connect to Agora SDK here
  // This is a simplified version for demonstration
  
  const mockLiveSession = {
    title: "Career Paths in Technology",
    host: "Dr. Sarah Johnson",
    scheduled: "2025-04-23T14:00:00",
    participants: 24,
    description: "Learn about various career paths in the technology sector and how to prepare for them. Dr. Johnson will share insights from her 15 years of industry experience."
  };
  
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
  
  const joinSession = () => {
    setSessionStatus("joining");
    
    // Simulate connection delay
    setTimeout(() => {
      setSessionStatus("in-session");
    }, 2000);
  };
  
  const leaveSession = () => {
    setSessionStatus("not-started");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Live Mentorship Session</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2" /> {mockLiveSession.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{mockLiveSession.description}</p>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">Host:</span> {mockLiveSession.host}
                    </p>
                    <p className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span className="font-semibold mr-2">Scheduled for:</span> 
                      {formatDate(mockLiveSession.scheduled)}
                    </p>
                    <p className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span className="font-semibold mr-2">Participants:</span> 
                      {mockLiveSession.participants}
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    {sessionStatus === "not-started" && (
                      <Button 
                        size="lg" 
                        className="bg-amber-500 text-navy-900 hover:bg-amber-600"
                        onClick={joinSession}
                      >
                        Join Session
                      </Button>
                    )}
                    
                    {sessionStatus === "joining" && (
                      <Button size="lg" disabled>
                        Connecting...
                      </Button>
                    )}
                    
                    {sessionStatus === "in-session" && (
                      <Button 
                        size="lg" 
                        variant="destructive"
                        onClick={leaveSession}
                      >
                        Leave Session
                      </Button>
                    )}
                  </div>
                </div>
                
                <div>
                  {sessionStatus === "in-session" ? (
                    <div className="aspect-video bg-navy-900 rounded-lg flex items-center justify-center">
                      <p className="text-white text-center">
                        Live Session in Progress<br/>
                        <span className="text-sm text-gray-400">
                          (Actual video would appear here with Agora SDK integration)
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="aspect-video bg-navy-800 rounded-lg flex items-center justify-center">
                      <p className="text-white text-center">Session preview unavailable<br/>Join to participate</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {sessionStatus === "in-session" && (
            <Card>
              <CardHeader>
                <CardTitle>Session Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-navy-700 p-4 rounded-lg h-64 overflow-y-auto mb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Chat messages will appear here.
                  </div>
                </div>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-grow p-2 border rounded-l-md"
                    disabled={sessionStatus !== "in-session"}
                  />
                  <Button className="rounded-l-none">Send</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveSession;
