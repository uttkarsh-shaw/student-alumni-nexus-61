
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Alumni = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Alumni Directory</h1>
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-md p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Browse our directory of alumni to connect with graduates from your program or industry.
              Networking with alumni can open doors to new opportunities and insights.
            </p>
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p>Alumni directory will be available soon.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Alumni;
