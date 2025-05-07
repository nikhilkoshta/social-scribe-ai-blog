
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Twitter, Linkedin, PlusCircle, BookOpen, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [linkedAccounts, setLinkedAccounts] = useState<{ twitter: boolean; linkedin: boolean }>({
    twitter: false,
    linkedin: false
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
        return;
      }
      
      // Fetch user's blogs
      fetchUserBlogs();
      
      // Check if social accounts are linked
      checkLinkedAccounts();
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  const fetchUserBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setBlogs(data || []);
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast({
        variant: "destructive",
        title: "Error loading blogs",
        description: error.message
      });
    }
  };
  
  const checkLinkedAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('social_accounts')
        .select('provider')
        
      if (error) throw error;
      
      const accounts = data || [];
      setLinkedAccounts({
        twitter: accounts.some(acc => acc.provider === 'twitter'),
        linkedin: accounts.some(acc => acc.provider === 'linkedin')
      });
    } catch (error) {
      console.error("Error checking linked accounts:", error);
    }
  };
  
  const handleCreateBlog = () => {
    navigate("/create");
  };
  
  const handleConnectSocial = (provider: string) => {
    toast({
      title: "Coming soon",
      description: `${provider} integration will be available soon!`
    });
  };
  
  const handleViewBlog = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Your Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your blog content and social connections</p>
          </div>
          <Button size="lg" onClick={handleCreateBlog}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Blog
          </Button>
        </div>
        
        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="blogs" className="text-sm md:text-base">
              <FileText className="mr-2 h-4 w-4" /> Your Blogs
            </TabsTrigger>
            <TabsTrigger value="connections" className="text-sm md:text-base">
              <BookOpen className="mr-2 h-4 w-4" /> Social Connections
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="blogs">
            {blogs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-6">
                      <CardTitle className="truncate">{blog.title}</CardTitle>
                      <CardDescription>
                        {blog.source_type === "twitter" ? (
                          <div className="flex items-center">
                            <Twitter className="h-4 w-4 mr-1 text-[#1DA1F2]" />
                            <span>From Twitter</span>
                          </div>
                        ) : blog.source_type === "linkedin" ? (
                          <div className="flex items-center">
                            <Linkedin className="h-4 w-4 mr-1 text-[#0077B5]" />
                            <span>From LinkedIn</span>
                          </div>
                        ) : (
                          <span>Manual Entry</span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <p className="text-muted-foreground line-clamp-3">
                        {blog.excerpt || blog.content.substring(0, 150) + "..."}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 border-t flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`inline-block h-3 w-3 rounded-full mr-2 ${blog.status === "published" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                        <span className="text-sm text-muted-foreground">{blog.status === "published" ? "Published" : "Draft"}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewBlog(blog.id)}>
                        View
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50 border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                  <p className="text-muted-foreground mb-6">You haven't created any blogs yet. Get started by creating your first blog.</p>
                  <Button onClick={handleCreateBlog}>Create Your First Blog</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="connections">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Twitter className="h-5 w-5 mr-2 text-[#1DA1F2]" /> Twitter Connection
                  </CardTitle>
                  <CardDescription>
                    Connect your Twitter account to import tweets and threads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {linkedAccounts.twitter ? (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Connected</p>
                      <p className="text-xs text-muted-foreground mt-1">Your Twitter account is linked and ready to use</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Not connected. Link your Twitter account to turn your tweets into blog posts.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant={linkedAccounts.twitter ? "outline" : "default"}
                    className="w-full"
                    onClick={() => handleConnectSocial("Twitter")}
                  >
                    {linkedAccounts.twitter ? "Reconnect Account" : "Connect Twitter"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Linkedin className="h-5 w-5 mr-2 text-[#0077B5]" /> LinkedIn Connection
                  </CardTitle>
                  <CardDescription>
                    Connect your LinkedIn account to import posts and articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {linkedAccounts.linkedin ? (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Connected</p>
                      <p className="text-xs text-muted-foreground mt-1">Your LinkedIn account is linked and ready to use</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Not connected. Link your LinkedIn account to turn your posts into blog content.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant={linkedAccounts.linkedin ? "outline" : "default"}
                    className="w-full"
                    onClick={() => handleConnectSocial("LinkedIn")}
                  >
                    {linkedAccounts.linkedin ? "Reconnect Account" : "Connect LinkedIn"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
