
const stats = [
  {
    value: "500+",
    label: "Alumni",
    description: "Professionals from various domains",
  },
  {
    value: "1,000+",
    label: "Students",
    description: "Actively engaging on the platform",
  },
  {
    value: "200+",
    label: "Mentorships",
    description: "Successful mentoring relationships",
  },
  {
    value: "50+",
    label: "Events",
    description: "Webinars and workshops conducted",
  },
];

const StatisticsSection = () => {
  return (
    <section className="py-16 bg-navy-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Community in Numbers</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A growing network of students and professionals creating impact together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-navy-800 border border-navy-700">
              <div className="text-4xl font-bold text-amber-500 mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
