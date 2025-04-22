
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const LiveSession = () => {
  const [sessionStatus, setSessionStatus] = useState("not-started"); // "not-started", "joining", "in-session", "creating"
  const [sessionData, setSessionData] = useState({
    title: "",
    description: "",
    scheduled: "",
    host: "Current User", // In real app, this would come from auth
    participants: 0
  });
  
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  
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
  
  const createSession = () => {
    if (!sessionData.title || !sessionData.description || !sessionData.scheduled) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setSessionStatus("in-session");
    setIsCreatingSession(false);
    toast({
      title: "Session Created",
      description: "Your live session has been created successfully"
    });
  };
  
  const joinSession = () => {
    setSessionStatus("joining");
    
    setTimeout(() => {
      setSessionStatus("in-session");
    }, 2000);
  };
  
  const leaveSession = () => {
    setSessionStatus("not-started");
    setSessionData({
      title: "",
      description: "",
      scheduled: "",
      host: "Current User",
      participants: 0
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white">Live Mentorship Session</h1>
            {sessionStatus === "not-started" && !isCreatingSession && (
              <Button 
                className="bg-amber-500 text-navy-900 hover:bg-amber-600"
                onClick={() => setIsCreatingSession(true)}
              >
                Create New Session
              </Button>
            )}
          </div>
          
          {isCreatingSession ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Session Title</label>
                    <Input
                      value={sessionData.title}
                      onChange={(e) => setSessionData({...sessionData, title: e.target.value})}
                      placeholder="Enter session title"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Description</label>
                    <Textarea
                      value={sessionData.description}
                      onChange={(e) => setSessionData({...sessionData, description: e.target.value})}
                      placeholder="Enter session description"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Schedule Date & Time</label>
                    <Input
                      type="datetime-local"
                      value={sessionData.scheduled}
                      onChange={(e) => setSessionData({...sessionData, scheduled: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={createSession}>Create Session</Button>
                    <Button variant="outline" onClick={() => setIsCreatingSession(false)}>Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : sessionData.title && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2" /> {sessionData.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{sessionData.description}</p>
                    <div className="space-y-3">
                      <p className="flex items-center">
                        <span className="font-semibold mr-2">Host:</span> {sessionData.host}
                      </p>
                      <p className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="font-semibold mr-2">Scheduled for:</span> 
                        {formatDate(sessionData.scheduled)}
                      </p>
                      <p className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span className="font-semibold mr-2">Participants:</span> 
                        {sessionData.participants}
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
                            (Video streaming implementation required)
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
          )}
          
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
