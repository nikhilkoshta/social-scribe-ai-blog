
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Twitter, Linkedin, Mic, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SocialPostImporterProps {
  onGenerate: (content: string, source: string, title?: string, seoScore?: number) => void;
}

export default function SocialPostImporter({ onGenerate }: SocialPostImporterProps) {
  const [twitterContent, setTwitterContent] = useState("");
  const [linkedinContent, setLinkedinContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConnectingTwitter, setIsConnectingTwitter] = useState(false);
  const [isConnectingLinkedin, setIsConnectingLinkedin] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [twitterUserData, setTwitterUserData] = useState<any>(null);
  const [linkedinUserData, setLinkedinUserData] = useState<any>(null);
  
  // Check if user has connected social accounts
  const checkSocialConnections = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      // Check for Twitter connection
      const { data: twitterAccount } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('provider', 'twitter')
        .single();
      
      if (twitterAccount) {
        setTwitterConnected(true);
        setTwitterUserData(twitterAccount);
      }
      
      // Check for LinkedIn connection
      const { data: linkedinAccount } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('provider', 'linkedin')
        .single();
      
      if (linkedinAccount) {
        setLinkedinConnected(true);
        setLinkedinUserData(linkedinAccount);
      }
    } catch (error) {
      console.error("Error checking social connections:", error);
    }
  };
  
  const connectTwitter = async () => {
    try {
      setIsConnectingTwitter(true);
      
      // Call the Twitter auth edge function to get authorization URL
      const { data } = await supabase.functions.invoke('twitter-auth', {
        body: { mode: 'authorize' }
      });
      
      // Store the state in sessionStorage for verification
      sessionStorage.setItem('twitter_oauth_state', data.state);
      
      // Open the authorization URL in a popup
      const width = 600;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const popup = window.open(
        data.url,
        'twitter-oauth',
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      // Poll for redirect and code
      const checkPopup = setInterval(async () => {
        try {
          if (!popup || popup.closed) {
            clearInterval(checkPopup);
            setIsConnectingTwitter(false);
            return;
          }
          
          const currentUrl = popup.location.href;
          if (currentUrl.includes('code=')) {
            clearInterval(checkPopup);
            
            // Parse the code from the URL
            const urlParams = new URLSearchParams(new URL(currentUrl).search);
            const code = urlParams.get('code');
            const state = urlParams.get('state');
            
            // Verify state
            const savedState = sessionStorage.getItem('twitter_oauth_state');
            if (state !== savedState) {
              throw new Error('OAuth state mismatch');
            }
            
            // Exchange code for token
            const { data: tokenData } = await supabase.functions.invoke('twitter-auth', {
              body: { code, mode: 'token' }
            });
            
            // Close the popup
            popup.close();
            
            // Store the token in the database
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('User not authenticated');
            
            await supabase.from('social_accounts').upsert({
              user_id: session.user.id,
              provider: 'twitter',
              provider_id: tokenData.user.id,
              access_token: tokenData.token.access_token,
              refresh_token: tokenData.token.refresh_token,
              token_expires_at: new Date(Date.now() + tokenData.token.expires_in * 1000).toISOString()
            });
            
            setTwitterConnected(true);
            setTwitterUserData(tokenData.user);
            
            // Fetch tweets
            await fetchTweets(tokenData.token.access_token, tokenData.user.username);
            
            toast({
              title: "Twitter connected",
              description: `Connected as @${tokenData.user.username}`
            });
          }
        } catch (error) {
          console.error('Error in Twitter OAuth process:', error);
          clearInterval(checkPopup);
          toast({
            variant: "destructive",
            title: "Connection failed",
            description: "Could not connect to Twitter"
          });
        } finally {
          setIsConnectingTwitter(false);
        }
      }, 500);
      
    } catch (error) {
      console.error("Error connecting to Twitter:", error);
      setIsConnectingTwitter(false);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Could not connect to Twitter"
      });
    }
  };
  
  const connectLinkedin = async () => {
    try {
      setIsConnectingLinkedin(true);
      
      // Call the LinkedIn auth edge function to get authorization URL
      const { data } = await supabase.functions.invoke('linkedin-auth', {
        body: { mode: 'authorize' }
      });
      
      // Store the state in sessionStorage for verification
      sessionStorage.setItem('linkedin_oauth_state', data.state);
      
      // Open the authorization URL in a popup
      const width = 600;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const popup = window.open(
        data.url,
        'linkedin-oauth',
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      // Poll for redirect and code
      const checkPopup = setInterval(async () => {
        try {
          if (!popup || popup.closed) {
            clearInterval(checkPopup);
            setIsConnectingLinkedin(false);
            return;
          }
          
          const currentUrl = popup.location.href;
          if (currentUrl.includes('code=')) {
            clearInterval(checkPopup);
            
            // Parse the code from the URL
            const urlParams = new URLSearchParams(new URL(currentUrl).search);
            const code = urlParams.get('code');
            const state = urlParams.get('state');
            
            // Verify state
            const savedState = sessionStorage.getItem('linkedin_oauth_state');
            if (state !== savedState) {
              throw new Error('OAuth state mismatch');
            }
            
            // Exchange code for token
            const { data: tokenData } = await supabase.functions.invoke('linkedin-auth', {
              body: { code, mode: 'token' }
            });
            
            // Close the popup
            popup.close();
            
            // Store the token in the database
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('User not authenticated');
            
            await supabase.from('social_accounts').upsert({
              user_id: session.user.id,
              provider: 'linkedin',
              provider_id: tokenData.user.id,
              access_token: tokenData.token.access_token,
              refresh_token: tokenData.token.refresh_token,
              token_expires_at: new Date(Date.now() + tokenData.token.expires_in * 1000).toISOString()
            });
            
            setLinkedinConnected(true);
            setLinkedinUserData(tokenData.user);
            
            // Fetch LinkedIn posts
            await fetchLinkedinPosts(tokenData.token.access_token);
            
            toast({
              title: "LinkedIn connected",
              description: `Connected as ${tokenData.user.localizedFirstName} ${tokenData.user.localizedLastName}`
            });
          }
        } catch (error) {
          console.error('Error in LinkedIn OAuth process:', error);
          clearInterval(checkPopup);
          toast({
            variant: "destructive",
            title: "Connection failed",
            description: "Could not connect to LinkedIn"
          });
        } finally {
          setIsConnectingLinkedin(false);
        }
      }, 500);
      
    } catch (error) {
      console.error("Error connecting to LinkedIn:", error);
      setIsConnectingLinkedin(false);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Could not connect to LinkedIn"
      });
    }
  };
  
  const fetchTweets = async (accessToken: string, username: string) => {
    try {
      const { data: tweetsData } = await supabase.functions.invoke('twitter-fetch', {
        body: { accessToken, username }
      });
      
      if (tweetsData && tweetsData.data && tweetsData.data.length > 0) {
        // Take the first tweet/thread
        let threadContent = "";
        
        // Sort tweets by date (oldest first for thread reconstruction)
        const sortedTweets = [...tweetsData.data].sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        
        // Construct thread content
        sortedTweets.forEach(tweet => {
          threadContent += tweet.text + "\n\n";
        });
        
        setTwitterContent(threadContent.trim());
      }
    } catch (error) {
      console.error("Error fetching tweets:", error);
      toast({
        variant: "destructive",
        title: "Error fetching tweets",
        description: "Could not retrieve your tweets. Please try again."
      });
    }
  };
  
  const fetchLinkedinPosts = async (accessToken: string) => {
    try {
      const { data: postsData } = await supabase.functions.invoke('linkedin-fetch', {
        body: { accessToken }
      });
      
      if (postsData && postsData.elements && postsData.elements.length > 0) {
        // Take the first post
        const post = postsData.elements[0];
        if (post.specificContent && post.specificContent['com.linkedin.ugc.ShareContent']) {
          const postContent = post.specificContent['com.linkedin.ugc.ShareContent'].shareCommentary.text;
          setLinkedinContent(postContent);
        }
      }
    } catch (error) {
      console.error("Error fetching LinkedIn posts:", error);
      toast({
        variant: "destructive",
        title: "Error fetching posts",
        description: "Could not retrieve your LinkedIn posts. Please try again."
      });
    }
  };
  
  const handleGenerate = async (content: string, source: string) => {
    if (!content.trim()) {
      toast({
        variant: "destructive",
        title: "No content",
        description: "Please paste some content to generate a blog post"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call the Gemini API via edge function
      const { data, error } = await supabase.functions.invoke('generate-blog-gemini', {
        body: { content, source }
      });
      
      if (error) throw error;
      
      toast({
        title: "Blog post generated",
        description: "Your content has been successfully transformed into a blog post"
      });
      
      // Call the parent onGenerate function with enhanced data
      onGenerate(data.content, source, data.title, data.seo_score);
    } catch (error) {
      console.error("Error generating blog post:", error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "We couldn't generate content from your post. Please try again."
      });
    } finally {
      setIsGenerating(false);
    }
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
    
    setLinkedinContent(exampleLinkedInPost);
  };
  
  // Initialize social connections check
  useState(() => {
    checkSocialConnections();
  });
  
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
              <div className="flex gap-2">
                {!twitterConnected ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={connectTwitter}
                    disabled={isConnectingTwitter}
                  >
                    {isConnectingTwitter ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                        Connect Twitter
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-500"
                    disabled
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Connected
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleTwitterExample}>
                  Load Example
                </Button>
              </div>
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
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                    Generate Blog Post
                  </>
                )}
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
              <div className="flex gap-2">
                {!linkedinConnected ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={connectLinkedin}
                    disabled={isConnectingLinkedin}
                  >
                    {isConnectingLinkedin ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Linkedin className="h-4 w-4 mr-2 text-[#0077B5]" />
                        Connect LinkedIn
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-700"
                    disabled
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    Connected
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleLinkedInExample}>
                  Load Example
                </Button>
              </div>
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
                  onChange={(e) => setLinkedinContent(e.target.value)}
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
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                    Generate Blog Post
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
