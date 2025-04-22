
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ForumThread from "@/components/ForumThread";
import { toast } from "@/hooks/use-toast";

const Forum = () => {
  const [activeTab, setActiveTab] = useState("topics");
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const [newThread, setNewThread] = useState({
    title: "",
    description: "",
  });
  
  const [threads, setThreads] = useState([
    // Initial empty state - threads will be added dynamically
  ]);

  const forumTopics = [
    {
      title: "Career Advice",
      description: "Discuss career paths, job opportunities, and professional development strategies.",
      posts: 156,
      lastActive: "2 hours ago"
    },
    {
      title: "Technical Discussions",
      description: "Share knowledge about the latest technologies, coding practices, and technical challenges.",
      posts: 243,
      lastActive: "1 hour ago"
    },
    {
      title: "Campus Life",
      description: "Connect with current students and share experiences about campus life and activities.",
      posts: 89,
      lastActive: "30 minutes ago"
    },
    {
      title: "Alumni Network",
      description: "Network with fellow alumni, share success stories, and discuss industry trends.",
      posts: 178,
      lastActive: "45 minutes ago"
    }
  ];

  const createNewThread = () => {
    if (!newThread.title || !newThread.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const thread = {
      title: newThread.title,
      description: newThread.description,
      author: "Current User", // In real app, this would come from auth
      date: new Date().toLocaleDateString(),
      replies: []
    };

    setThreads([thread, ...threads]);
    setNewThread({ title: "", description: "" });
    setIsCreatingThread(false);
    toast({
      title: "Thread Created",
      description: "Your discussion thread has been created successfully"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white">Forum</h1>
            {activeTab === "threads" && !isCreatingThread && (
              <Button onClick={() => setIsCreatingThread(true)}>
                Create New Thread
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="topics" onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="topics">Forum Topics</TabsTrigger>
              <TabsTrigger value="threads">Discussion Threads</TabsTrigger>
            </TabsList>
            
            <TabsContent value="topics">
              <div className="grid gap-6 md:grid-cols-2">
                {forumTopics.map((topic, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle>{topic.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{topic.description}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{topic.posts} posts</span>
                        <span>Last active: {topic.lastActive}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="threads">
              {isCreatingThread ? (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Create New Thread</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2">Thread Title</label>
                        <Input
                          value={newThread.title}
                          onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                          placeholder="Enter thread title"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Description</label>
                        <Textarea
                          value={newThread.description}
                          onChange={(e) => setNewThread({...newThread, description: e.target.value})}
                          placeholder="Enter thread description"
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={createNewThread}>Create Thread</Button>
                        <Button variant="outline" onClick={() => setIsCreatingThread(false)}>Cancel</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {threads.map((thread, index) => (
                <ForumThread 
                  key={index}
                  title={thread.title}
                  description={thread.description}
                  author={thread.author}
                  date={thread.date}
                  replies={thread.replies}
                />
              ))}

              {threads.length === 0 && !isCreatingThread && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500 mb-4">No discussion threads yet</p>
                    <Button onClick={() => setIsCreatingThread(true)}>
                      Start a New Discussion
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
