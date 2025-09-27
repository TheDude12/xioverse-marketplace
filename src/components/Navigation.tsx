import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import xioverseLogoImg from '@/assets/xioverse-logo.png';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLogin = () => {
    // TODO: Open login popup when implemented
    console.log('Login popup to be implemented');
  };

  const navItems = [
    { name: 'Buy', path: '/', current: location.pathname === '/' },
    { name: 'Sell', path: '/sell', current: location.pathname === '/sell' },
    { name: 'Overview', path: '/overview', current: location.pathname === '/overview' },
  ];

  return (
    <nav className="w-full bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src={xioverseLogoImg} 
                alt="Xioverse" 
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    item.current
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleExternalLink('https://www.mint.xioverse.com')}
                className="text-muted-foreground hover:text-foreground"
              >
                Mint
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleExternalLink('https://xioverse.com')}
                className="text-muted-foreground hover:text-foreground"
              >
                Website
              </Button>
              
              <Button
                variant="premium"
                size="sm"
                onClick={handleLogin}
                className="ml-4"
              >
                Log In
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background border-border">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                        item.current
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="border-t border-border pt-4 space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        handleExternalLink('https://www.mint.xioverse.com');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Mint
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        handleExternalLink('https://xioverse.com');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Website
                    </Button>
                    
                    <Button
                      variant="premium"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => {
                        handleLogin();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Log In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;