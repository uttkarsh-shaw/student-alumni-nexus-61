import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-gradient text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect, Learn & Grow with Alumni Network
            </h1>
            <p className="text-lg mb-8 text-gray-200">
              Bridge the gap between students and alumni through mentorship, 
              knowledge sharing, and professional networking opportunities.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-amber-500 text-navy-900 hover:bg-amber-600" asChild>
                <Link to="/register">Join the Network</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-blue-500 hover:bg-blue-600" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500 rounded-full opacity-10"></div>
              <div className="relative bg-navy-700 rounded-lg shadow-xl p-6 border border-navy-600">
                <div className="bg-navy-800 p-4 rounded mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-navy-900 font-bold">M</div>
                    <div className="ml-3">
                      <h3 className="font-medium">Mentorship</h3>
                      <p className="text-xs text-gray-400">Connect with industry professionals</p>
                    </div>
                  </div>
                  <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-3/4"></div>
                  </div>
                </div>
                
                <div className="bg-navy-800 p-4 rounded mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">F</div>
                    <div className="ml-3">
                      <h3 className="font-medium">Forum Discussions</h3>
                      <p className="text-xs text-gray-400">Share knowledge and insights</p>
                    </div>
                  </div>
                  <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-1/2"></div>
                  </div>
                </div>
                
                <div className="bg-navy-800 p-4 rounded">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">E</div>
                    <div className="ml-3">
                      <h3 className="font-medium">Events & Webinars</h3>
                      <p className="text-xs text-gray-400">Stay updated with industry trends</p>
                    </div>
                  </div>
                  <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
