
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-navy-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join our community?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Whether you're a student seeking guidance or an alumnus willing to share your experience, 
          we welcome you to be part of our growing network.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" className="bg-navy-900 text-white hover:bg-navy-800" asChild>
            <Link to="/register">Join Now</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white" asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
