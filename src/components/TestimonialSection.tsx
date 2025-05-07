
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    company: "The Digital Nomad",
    content: "SocialScribe has completely transformed my workflow. What used to take me hours now takes minutes. I can turn my Twitter threads into comprehensive blog posts with just a few clicks. The SEO optimization is incredible too!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Michael Chen",
    role: "Digital Marketing Manager",
    company: "Growth Hackers Inc.",
    content: "Our agency has been able to scale our content production by 3x since using SocialScribe. The AI-generated blogs are surprisingly well-written and the collaborative editing tools make it easy for our team to work together.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Emma Rodriguez",
    role: "Freelance Writer",
    company: "Self-employed",
    content: "As someone who juggles multiple clients, SocialScribe has been a lifesaver. I can quickly repurpose my social media content into full blog posts, saving hours of work each week. The WordPress integration is seamless!",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "David Park",
    role: "Tech Entrepreneur",
    company: "InnovateTech",
    content: "The ROI on SocialScribe is incredible. We've seen a 40% increase in our blog traffic since using the platform's SEO tools. The ability to repurpose our existing content into high-quality blogs has been a game-changer.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/86.jpg"
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    startAutoplay();
    return () => {
      stopAutoplay();
      observer.disconnect();
    };
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
    <section ref={testimonialRef} className="py-20 md:py-28 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background -z-10" />
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-10 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '0s' }}
        ></div>
        <div 
          className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="container px-4 md:px-6">
        <div 
          className={`text-center mx-auto mb-16 max-w-2xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
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

        <div 
          className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
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
                  <div className="glass-panel p-8 md:p-10 relative">
                    {/* Decorative quote */}
                    <div className="absolute -top-6 -left-6 text-primary/10">
                      <Quote size={80} className="rotate-180" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
                      <div className="md:w-1/3 flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg mb-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h4 className="font-medium text-lg mb-1">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{testimonial.role}</p>
                        {testimonial.company && (
                          <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                        )}
                        <div className="flex justify-center mt-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <p className="text-lg md:text-xl font-heading italic mb-6 relative">
                          "{testimonial.content}"
                        </p>
                      </div>
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

        <div 
          className={`flex justify-center mt-8 space-x-2 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <div 
          className={`mt-12 text-center max-w-3xl mx-auto transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="p-6 border border-border border-dashed rounded-xl bg-card">
            <h3 className="text-2xl font-heading font-bold mb-3">Ready to experience the difference?</h3>
            <p className="text-muted-foreground mb-6">
              Create your free account today and see why thousands of content creators trust SocialScribe.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-primary text-white hover:bg-primary/90 py-2 px-6 rounded-md font-medium flex items-center justify-center">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
