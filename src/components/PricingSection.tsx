
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl -z-10" />

      <div className="container px-4 md:px-6">
        <div className="text-center mx-auto mb-16 max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Choose the Perfect <span className="text-gradient">Plan</span> for Your Needs
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Get started for free or upgrade to unlock premium features for your content creation needs
          </p>

          <div className="flex items-center justify-center mt-8 space-x-3">
            <span className={`text-sm ${!annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-state={annual ? "checked" : "unchecked"}
            >
              <span
                data-state={annual ? "checked" : "unchecked"}
                className={`inline-block h-4 w-4 rounded-full bg-primary transition-transform ${
                  annual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Annual <span className="text-primary font-medium">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="relative group bg-card border border-border rounded-xl overflow-hidden transition-all hover:shadow-lg">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <p className="text-muted-foreground mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button className="w-full mb-6" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">3 blog conversions per month</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Twitter & LinkedIn integration</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Basic SEO suggestions</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Markdown export</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">Community support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative group bg-card border border-primary rounded-xl overflow-hidden transition-all hover:shadow-lg">
            {/* Enhanced Popular Badge */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-violet-600"></div>
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-violet-600 text-xs text-white font-medium px-4 py-1.5 rounded-full shadow-md">
              MOST POPULAR
            </div>
            
            <div className="p-6 md:p-8 pt-10">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-muted-foreground mb-6">For content creators</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${annual ? "29" : "39"}</span>
                <span className="text-muted-foreground">/month</span>
                {annual && <span className="ml-2 text-xs text-primary font-medium">Save $120/year</span>}
              </div>
              <Button className="w-full mb-6 bg-primary text-white hover:bg-primary/90" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm"><strong>Unlimited</strong> blog conversions</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">All social media platforms</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Advanced SEO optimization</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">WordPress & Webflow integration</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Real-time collaboration</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Priority email support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="relative group bg-card border border-border rounded-xl overflow-hidden transition-all hover:shadow-lg">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-6">For teams & agencies</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${annual ? "299" : "349"}</span>
                <span className="text-muted-foreground">/month</span>
                {annual && <span className="ml-2 text-xs text-primary font-medium">Save $600/year</span>}
              </div>
              <Button className="w-full mb-6" variant="outline" asChild>
                <Link to="/auth">Contact Sales</Link>
              </Button>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Everything in Pro, plus:</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm"><strong>Unlimited</strong> team members</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Custom AI training on your content</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">White labeling & custom domain</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Advanced analytics dashboard</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Dedicated account manager</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">24/7 priority support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom solution? <a href="#" className="text-primary hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}
