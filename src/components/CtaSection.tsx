
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background -z-10" />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 max-w-7xl mx-auto overflow-hidden -z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-violet-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: "4s" }}></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="glass-card max-w-4xl mx-auto p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-2/3">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Social Content?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of content creators who are saving time and increasing their reach with AI-powered blog generation.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                  </span>
                  <span>No credit card required for free trial</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                  </span>
                  <span>Set up in minutes, not hours</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                  </span>
                  <span>Cancel anytime</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:w-1/3 flex flex-col space-y-4 w-full">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
