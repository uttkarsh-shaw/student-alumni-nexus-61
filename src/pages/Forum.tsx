
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Forum = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Forum</h1>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
