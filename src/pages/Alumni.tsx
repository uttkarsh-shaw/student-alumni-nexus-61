
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Alumni = () => {
  const alumni = [
    {
      name: "Dr. Sarah Johnson",
      graduation: "2020",
      field: "Computer Science",
      currentRole: "Senior Software Engineer at Google",
      achievement: "Led the development of a major ML platform"
    },
    {
      name: "Michael Chen",
      graduation: "2019",
      field: "Mechanical Engineering",
      currentRole: "Research Scientist at Tesla",
      achievement: "Patent holder for innovative battery technology"
    },
    {
      name: "Priya Patel",
      graduation: "2021",
      field: "Electrical Engineering",
      currentRole: "Project Manager at Microsoft",
      achievement: "Youngest team lead in department history"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Notable Alumni</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {alumni.map((alumnus, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{alumnus.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Class of {alumnus.graduation}</p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">{alumnus.field}</p>
                    <p className="text-gray-600 dark:text-gray-400">{alumnus.currentRole}</p>
                    <p className="text-sm text-gray-500 italic">{alumnus.achievement}</p>
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

export default Alumni;
