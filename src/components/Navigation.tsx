import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();

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
            <Link to="/" className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Xioverse
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;