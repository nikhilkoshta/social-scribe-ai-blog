
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    content: "SocialScribe has completely transformed my workflow. What used to take me hours now takes minutes. I can turn my Twitter threads into comprehensive blog posts with just a few clicks. The SEO optimization is incredible too!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Digital Marketing Manager",
    content: "Our agency has been able to scale our content production by 3x since using SocialScribe. The AI-generated blogs are surprisingly well-written and the collaborative editing tools make it easy for our team to work together.",
    rating: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Freelance Writer",
    content: "As someone who juggles multiple clients, SocialScribe has been a lifesaver. I can quickly repurpose my social media content into full blog posts, saving hours of work each week. The WordPress integration is seamless!",
    rating: 4
  },
  {
    name: "David Park",
    role: "Tech Entrepreneur",
    content: "The ROI on SocialScribe is incredible. We've seen a 40% increase in our blog traffic since using the platform's SEO tools. The ability to repurpose our existing content into high-quality blogs has been a game-changer.",
    rating: 5
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startAutoplay = () => {
    intervalRef.current = window.setInterval(() => {
      goToNext();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);
  
  const goToPrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background -z-10" />

      <div className="container px-4 md:px-6">
        <div className="text-center mx-auto mb-16 max-w-2xl">
          <div className="inline-flex items-center px-4 py-1.5 mb-4 border border-border rounded-full text-sm">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3.5 h-3.5 text-primary fill-primary" />
              ))}
            </div>
            <span className="ml-2 text-muted-foreground text-xs">
              Trusted by over 15,000+ creators
            </span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            What Our Users Are Saying
          </h2>
          <p className="text-muted-foreground">
            Join thousands of content creators who are saving time and boosting their SEO with SocialScribe
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            className="overflow-hidden"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="min-w-full"
                >
                  <div className="glass-panel p-8 md:p-10 text-center">
                    <div className="flex justify-center mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-5 h-5 ${star <= testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl italic mb-6">"{testimonial.content}"</p>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activeIndex ? 'bg-primary' : 'bg-primary/30'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
