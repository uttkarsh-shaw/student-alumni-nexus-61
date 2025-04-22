
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumThread from "@/components/ForumThread";

const Forum = () => {
  const [activeTab, setActiveTab] = useState("topics");
  
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

  const recentThreads = [
    {
      title: "How to prepare for a career in AI?",
      description: "I'm a 3rd-year computer science student interested in AI and machine learning. What courses, projects, or certifications would you recommend to prepare for a career in this field?",
      author: "StudentUser1",
      date: "April 20, 2025",
      replies: [
        {
          author: "Dr. Sarah Johnson",
          content: "Focus on strong fundamentals in math (especially linear algebra and calculus), statistics, and programming. I'd recommend Andrew Ng's courses on Coursera as a starting point. Also, try implementing papers from arxiv.org to build your portfolio.",
          date: "April 21, 2025",
          isAlumni: true
        }
      ]
    },
    {
      title: "Internship opportunities in renewable energy",
      description: "I'm looking for summer internship opportunities in the renewable energy sector. Does anyone have connections or recommendations for companies that offer good internship programs?",
      author: "GreenEnergyStudent",
      date: "April 19, 2025",
      replies: []
    },
    {
      title: "Tips for networking as an introvert",
      description: "As an introvert, I find networking events overwhelming. Alumni who are also introverts, how do you approach networking in professional settings?",
      author: "QuietLearner",
      date: "April 18, 2025",
      replies: [
        {
          author: "Michael Chen",
          content: "I'm an introvert too! I find one-on-one coffee meetings much more effective than large networking events. Also, come prepared with specific questions about the person's work - it makes conversation easier.",
          date: "April 19, 2025",
          isAlumni: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Forum</h1>
          
          <Tabs defaultValue="topics" onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="topics">Forum Topics</TabsTrigger>
              <TabsTrigger value="threads">Recent Threads</TabsTrigger>
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
              {recentThreads.map((thread, index) => (
                <ForumThread 
                  key={index}
                  title={thread.title}
                  description={thread.description}
                  author={thread.author}
                  date={thread.date}
                  replies={thread.replies}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
