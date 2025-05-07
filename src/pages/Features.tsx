
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Twitter, Linkedin, BookOpen, FileText, PenTool, BarChart, Code, Layers, Shuffle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.feature-animate').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const features = [
    {
      id: 1,
      title: "Social Media Integration",
      description: "Connect your Twitter and LinkedIn accounts to import and convert your posts into well-structured blog articles.",
      icon: <Twitter className="h-6 w-6 text-primary" />,
      bullets: [
        "One-click import from Twitter threads",
        "Convert LinkedIn articles to blog format",
        "Maintain original hashtags and mentions",
        "Preserve engagement metrics"
      ]
    },
    {
      id: 2,
      title: "AI Blog Engine",
      description: "Our advanced AI engine transforms short social posts into comprehensive, well-structured blog articles.",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      bullets: [
        "Expand content while maintaining context",
        "Generate SEO-optimized headlines",
        "Create natural paragraph transitions",
        "Add relevant subheadings and structure"
      ]
    },
    {
      id: 3,
      title: "Rich Text Editor",
      description: "Powerful yet intuitive editing tools to perfect your blog posts before publishing.",
      icon: <PenTool className="h-6 w-6 text-primary" />,
      bullets: [
        "Real-time collaborative editing",
        "Version history and revisions",
        "Format with markdown or rich text",
        "Insert images, videos, and embeds"
      ]
    },
    {
      id: 4,
      title: "SEO Optimization",
      description: "Built-in SEO tools to ensure your content ranks well in search engines.",
      icon: <Search className="h-6 w-6 text-primary" />,
      bullets: [
        "Keyword density analysis",
        "Readability scoring",
        "Meta description generation",
        "Internal linking suggestions"
      ]
    },
    {
      id: 5,
      title: "Multi-format Export",
      description: "Export your content in various formats to publish anywhere.",
      icon: <Code className="h-6 w-6 text-primary" />,
      bullets: [
        "HTML for web publishing",
        "Markdown for technical blogs",
        "WordPress-ready format",
        "PDF for offline distribution"
      ]
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      description: "Track the performance of your blog content across platforms.",
      icon: <BarChart className="h-6 w-6 text-primary" />,
      bullets: [
        "Content performance metrics",
        "Audience engagement tracking",
        "SEO ranking monitoring",
        "A/B testing for headlines"
      ]
    }
  ];
  
  const handleLearnMore = (featureId: number) => {
    setActiveFeature(featureId - 1);
    
    // Scroll to features section
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />
        <div className="container px-4 md:px-6">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/70">
              Powerful Features for Content Creators
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our platform offers everything you need to transform your social media posts into professional blog articles with the power of AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/auth">Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid Overview */}
      <section className="py-16 md:py-24 bg-muted/30" ref={featuresRef}>
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 feature-animate opacity-0">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Create Amazing Content
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you create, optimize, and distribute engaging content with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.id} 
                className={`feature-animate opacity-0 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => handleLearnMore(feature.id)}
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Details Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="feature-animate opacity-0">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {features[activeFeature].icon}
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                {features[activeFeature].title}
              </h2>
              <p className="text-muted-foreground md:text-lg mb-6">
                {features[activeFeature].description}
              </p>
              <ul className="space-y-4 mb-8">
                {features[activeFeature].bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg">{bullet}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
            
            <div className="feature-animate opacity-0 relative group">
              <div className="aspect-video bg-muted rounded-xl overflow-hidden border border-border relative">
                {activeFeature === 0 && (
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-muted-foreground/20 mr-3"></div>
                      <div>
                        <div className="h-4 w-32 bg-muted-foreground/20 rounded-md"></div>
                        <div className="h-3 w-24 bg-muted-foreground/10 rounded-md mt-1"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted-foreground/20 rounded-md"></div>
                      <div className="h-4 w-full bg-muted-foreground/20 rounded-md"></div>
                      <div className="h-4 w-3/4 bg-muted-foreground/20 rounded-md"></div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <Twitter className="h-5 w-5 text-[#1DA1F2] mr-2" />
                      <div className="h-8 w-28 bg-[#1DA1F2]/20 rounded-md"></div>
                    </div>
                    <div className="mt-auto">
                      <div className="h-10 w-full bg-primary/20 rounded-md"></div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 1 && (
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-6 w-40 bg-muted-foreground/20 rounded-md"></div>
                      <div className="h-8 w-8 rounded-full bg-primary/30"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 w-3/4 bg-muted-foreground/30 rounded-md"></div>
                      <div className="h-4 w-full bg-muted-foreground/20 rounded-md"></div>
                      <div className="h-4 w-full bg-muted-foreground/20 rounded-md"></div>
                      <div className="h-4 w-1/2 bg-muted-foreground/20 rounded-md"></div>
                    </div>
                    <div className="mt-4">
                      <div className="h-5 w-1/3 bg-muted-foreground/30 rounded-md mb-2"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-full bg-muted-foreground/10 rounded-md"></div>
                        <div className="h-4 w-full bg-muted-foreground/10 rounded-md"></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="h-5 w-1/3 bg-muted-foreground/30 rounded-md mb-2"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-full bg-muted-foreground/10 rounded-md"></div>
                        <div className="h-4 w-4/5 bg-muted-foreground/10 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 2 && (
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex space-x-2 mb-3">
                      <div className="h-8 w-8 bg-muted-foreground/20 rounded"></div>
                      <div className="h-8 w-8 bg-muted-foreground/20 rounded"></div>
                      <div className="h-8 w-8 bg-muted-foreground/20 rounded"></div>
                      <div className="h-8 w-8 bg-muted-foreground/20 rounded"></div>
                    </div>
                    <div className="h-6 w-48 bg-muted-foreground/30 rounded-md mb-4"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-full bg-muted-foreground/15 rounded-md"></div>
                      <div className="h-4 w-full bg-muted-foreground/15 rounded-md"></div>
                      <div className="h-4 w-full bg-muted-foreground/15 rounded-md"></div>
                      <div className="h-4 w-3/4 bg-muted-foreground/15 rounded-md"></div>
                    </div>
                    <div className="h-10 flex space-x-2 mt-4">
                      <div className="h-full w-10 bg-muted-foreground/20 rounded"></div>
                      <div className="h-full w-10 bg-muted-foreground/20 rounded"></div>
                      <div className="h-full flex-grow bg-primary/20 rounded"></div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 3 && (
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="h-8 w-full bg-muted-foreground/20 rounded mb-4 flex items-center px-3">
                      <div className="h-4 w-24 bg-muted-foreground/30 rounded-md"></div>
                    </div>
                    <div className="flex space-x-4 flex-1">
                      <div className="w-2/3 h-full flex flex-col">
                        <div className="h-6 w-48 bg-muted-foreground/30 rounded-md mb-2"></div>
                        <div className="space-y-1 mb-2">
                          <div className="h-3 w-full bg-muted-foreground/15 rounded-md"></div>
                          <div className="h-3 w-full bg-muted-foreground/15 rounded-md"></div>
                          <div className="h-3 w-full bg-muted-foreground/15 rounded-md"></div>
                        </div>
                        <div className="h-6 w-36 bg-muted-foreground/30 rounded-md mb-2"></div>
                        <div className="space-y-1">
                          <div className="h-3 w-full bg-muted-foreground/15 rounded-md"></div>
                          <div className="h-3 w-full bg-muted-foreground/15 rounded-md"></div>
                          <div className="h-3 w-3/4 bg-muted-foreground/15 rounded-md"></div>
                        </div>
                      </div>
                      <div className="w-1/3 h-full">
                        <div className="h-full bg-muted-foreground/10 rounded p-3 flex flex-col justify-between">
                          <div>
                            <div className="h-5 w-full bg-muted-foreground/20 rounded-md mb-2"></div>
                            <div className="space-y-1">
                              <div className="h-3 w-full bg-muted-foreground/20 rounded-md"></div>
                              <div className="h-3 w-full bg-muted-foreground/20 rounded-md"></div>
                            </div>
                          </div>
                          <div className="h-20 w-full bg-primary/20 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 4 && (
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-6 w-40 bg-muted-foreground/20 rounded-md"></div>
                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-muted-foreground/20 rounded"></div>
                        <div className="h-8 w-8 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                      <div className="h-8 w-20 bg-muted-foreground/30 rounded"></div>
                      <div className="h-8 w-20 bg-muted-foreground/20 rounded"></div>
                      <div className="h-8 w-20 bg-muted-foreground/20 rounded"></div>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="h-24 w-full bg-muted-foreground/10 rounded-md p-3 flex">
                        <div className="h-full w-1/4 bg-primary/20 rounded mr-3"></div>
                        <div className="flex flex-col justify-center">
                          <div className="h-4 w-24 bg-muted-foreground/30 rounded-md mb-2"></div>
                          <div className="h-3 w-48 bg-muted-foreground/20 rounded-md"></div>
                        </div>
                      </div>
                      <div className="h-24 w-full bg-muted-foreground/10 rounded-md p-3 flex">
                        <div className="h-full w-1/4 bg-muted-foreground/20 rounded mr-3"></div>
                        <div className="flex flex-col justify-center">
                          <div className="h-4 w-24 bg-muted-foreground/30 rounded-md mb-2"></div>
                          <div className="h-3 w-48 bg-muted-foreground/20 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 5 && (
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-6 w-32 bg-muted-foreground/30 rounded-md"></div>
                      <div className="flex space-x-2">
                        <div className="h-8 w-16 bg-muted-foreground/20 rounded"></div>
                        <div className="h-8 w-16 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="bg-muted-foreground/10 rounded-md p-3 flex flex-col">
                        <div className="h-4 w-24 bg-muted-foreground/30 rounded-md mb-2"></div>
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-primary/30 mr-2"></div>
                          <div className="h-3 w-16 bg-muted-foreground/20 rounded-md"></div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div className="h-full bg-muted-foreground/5 rounded-md"></div>
                          <div className="h-full bg-muted-foreground/5 rounded-md"></div>
                          <div className="h-full bg-muted-foreground/5 rounded-md"></div>
                          <div className="h-full bg-muted-foreground/5 rounded-md"></div>
                        </div>
                      </div>
                      <div className="bg-muted-foreground/10 rounded-md p-3 flex flex-col">
                        <div className="h-4 w-24 bg-muted-foreground/30 rounded-md mb-2"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-3 w-full bg-muted-foreground/15 rounded-md"></div>
                          <div className="h-3 w-full bg-muted-foreground/15 rounded-md"></div>
                          <div className="h-3 w-3/4 bg-muted-foreground/15 rounded-md"></div>
                          <div className="h-16 w-full bg-primary/20 rounded-md mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Stack */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 feature-animate opacity-0">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Our platform leverages cutting-edge AI and content optimization technologies to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { icon: <Layers className="h-8 w-8" />, name: "AI Content Generation" },
              { icon: <Shuffle className="h-8 w-8" />, name: "Content Repurposing" },
              { icon: <Search className="h-8 w-8" />, name: "SEO Optimization" },
              { icon: <BarChart className="h-8 w-8" />, name: "Analytics" }
            ].map((tech, index) => (
              <div 
                key={index} 
                className="feature-animate opacity-0 flex flex-col items-center text-center p-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {tech.icon}
                </div>
                <h3 className="font-semibold mb-1">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center feature-animate opacity-0">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Content Strategy?
            </h2>
            <p className="text-muted-foreground md:text-lg mb-8">
              Join thousands of content creators who are saving time and increasing their reach with our AI-powered blog generation platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/auth">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
