
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TextEditor from "@/components/TextEditor";
import SocialPostImporter from "@/components/SocialPostImporter";
import { ArrowLeft, Save, Send, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [seoScore, setSeoScore] = useState(65);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  // Helper function to simulate SEO scoring
  useEffect(() => {
    if (content.length > 100 && title.length > 10) {
      // Simple algorithm to simulate SEO score based on content length
      const newScore = Math.min(95, 50 + Math.floor(content.length / 50));
      setSeoScore(newScore);
    } else {
      setSeoScore(Math.max(30, Math.floor(content.length / 10) + Math.floor(title.length * 2)));
    }
  }, [content, title]);
  
  const handleGenerateFromSocial = async (socialContent: string, source: string) => {
    setLoading(true);
    
    try {
      // Simulate AI processing
      toast({
        title: "Processing your content",
        description: "Our AI is analyzing and expanding your post..."
      });
      
      // Simulate AI delay
      setTimeout(() => {
        // Basic expansion algorithm
        const expandedContent = expandContentWithAI(socialContent);
        
        // Set title based on first sentence
        const firstSentence = socialContent.split('.')[0].trim();
        setTitle(firstSentence);
        
        // Set expanded content
        setContent(expandedContent);
        
        toast({
          title: "Content generated",
          description: "Your blog post has been created. You can now edit it."
        });
        
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "We couldn't generate content from your post. Please try again."
      });
      setLoading(false);
    }
  };
  
  // Simple content expansion function (simulating AI)
  const expandContentWithAI = (content: string): string => {
    const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
    
    let expandedContent = `<h2>Introduction</h2>
<p>${paragraphs[0]}</p>
<p>This topic is important because it helps us understand the broader context of digital transformation in today's rapidly evolving landscape. Let's dive deeper into what this means and why it matters.</p>

<h2>Main Points</h2>
<p>${paragraphs.length > 1 ? paragraphs[1] : 'When we consider the implications of this discussion, several key factors emerge that warrant our attention and analysis.'}</p>
<p>To further elaborate on this point, we should consider the following aspects:</p>
<ul>
<li>The increasing role of artificial intelligence in content creation</li>
<li>How automation is changing traditional workflows</li>
<li>The impact on SEO and content discovery</li>
<li>Future trends that may emerge from these developments</li>
</ul>

<h2>Analysis</h2>
<p>${paragraphs.length > 2 ? paragraphs[2] : 'Looking at the data and current trends, we can observe several patterns that indicate where this field is heading.'}</p>
<p>Industry experts have noted that these developments represent just the beginning of a significant shift in how content is created, distributed, and consumed across digital platforms.</p>

<h2>Practical Applications</h2>
<p>For content creators and marketers, these insights can be applied in several practical ways:</p>
<ol>
<li>Leverage AI tools to scale content production without sacrificing quality</li>
<li>Focus on adding unique human perspectives that AI cannot replicate</li>
<li>Create content frameworks that can be enhanced with AI assistance</li>
<li>Develop workflows that combine human creativity with AI efficiency</li>
</ol>

<h2>Conclusion</h2>
<p>In conclusion, the landscape of content creation is evolving rapidly, and staying adaptable is key to success. By embracing new technologies while maintaining focus on quality and authenticity, content creators can thrive in this new environment.</p>
<p>The future belongs to those who can effectively blend technological capabilities with human creativity and strategic thinking.</p>`;
    
    return expandedContent;
  };
  
  const handleSaveBlog = async (status: 'draft' | 'published') => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title required",
        description: "Please provide a title for your blog post"
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        variant: "destructive",
        title: "Content required",
        description: "Your blog post needs some content"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Create an excerpt from the content (strip HTML and limit length)
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const excerpt = tempDiv.textContent?.substring(0, 150) + '...';
      
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('You must be logged in to save blogs');
      }
      
      // Save to Supabase with the user_id
      const { data, error } = await supabase
        .from('blogs')
        .insert({
          title,
          content,
          excerpt,
          status,
          source_type: 'manual',
          seo_score: seoScore,
          user_id: session.user.id,
          ...(status === 'published' ? { published_at: new Date().toISOString() } : {})
        })
        .select();
        
      if (error) throw error;
      
      toast({
        title: status === 'published' ? "Blog published!" : "Draft saved",
        description: status === 'published' 
          ? "Your blog has been published successfully"
          : "Your draft has been saved"
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error saving blog:", error);
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: error.message || "An error occurred while saving your blog"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="text-3xl font-heading font-bold">Create New Blog</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm font-medium">SEO Score: {seoScore}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? "Edit Mode" : "Preview"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSaveBlog('draft')} 
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSaveBlog('published')} 
              disabled={loading}
            >
              <Send className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <Input 
              type="text"
              placeholder="Enter blog title..."
              className="text-2xl font-heading font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          {!isPreview ? (
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="editor">Write From Scratch</TabsTrigger>
                <TabsTrigger value="social">Generate From Social</TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor">
                <Card>
                  <CardContent className="p-4">
                    <TextEditor 
                      initialValue={content} 
                      onChange={setContent}
                      placeholder="Start writing your blog post..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="social">
                <SocialPostImporter onGenerate={handleGenerateFromSocial} />
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
                  <h1>{title || "Blog Title"}</h1>
                  <div dangerouslySetInnerHTML={{ __html: content || "<p>Your blog preview will appear here...</p>" }} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
