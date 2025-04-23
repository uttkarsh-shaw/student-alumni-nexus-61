
import { useState, useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ZEGOCLOUD_APP_ID = 183763345;

const LiveSession = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [sessionStatus, setSessionStatus] = useState("not-started"); // "not-started", "joining", "in-session", "creating"
  const [sessionData, setSessionData] = useState({
    title: "",
    description: "",
    scheduled: "",
    host: "Current User", // In real app, this would come from auth
    participants: 0
  });
  const [user, setUser] = useState<any>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  useEffect(() => {
    if (sessionStatus === "in-session") {
      joinVideoRoom();
    }
    // Clean up video room on leave
    return () => {
      if ((window as any).zegoClient) {
        (window as any).zegoClient.logoutRoom?.();
        (window as any).zegoClient = undefined;
      }
    };
    // eslint-disable-next-line
  }, [sessionStatus]);

  // Util: Load the ZEGOCLOUD SDK if not yet on page
  const loadZegoSdk = () => {
    return new Promise<void>((resolve, reject) => {
      if ((window as any).ZegoUIKitPrebuilt) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://zegocloud.github.io/zego_uikit_prebuilt/external/index.js";
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  // For demo only: Token generation here is NOT secure, should be by backend in production.
  function generateKitToken(roomId: string, userId: string, userName: string) {
    // For demo, use token generation provided in SDK (not secure for production!)
    // https://github.com/ZEGOCLOUD/zego_uikit_prebuilt_call_example_web/blob/main/token.js
    // This is a huge security risk, should use Supabase Edge Function for real.
    // Here we just construct a "fake" token for the frontend demo.
    if (!(window as any).ZegoUIKitPrebuilt) return "";
    return (window as any).ZegoUIKitPrebuilt.generateKitTokenForTest(
      ZEGOCLOUD_APP_ID,
      "730df798fa9af6cc31817125f4161804", // NOT SECURE, move to backend in prod!
      roomId,
      userId,
      userName
    );
  }

  // Actually connect to ZegoCloud and show video view
  const joinVideoRoom = async () => {
    await loadZegoSdk();
    const roomId = sessionId || "demo-room";
    const uid = user?.id?.substring(0, 8) || `User${Math.random().toString().substr(2, 6)}`;
    const uname = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || uid;

    const kitToken = generateKitToken(roomId, uid, uname);

    if (!(window as any).ZegoUIKitPrebuilt || !videoContainerRef.current || !kitToken) return;
    const zp = (window as any).ZegoUIKitPrebuilt.create(videoContainerRef.current, {
      appId: ZEGOCLOUD_APP_ID,
      kitToken,
      userID: uid,
      userName: uname,
      scenario: { mode: "GroupCall" },
      // Optionally add hooks here: onJoinRoom, onLeaveRoom, etc.
    });
    (window as any).zegoClient = zp;
    zp.joinRoom();
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

  // Demo: When creating, just start the session and go live with current user as host
  const createSession = () => {
    if (!sessionData.title || !sessionData.description || !sessionData.scheduled) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setSessionData({...sessionData, host: user?.user_metadata?.full_name || user?.email || "Current User", participants: 1 });
    setSessionStatus("in-session");
    setIsCreatingSession(false);
    toast({
      title: "Session Created",
      description: "Your live session has been created. Others can now join!"
    });
  };

  // Demo: Simply change status to simulate joining
  const joinSession = () => {
    setSessionStatus("joining");
    setTimeout(() => {
      setSessionStatus("in-session");
    }, 800);
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
    if ((window as any).zegoClient) {
      (window as any).zegoClient.destroy();
      (window as any).zegoClient = undefined;
    }
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
                      <div ref={videoContainerRef} className="aspect-video rounded-lg flex items-center justify-center bg-navy-900" />
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
