
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Twitter, Linkedin, Magic, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SocialPostImporterProps {
  onGenerate: (content: string, source: string) => void;
}

export default function SocialPostImporter({ onGenerate }: SocialPostImporterProps) {
  const [twitterContent, setTwitterContent] = useState("");
  const [linkedinContent, setLinkedinContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = (content: string, source: string) => {
    if (!content.trim()) {
      toast({
        variant: "destructive",
        title: "No content",
        description: "Please paste some content to generate a blog post"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate checking character count
    if (content.length < 30) {
      toast({
        variant: "destructive",
        title: "Content too short",
        description: "Please provide more substantial content to generate a quality blog post"
      });
      setIsGenerating(false);
      return;
    }
    
    // Call the parent onGenerate function
    onGenerate(content, source);
    setIsGenerating(false);
  };
  
  const handleTwitterExample = () => {
    const exampleTweet = `Just shared my thoughts on how AI is revolutionizing content creation. The ability to instantly convert ideas into polished content is a game-changer for creators who want to focus on strategy rather than execution. #ContentCreation #AI

This new paradigm shifts how we think about content scaling - what used to take days now takes minutes.

The key isn't to replace human creativity, but to amplify it with AI assistance. Excited to see where this leads us in the next 5 years!`;
    
    setTwitterContent(exampleTweet);
  };
  
  const handleLinkedInExample = () => {
    const exampleLinkedInPost = `Excited to announce our latest research on AI and content strategy! We've found that companies leveraging AI for content repurposing see a 3x increase in output with 40% less time investment. #ContentStrategy #AI

Key findings from our study:
1. Consistency in posting increases by 78% when using AI tools
2. Content quality ratings remain stable or improve when using guided AI generation
3. Teams report higher satisfaction when they can focus on strategy vs. execution
4. ROI on content marketing improves by an average of 35%

I'd love to hear your experiences with AI in your content workflow. What's working? What challenges are you facing?`;
    
    setLinkedInContent(exampleLinkedInPost);
  };
  
  return (
    <Tabs defaultValue="twitter">
      <TabsList className="mb-4">
        <TabsTrigger value="twitter">
          <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" /> 
          Twitter
        </TabsTrigger>
        <TabsTrigger value="linkedin">
          <Linkedin className="h-4 w-4 mr-2 text-[#0077B5]" /> 
          LinkedIn
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="twitter">
        <Card>
          <CardContent className="p-6">
            <div className="mb-2 flex justify-between items-center">
              <h3 className="text-lg font-medium">Paste your tweet or thread</h3>
              <Button variant="ghost" size="sm" onClick={handleTwitterExample}>
                Load Example
              </Button>
            </div>
            
            <div className="bg-muted p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                </div>
                <Textarea
                  placeholder="Paste your tweet or Twitter thread here..."
                  className="min-h-[200px] bg-transparent border-none focus-visible:ring-0 resize-none p-0"
                  value={twitterContent}
                  onChange={(e) => setTwitterContent(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                For best results, paste the entire thread if available. The more context you provide, the better the generated blog will be.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => handleGenerate(twitterContent, 'twitter')}
                disabled={isGenerating}
                className="group"
              >
                <Magic className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                Generate Blog Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="linkedin">
        <Card>
          <CardContent className="p-6">
            <div className="mb-2 flex justify-between items-center">
              <h3 className="text-lg font-medium">Paste your LinkedIn post</h3>
              <Button variant="ghost" size="sm" onClick={handleLinkedInExample}>
                Load Example
              </Button>
            </div>
            
            <div className="bg-muted p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-[#0077B5]" />
                </div>
                <Textarea
                  placeholder="Paste your LinkedIn post here..."
                  className="min-h-[200px] bg-transparent border-none focus-visible:ring-0 resize-none p-0"
                  value={linkedinContent}
                  onChange={(e) => setLinkedInContent(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Include headers, bullet points, and any formatting from your original LinkedIn post for the best blog conversion.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => handleGenerate(linkedinContent, 'linkedin')}
                disabled={isGenerating}
                className="group"
              >
                <Magic className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                Generate Blog Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
