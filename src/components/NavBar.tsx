
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-navy-900 py-4 px-4 md:px-8 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-navy-900 dark:text-white">
            Alumni<span className="text-amber-500">Nexus</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/forum" className="nav-link">Forum</Link>
          <Link to="/mentorship" className="nav-link">Mentorship</Link>
          <Link to="/events" className="nav-link">Events</Link>
          <Link to="/alumni" className="nav-link">Alumni</Link>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center py-4">
                  <span className="font-bold text-xl text-navy-900 dark:text-white">
                    Alumni<span className="text-amber-500">Nexus</span>
                  </span>
                  <Button variant="ghost" size="icon" onClick={closeMenu}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-4 py-4">
                  <Link to="/" className="nav-link py-2" onClick={closeMenu}>Home</Link>
                  <Link to="/forum" className="nav-link py-2" onClick={closeMenu}>Forum</Link>
                  <Link to="/mentorship" className="nav-link py-2" onClick={closeMenu}>Mentorship</Link>
                  <Link to="/events" className="nav-link py-2" onClick={closeMenu}>Events</Link>
                  <Link to="/alumni" className="nav-link py-2" onClick={closeMenu}>Alumni</Link>
                </div>
                <div className="mt-auto flex flex-col space-y-2 py-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/register" onClick={closeMenu}>Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
