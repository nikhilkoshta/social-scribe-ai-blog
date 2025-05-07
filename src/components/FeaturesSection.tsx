
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Calendar, Clock, Code, Edit, MessageSquare, Share, Star, Twitter, Upload } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl -z-10" />

      <div className="container px-4 md:px-6">
        <div className="text-center mx-auto mb-16 max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Transform Your <span className="text-gradient">Social Content</span><br />into Professional Blog Articles
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Our platform uses advanced AI to seamlessly convert your social media posts into comprehensive, SEO-optimized blog content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative bg-card hover:shadow-lg transition-all duration-300 rounded-xl border border-border p-6 hover:border-primary/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-xl"></div>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <Twitter className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Social API Integration</h3>
            <p className="text-muted-foreground mb-4">
              Connect your Twitter and LinkedIn accounts to instantly fetch your latest posts and threads
            </p>
            <Link to="/features" className="inline-flex items-center text-sm text-primary hover:underline">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-card hover:shadow-lg transition-all duration-300 rounded-xl border border-border p-6 hover:border-primary/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-xl"></div>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">AI Blog Engine</h3>
            <p className="text-muted-foreground mb-4">
              Our fine-tuned Mistral-7B model expands your posts into coherent, context-aware blog articles
            </p>
            <Link to="/features" className="inline-flex items-center text-sm text-primary hover:underline">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-card hover:shadow-lg transition-all duration-300 rounded-xl border border-border p-6 hover:border-primary/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-xl"></div>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">SEO Optimization</h3>
            <p className="text-muted-foreground mb-4">
              Semantic SEO optimization via SurferSEO API ensures your content ranks well in search results
            </p>
            <Link to="/features" className="inline-flex items-center text-sm text-primary hover:underline">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-card hover:shadow-lg transition-all duration-300 rounded-xl border border-border p-6 hover:border-primary/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-xl"></div>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <Edit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Real-Time Editing</h3>
            <p className="text-muted-foreground mb-4">
              Collaborate with your team using our Google Docs-like editor with version history and diff comparison
            </p>
            <Link to="/features" className="inline-flex items-center text-sm text-primary hover:underline">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Feature 5 */}
          <div className="group relative bg-card hover:shadow-lg transition-all duration-300 rounded-xl border border-border p-6 hover:border-primary/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-xl"></div>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">CMS Publishing</h3>
            <p className="text-muted-foreground mb-4">
              Directly publish to WordPress, Webflow, or Ghost with our seamless CMS integration
            </p>
            <Link to="/features" className="inline-flex items-center text-sm text-primary hover:underline">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Feature 6 */}
          <div className="group relative bg-card hover:shadow-lg transition-all duration-300 rounded-xl border border-border p-6 hover:border-primary/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-xl"></div>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Scheduled Posting</h3>
            <p className="text-muted-foreground mb-4">
              Plan your content calendar and schedule posts with our intuitive calendar interface
            </p>
            <Link to="/features" className="inline-flex items-center text-sm text-primary hover:underline">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                How <span className="text-gradient">SocialScribe</span> Works
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Our platform leverages advanced AI to transform your brief social media posts into comprehensive, professional blog articles in just a few clicks.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <h4 className="font-medium">Connect Your Accounts</h4>
                    <p className="text-sm text-muted-foreground">Link your Twitter or LinkedIn profiles to our secure platform.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <h4 className="font-medium">Select Your Content</h4>
                    <p className="text-sm text-muted-foreground">Choose the posts or threads you want to expand into blog articles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</div>
                  <div>
                    <h4 className="font-medium">AI-Powered Expansion</h4>
                    <p className="text-sm text-muted-foreground">Our AI engine transforms your content into a fully structured blog post.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">4</div>
                  <div>
                    <h4 className="font-medium">Edit & Optimize</h4>
                    <p className="text-sm text-muted-foreground">Fine-tune your article with our collaborative editor and SEO tools.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">5</div>
                  <div>
                    <h4 className="font-medium">Publish & Share</h4>
                    <p className="text-sm text-muted-foreground">Directly publish to your CMS or export in your preferred format.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-violet-500/10 rounded-2xl blur-md"></div>
                <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-lg">
                  <div className="flex items-center px-4 py-2 border-b border-border bg-muted/50">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground">
                      SocialScribe Editor
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <div className="flex gap-4">
                          <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Blog Post Editor</h4>
                            <p className="text-xs text-muted-foreground">Generated from Twitter thread</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-16 rounded bg-primary/10 text-primary text-xs flex items-center justify-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>5m ago</span>
                          </div>
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-muted border border-background"></div>
                            <div className="w-6 h-6 rounded-full bg-muted border border-background"></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <input 
                          type="text" 
                          className="w-full text-xl font-heading font-bold bg-transparent border-none focus:outline-none p-0" 
                          value="How AI is Revolutionizing Content Creation" 
                          readOnly
                        />
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Comment</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Share className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto text-primary">
                          <Star className="w-3.5 h-3.5" />
                          <span>SEO Score: 92/100</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-5 space-y-3">
                        <div className="flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-full bg-muted"></div>
                          <div className="space-y-2 flex-1">
                            <p className="text-sm">In the rapidly evolving landscape of digital content, AI is fundamentally transforming how creators produce and optimize their work.</p>
                            <p className="text-sm">Gone are the days of spending hours drafting and reformatting content for different platforms. With AI-assisted tools, what once took days can now be accomplished in minutes.</p>
                          </div>
                        </div>

                        <div className="ml-9 border-l-2 border-primary/30 pl-3 py-1">
                          <div className="text-sm text-muted-foreground italic">
                            "The ability to instantly convert ideas into polished content is a game-changer for creators who want to focus on strategy rather than execution." - Original Tweet
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-full bg-muted"></div>
                          <div className="space-y-2 flex-1">
                            <h3 className="text-sm font-medium">Key Benefits for Content Creators</h3>
                            <ul className="list-disc list-inside text-sm space-y-1 ml-3">
                              <li>Increased productivity with 3x faster content generation</li>
                              <li>Consistent publishing schedules across multiple platforms</li>
                              <li>More time to focus on creative strategy</li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-full bg-violet-500"></div>
                          <div className="space-y-2 flex-1">
                            <p className="text-sm font-medium text-violet-500">AI suggestion: Add a section about measuring content effectiveness</p>
                            <div className="text-xs flex items-center gap-2">
                              <button className="bg-violet-500/10 text-violet-500 px-2 py-0.5 rounded">Accept</button>
                              <button className="hover:text-muted-foreground">Dismiss</button>
                            </div>
                          </div>
                        </div>

                      </div>
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
