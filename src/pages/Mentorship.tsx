
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Mentorship = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Mentorship Programs</h1>
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
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mentorship;
