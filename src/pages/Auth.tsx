
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Twitter, Linkedin, ArrowLeft, Github, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      } else {
        setIsVisible(true);
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/dashboard");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Check your email",
        description: "We've sent you a magic link to verify your account",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Invalid login credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'twitter' | 'linkedin_oidc' | 'github' | 'google') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error with social login",
        description: error.message,
      });
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: "demo@socialscribe.app",
        password: "demo123456"
      });
      
      if (error) throw error;
      
      toast({
        title: "Welcome to the demo",
        description: "You are now using a limited demo account. Enjoy exploring SocialScribe!",
      });
    } catch (error: any) {
      // If demo account doesn't exist, create it
      try {
        const { error: signUpError } = await supabase.auth.signUp({
          email: "demo@socialscribe.app",
          password: "demo123456",
          options: {
            data: {
              full_name: "Demo User",
              is_demo: true
            }
          }
        });
        
        if (signUpError) throw signUpError;
        
        // Try to sign in immediately
        await supabase.auth.signInWithPassword({
          email: "demo@socialscribe.app",
          password: "demo123456"
        });
        
        toast({
          title: "Welcome to the demo",
          description: "Demo account created. You are now using a limited demo account.",
        });
      } catch (demoError: any) {
        toast({
          variant: "destructive",
          title: "Demo account error",
          description: demoError.message || "Could not access demo account",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) {
    return <div className="h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background/95 to-background/90 p-4">
      <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <button 
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </button>

        <Card className="w-full max-w-md shadow-xl border-primary/10">
          <CardHeader className="text-center space-y-1">
            <h1 className="text-2xl font-bold">{isSignUp ? "Create an account" : "Welcome back"}</h1>
            <p className="text-muted-foreground">
              {isSignUp 
                ? "Enter your details to create your account" 
                : "Enter your credentials to access your account"}
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleOAuthSignIn('twitter')}
                  disabled={loading}
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleOAuthSignIn('linkedin_oidc')}
                  disabled={loading}
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleOAuthSignIn('github')}
                  disabled={loading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleOAuthSignIn('google')}
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path 
                      fill="currentColor" 
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                    />
                    <path 
                      fill="currentColor" 
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                    />
                    <path 
                      fill="currentColor" 
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                    />
                    <path 
                      fill="currentColor" 
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                    />
                  </svg>
                  Google
                </Button>
              </div>
              
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleDemoLogin}
                disabled={loading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Try Demo Account
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailSignIn}>
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      placeholder="John Doe" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={isSignUp}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {!isSignUp && (
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: "Coming soon",
                            description: "Password reset functionality is coming soon"
                          });
                        }}
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder={isSignUp ? "Create a secure password" : "Enter your password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {isSignUp && (
                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                )}

                <Button type="submit" className="w-full mt-4" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                      {isSignUp ? "Creating account..." : "Signing in..."}
                    </div>
                  ) : (
                    isSignUp ? "Create account" : "Sign in"
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button 
                    className="text-primary hover:underline" 
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button 
                    className="text-primary hover:underline" 
                    onClick={() => setIsSignUp(true)}
                  >
                    Create one
                  </button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
