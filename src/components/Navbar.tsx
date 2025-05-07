
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center bg-primary w-8 h-8 rounded-lg overflow-hidden transition-transform group-hover:scale-110">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading text-xl font-semibold tracking-tight">
            Social<span className="text-primary">Scribe</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          <ThemeToggle />
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
            Start Free Trial
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border animate-fade-in">
          <nav className="container flex flex-col gap-4 p-6">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button variant="outline" size="sm" className="w-full">Sign In</Button>
            <Button size="sm" className="w-full bg-primary text-white hover:bg-primary/90">Start Free Trial</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
