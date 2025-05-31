
import { Button } from "@/components/ui/button";
import { ArrowRight, Twitter, Linkedin, Image, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient with animated effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />
      
      {/* Floating animated shapes */}
      <div 
        className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-float" 
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute bottom-10 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl -z-10 animate-float" 
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute -top-20 right-1/4 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-float" 
        style={{ animationDelay: "4s" }}
      />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-10">
          <div className="space-y-4 max-w-4xl mx-auto">
            <div 
              className={`inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 mb-4 text-sm font-medium text-foreground transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              <span className="flex h-2 w-2 rounded-full bg-primary mr-1.5 animate-pulse"></span>
              <span className="text-xs">NEW</span>
              <span className="text-xs text-muted-foreground mx-2">·</span>
              <span className="text-xs">AI-powered blog generation is here</span>
            </div>

            <h1 
              className={`text-4xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{transitionDelay: '100ms'}}
            >
              Turn Social Posts into SEO Blogs - Automatically
            </h1>

            <p 
              className={`mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{transitionDelay: '200ms'}}
            >
              AI converts your tweets & LinkedIn threads into polished articles in 1 click.
              No more manual reformatting, our intelligent system does it all.
            </p>
          </div>

          <div 
            className={`flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{transitionDelay: '300ms'}}
          >
            <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90" asChild>
              <Link to="/auth">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">No credit card needed</p>
          </div>

          <div 
            className={`w-full max-w-5xl mx-auto mt-16 relative group transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{transitionDelay: '400ms'}}
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse-soft"></div>
            <div className="relative bg-card rounded-xl overflow-hidden border border-border shadow-xl">
              {/* Demo Window Header */}
              <div className="flex items-center px-4 py-2 border-b border-border bg-muted/50">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* Demo Content */}
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-card">
                <div className="flex flex-col">
                  <div className="flex items-start gap-3 mb-4 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors group/tweet">
                    <div className="flex-shrink-0">
                      <Twitter className="w-6 h-6 text-[#1DA1F2] group-hover/tweet:text-[#1DA1F2]/80 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted-foreground/30 animate-pulse"></div>
                        <p className="text-sm font-medium">@username</p>
                      </div>
                      <div className="text-sm">
                        Just shared my thoughts on how AI is revolutionizing content creation. The ability to instantly convert ideas into polished content is a game-changer for creators who want to focus on strategy rather than execution. <span className="text-[#1DA1F2]">#ContentCreation #AI</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>5:30 PM · May 7, 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center my-6">
                    <div className="relative inline-flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-primary animate-pulse-soft" />
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-soft"></div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/30 transition-colors group/linkedin">
                    <div className="flex-shrink-0">
                      <Linkedin className="w-6 h-6 text-[#0077B5] group-hover/linkedin:text-[#0077B5]/80 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted-foreground/30 animate-pulse"></div>
                        <p className="text-sm font-medium">LinkedIn User</p>
                      </div>
                      <div className="text-sm">
                        Excited to announce our latest research on AI and content strategy! We've found that companies leveraging AI for content repurposing see a 3x increase in output with 40% less time investment. <span className="text-[#0077B5]">#ContentStrategy #AI</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Yesterday at 10:20 AM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l border-border pl-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-medium">Generated Blog Post</h3>
                  </div>
                  <div className="space-y-4 relative group/blog">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover/blog:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
                    
                    <h2 className="text-lg font-heading font-bold">How AI is Revolutionizing Content Creation: A Game-Changer for Strategic Creators</h2>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Image className="w-3 h-3" />
                        <span>Featured Image</span>
                      </div>
                      <div className="h-4 w-px bg-border"></div>
                      <div className="text-xs text-primary font-medium">SEO Score: <span className="animate-pulse">92</span>/100</div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-11/12 rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-10/12 rounded bg-muted-foreground/20"></div>
                    </div>

                    <h3 className="text-sm font-medium mt-4">The Strategic Advantage</h3>
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-9/12 rounded bg-muted-foreground/20"></div>
                    </div>

                    <h3 className="text-sm font-medium mt-4">Measuring the Impact</h3>
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-11/12 rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-8/12 rounded bg-muted-foreground/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
