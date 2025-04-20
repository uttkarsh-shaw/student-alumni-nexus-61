
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Events</h1>
          <div className="bg-white dark:bg-navy-900 rounded-lg shadow-md p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Stay updated with the latest alumni events, webinars, workshops, and networking opportunities.
              Join us to connect with fellow alumni and expand your professional network.
            </p>
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p>Events content will be available soon.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
