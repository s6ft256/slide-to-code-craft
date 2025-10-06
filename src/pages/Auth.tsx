import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Github, Mail } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, isLoading, isUsingLocalStorage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const handleAnonymousSignIn = async () => {
    setError(null);
    setIsAuthenticating(true);
    
    try {
      const { error } = await signIn.anonymously();
      
      if (error) {
        setError(error.message);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsAuthenticating(true);

    try {
      const { error } = await signIn.withEmail(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsAuthenticating(true);

    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        setError(null);
        alert("Check your email for the confirmation link.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setError(null);
    setIsAuthenticating(true);

    try {
      const { error } = await signIn.withOAuth(provider);
      
      if (error) {
        setError(error.message);
      }
      // The redirect happens automatically with OAuth
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">HSE Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Health, Safety & Environment Management System
          </p>
        </div>

        {isUsingLocalStorage && (
        <Alert className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
          <AlertDescription className="text-sm">
            <strong>Development Mode:</strong> Using localStorage for authentication. No actual authentication will occur.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/90">
          <CardHeader>
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button 
                variant="outline" 
                className="flex gap-2"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isAuthenticating}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="flex gap-2"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isAuthenticating}
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </Button>
              
              <Button 
                variant="outline" 
                className="flex gap-2"
                onClick={handleAnonymousSignIn}
                disabled={isAuthenticating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                  <circle cx="12" cy="9" r="3"></circle>
                  <path d="M17.5 20h.5a2 2 0 002-2v-1.5a2.5 2.5 0 00-2.5-2.5h-10A2.5 2.5 0 005 16.5V18a2 2 0 002 2h.5"></path>
                </svg>
                Continue as Guest
              </Button>
              
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleEmailSignIn}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Input 
                          type="email" 
                          id="email" 
                          placeholder="Email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Input 
                          type="password" 
                          id="password" 
                          placeholder="Password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required 
                        />
                      </div>
                      
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isAuthenticating}
                      >
                        {isAuthenticating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            Sign In with Email
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleEmailSignUp}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Input 
                          type="email" 
                          id="email" 
                          placeholder="Email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Input 
                          type="password" 
                          id="password" 
                          placeholder="Password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required 
                        />
                      </div>
                      
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isAuthenticating}
                      >
                        {isAuthenticating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing Up...
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            Sign Up with Email
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}