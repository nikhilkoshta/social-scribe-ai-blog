
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

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
    <section className="py-16 md:py-24 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 animated fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Choose The Perfect Plan For Your Needs
          </h2>
          <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Select a plan that's right for you. All plans include a 14-day free trial with no credit card required.
          </p>
          
          <div className="bg-muted flex items-center justify-center p-1 rounded-lg max-w-xs mx-auto mt-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`animated fade-in-up delay-${i * 200}`}>
              <Card className={`h-full flex flex-col ${
                plan.isPopular ? 'border-primary relative shadow-lg dark:shadow-primary/10' : 'border-border hover:border-primary/50'
              } card-hover-effect`}>
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
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow">
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
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    className="w-full" 
                    variant={plan.isPopular ? "default" : "outline"}
                  >
                    <Link to="/auth">
                      {plan.isFree ? "Start Free" : plan.name === "Enterprise" ? "Contact Sales" : "Subscribe"} 
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animated fade-in-up delay-600">
          <p className="text-muted-foreground mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <Button asChild variant="outline">
            <Link to="/pricing">Compare All Features</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
