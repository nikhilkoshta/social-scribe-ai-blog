import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Twitter, Linkedin, Mic, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function LiveDemo() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [socialContent, setSocialContent] = useState("");
  const [activeTab, setActiveTab] = useState("twitter");
  const [seoScore, setSeoScore] = useState(0);
  
  const twitterExample = `Just shared my thoughts on how AI is revolutionizing content creation. The ability to instantly convert ideas into polished content is a game-changer for creators who want to focus on strategy rather than execution. #ContentCreation #AI

This new paradigm shifts how we think about content scaling - what used to take days now takes minutes.

The key isn't to replace human creativity, but to amplify it with AI assistance. Excited to see where this leads us in the next 5 years!`;

  const linkedinExample = `Excited to announce our latest research on AI and content strategy! We've found that companies leveraging AI for content repurposing see a 3x increase in output with 40% less time investment. #ContentStrategy #AI

Key findings from our study:
1. Consistency in posting increases by 78% when using AI tools
2. Content quality ratings remain stable or improve when using guided AI generation
3. Teams report higher satisfaction when they can focus on strategy vs. execution
4. ROI on content marketing improves by an average of 35%

I'd love to hear your experiences with AI in your content workflow. What's working? What challenges are you facing?`;

  useEffect(() => {
    setIsVisible(true);
    
    // Set default example content based on active tab
    setSocialContent(activeTab === "twitter" ? twitterExample : linkedinExample);
  }, [activeTab]);
  
  const handleGenerate = () => {
    if (!socialContent.trim()) {
      toast({
        title: "No content",
        description: "Please enter some content to convert",
      });
      return;
    }
    
    setIsGenerating(true);
    setSeoScore(0);
    setGeneratedContent("");
    
    // Simulate API call to AI service
    setTimeout(() => {
      // Gradually reveal the blog content for a nice animation effect
      const blogContent = generateSampleBlog(socialContent);
      const words = blogContent.split(" ");
      
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < words.length) {
          const currentText = words.slice(0, currentIndex + 1).join(" ");
          setGeneratedContent(currentText);
          currentIndex += 3; // Add 3 words at a time for faster animation
          
          // Gradually increase SEO score as content is revealed
          if (currentIndex % 10 === 0) {
            setSeoScore(Math.min(95, Math.floor(currentIndex / words.length * 100)));
          }
        } else {
          clearInterval(interval);
          setIsGenerating(false);
          setSeoScore(92);
        }
      }, 50);
    }, 1500);
  };
  
  const generateSampleBlog = (content: string) => {
    const hashtags = content.match(/#\w+/g) || [];
    const hashedTopics = hashtags.map(tag => tag.replace('#', '')).join(', ');
    const topic = hashtags.length > 0 
      ? hashtags[0].replace('#', '') 
      : content.split(' ').slice(0, 3).join(' ');
    
    const firstLine = content.split('\n')[0];
    const blogTitle = `How ${topic.charAt(0).toUpperCase() + topic.slice(1)} Is Transforming The Digital Landscape`;
    
    return `# ${blogTitle}

## Introduction

${firstLine}

In today's rapidly evolving digital landscape, staying ahead of technological trends isn't just advantageous—it's essential. As professionals across industries seek to maximize efficiency without compromising quality, AI-driven solutions have emerged as powerful allies in content creation and strategy development.

## The Strategic Advantage

Content creators who leverage AI tools gain several competitive advantages:

1. **Increased Production Capacity**: What once required days of manual effort can now be accomplished in minutes, allowing for greater content volume without additional resources.

2. **Consistent Publishing Schedules**: Automated workflows ensure content is always ready on time, eliminating gaps in publishing calendars.

3. **Enhanced Creative Focus**: By delegating routine aspects of content production, human creators can focus on high-level strategy and creative direction.

4. **Data-Driven Optimization**: AI tools can analyze performance metrics and suggest improvements based on audience engagement patterns.

## Real-World Impact

Organizations implementing AI-powered content strategies report significant improvements across key performance indicators:

- 78% increase in posting consistency
- 3x growth in content output
- 40% reduction in production time
- 35% improvement in marketing ROI

These numbers aren't just impressive—they represent a fundamental shift in how content teams operate and deliver value to their organizations.

## Finding the Balance

Despite its advantages, AI is most effective when used as an enhancement to human creativity rather than a replacement. The most successful implementations balance algorithmic efficiency with human insight, creating content that is both scalable and authentic.

As one industry expert noted, "The key isn't to replace human creativity, but to amplify it with AI assistance."

## Looking Ahead

The intersection of ${hashedTopics} continues to evolve rapidly. Organizations that thoughtfully integrate these technologies into their workflows position themselves at the forefront of innovation, capable of meeting increasing content demands while maintaining distinctive brand voices.

## Conclusion

As we look toward the next five years of development in this space, one thing is clear: the content creation landscape has been permanently transformed. Those who adapt to this new paradigm will find themselves uniquely positioned to thrive in an increasingly content-hungry digital world.`;
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setGeneratedContent("");
    setSeoScore(0);
    
    // Set example content based on selected tab
    if (value === "twitter") {
      setSocialContent(twitterExample);
    } else {
      setSocialContent(linkedinExample);
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background -z-10" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 -left-12 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container px-4 md:px-6">
        <div 
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Experience the magic of AI-powered content transformation. Paste your social media post or use our example to generate a fully-formatted blog post instantly.
          </p>
        </div>
        
        <div 
          className={`grid md:grid-cols-2 gap-8 max-w-6xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Input Section */}
          <div>
            <Card className="h-full">
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-heading font-medium mb-4">1. Input Your Social Post</h3>
                
                <Tabs defaultValue="twitter" className="flex-grow flex flex-col" onValueChange={handleTabChange}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="twitter" className="flex items-center">
                      <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" /> Twitter
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="flex items-center">
                      <Linkedin className="mr-2 h-4 w-4 text-[#0077B5]" /> LinkedIn
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="mb-4 flex-grow">
                      <Textarea
                        placeholder="Paste your social media post here..."
                        className="min-h-[250px] h-full resize-none"
                        value={socialContent}
                        onChange={(e) => setSocialContent(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleGenerate} 
                      disabled={isGenerating} 
                      className="w-full group"
                    >
                      {isGenerating ? (
                        <>
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                          Generate Blog Post
                        </>
                      )}
                    </Button>
                  </div>
                </Tabs>
              </div>
            </Card>
          </div>
          
          {/* Output Section */}
          <div>
            <Card className={`h-full transition-all duration-500 ${generatedContent ? 'border-primary/50 shadow-lg' : ''}`}>
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-heading font-medium">2. Generated Blog Post</h3>
                  
                  {seoScore > 0 && (
                    <div className="flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      <span className="mr-1 font-semibold">SEO Score:</span>
                      <span>{seoScore}</span>
                      <span className="text-xs">/100</span>
                    </div>
                  )}
                </div>
                
                {generatedContent ? (
                  <div className="flex-grow overflow-y-auto prose prose-sm max-w-none dark:prose-invert">
                    <div dangerouslySetInnerHTML={{ 
                      __html: generatedContent
                        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                        .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
                        .replace(/\n\n/gm, '</p><p>')
                        .replace(/^- (.*$)/gm, '<li>$1</li>')
                        .replace(/<li>/gm, '<ul><li>')
                        .replace(/<\/li>/gm, '</li></ul>')
                        .replace(/<\/ul><ul>/gm, '')
                    }} />
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center text-center p-6 border-2 border-dashed rounded-md">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Your blog will appear here</h4>
                    <p className="text-muted-foreground">
                      Enter your social post and click "Generate" to see the AI transform it into a full blog article.
                    </p>
                  </div>
                )}
                
                {generatedContent && (
                  <div className="mt-6">
                    <Button className="w-full" variant="outline">
                      Edit in Full Editor
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
        
        <div 
          className={`mt-12 text-center max-w-lg mx-auto transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-muted-foreground mb-6">
            Ready to transform all your social content into professional blog articles?
          </p>
          <Button className="bg-primary text-white hover:bg-primary/90" size="lg" asChild>
            <a href="/auth">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
