import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Wallet, Apple } from 'lucide-react';

interface LoginPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
  onLoginSuccess?: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onOpenChange, message, onLoginSuccess }) => {
  const handleLogin = () => {
    // Simulate successful login
    console.log('Login successful - simulated for development');
    onLoginSuccess?.(); // Call the success callback to update login state
    onOpenChange(false); // Close the popup
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider} - simulated for development`);
    handleLogin();
  };

  const handleWalletLogin = () => {
    console.log('Login with wallet - simulated for development');
    handleLogin();
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login with email - simulated for development');
    handleLogin();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome to Xioverse</DialogTitle>
          {message && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              {message}
            </p>
          )}
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          {/* Social Login Buttons */}
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
            onClick={() => handleSocialLogin('Twitter')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Continue with Twitter
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
            onClick={handleWalletLogin}
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
            onClick={() => handleSocialLogin('Apple')}
          >
            <Apple className="w-5 h-5" />
            Continue with Apple
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
            onClick={() => handleSocialLogin('Google')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Gmail
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Sign In with Email
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={handleLogin}
            >
              Sign up
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;