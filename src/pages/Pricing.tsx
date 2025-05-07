
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Check, 
  HelpCircle, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsVisible(true);
    
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  const handlePlanSelection = (plan: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please sign in to subscribe to a plan.",
        action: (
          <Button onClick={() => navigate("/auth")} variant="outline" size="sm">
            Sign In
          </Button>
        ),
      });
      return;
    }
    
    toast({
      title: "Coming soon",
      description: `${plan} subscription will be available soon!`
    });
  };
  
  const plans = [
    {
      name: "Basic",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      features: [
        "3 blog conversions per month",
        "Twitter & LinkedIn integration",
        "Basic SEO suggestions",
        "Markdown export",
        "Community support"
      ],
      isFree: true
    },
    {
      name: "Pro",
      description: "For content creators",
      price: { monthly: 29, annual: 19 },
      features: [
        "Unlimited blog conversions",
        "All social media platforms",
        "Advanced SEO optimization",
        "WordPress & Webflow integration",
        "Real-time collaboration",
        "Priority email support"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      description: "For teams & agencies",
      price: { monthly: 99, annual: 79 },
      features: [
        "Everything in Pro, plus:",
        "Unlimited team members",
        "Custom AI training on your content",
        "White labeling & custom domain",
        "Advanced analytics dashboard",
        "Dedicated account manager",
        "24/7 priority support"
      ]
    }
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="container px-4 md:px-6">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-primary/70">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Start for free, upgrade when you need more power.
            </p>
            
            <div className="bg-muted flex items-center justify-center p-1 rounded-lg max-w-xs mx-auto">
              <Tabs 
                defaultValue={annual ? "annual" : "monthly"}
                onValueChange={(value) => setAnnual(value === "annual")}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">
                    Annual <span className="ml-1 text-xs text-primary">-20%</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-8 md:py-16">
        <div className="container px-4 md:px-6">
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
                  plan.isPopular ? 'border-primary relative shadow-lg dark:shadow-primary/10' : 'border-border hover:border-primary/50'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.isPopular && (
                  <>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-semibold py-1 px-3 rounded-full z-10">
                      <span className="flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        MOST POPULAR
                      </span>
                    </div>
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-violet-500"></div>
                  </>
                )}
                
                <CardHeader className="pb-0">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="mb-6">
                    {plan.isFree ? (
                      <div className="text-4xl font-bold">Free</div>
                    ) : (
                      <>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">${annual ? plan.price.annual : plan.price.monthly}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        {annual && (
                          <div className="text-xs text-primary mt-1">
                            Save ${(plan.price.monthly - plan.price.annual) * 12}/year
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => {
                      const hasTip = feature.includes("Advanced SEO") || feature.includes("Custom AI training");
                      
                      return (
                        <li key={i} className="flex">
                          <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span>
                            {feature}
                            {hasTip && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="inline-block h-4 w-4 text-muted-foreground ml-1 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {feature.includes("Advanced SEO") 
                                      ? "Includes keyword research, readability analysis, meta description generation, and more."
                                      : "Train our AI on your existing content to match your brand's tone and style."}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.isPopular ? "default" : "outline"}
                    onClick={() => handlePlanSelection(plan.name)}
                  >
                    {plan.isFree ? "Start Free" : plan.name === "Enterprise" ? "Contact Sales" : "Subscribe"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center animate-fade-in-delay" style={{ animationDelay: '600ms' }}>
            <p className="text-muted-foreground mb-4">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <p className="text-sm text-muted-foreground">
              Need a custom solution? <a href="#" className="text-primary hover:underline">Contact our sales team</a>
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 animate-fade-in-delay" style={{ animationDelay: '700ms' }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Everything you need to know about our platform and pricing.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                q: "How does the free trial work?",
                a: "Our 14-day free trial gives you full access to all features of your selected plan. You can cancel anytime during the trial period and won't be charged. No credit card is required to start your trial."
              },
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to new features. When downgrading, the change will take effect at the end of your current billing cycle."
              },
              {
                q: "Is there a limit to how many blogs I can create?",
                a: "The Basic plan allows up to 3 blog conversions per month. The Pro and Enterprise plans offer unlimited blog conversions, giving you the freedom to create as much content as you need."
              },
              {
                q: "How do social media integrations work?",
                a: "After connecting your social media accounts, our platform can import your posts and threads, then transform them into well-structured blog articles. You maintain full control over your content and can edit it before publishing."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, including Visa, Mastercard, and American Express. Enterprise customers can also pay via invoice with net-30 terms."
              }
            ].map((faq, index) => (
              <Card key={index} className="animate-fade-in-delay" style={{ animationDelay: `${800 + (index * 100)}ms` }}>
                <CardHeader>
                  <CardTitle className="text-xl">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center animate-fade-in-delay" style={{ animationDelay: '1300ms' }}>
            <p className="mb-6 text-lg">
              Still have questions? We're here to help.
            </p>
            <Button asChild>
              <Link to="/">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -bottom-24 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-delay" style={{ animationDelay: '1400ms' }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-primary/70">
              Ready to Transform Your Social Content?
            </h2>
            <p className="text-muted-foreground md:text-lg mb-8">
              Join thousands of content creators who are saving time and increasing their reach with AI-powered blog generation.
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
      
      <style>
        {`
          @keyframes fade-in {
            0% { 
              opacity: 0; 
              transform: translateY(10px);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0);
            }
          }
          
          .animate-fade-in-delay {
            opacity: 0;
            animation: fade-in 0.6s ease-out forwards;
          }
        `}
      </style>
    </Layout>
  );
}
