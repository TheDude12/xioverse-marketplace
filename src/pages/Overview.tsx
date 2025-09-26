import Navigation from '@/components/Navigation';

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-black bg-gradient-primary bg-clip-text text-transparent leading-none tracking-tight">
            UNLOCK<br />THE<br />FUTURE
          </h1>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          {/* Video Section - Left Side */}
          <div className="relative lg:order-1">
            <div className="aspect-[9/16] bg-card border border-border/50 rounded-lg overflow-hidden shadow-2xl max-w-md mx-auto">
              <video 
                className="w-full h-full object-cover"
                controls
                poster="/assets/watch-hero.jpg"
              >
                <source src="/assets/clockhead-showcase.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* Content Section - Right Side */}
          <div className="space-y-8 lg:order-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Xioverse offers customizable virtual watches that enhance your gaming experience. These watches integrate with multiple games, unlocking new abilities and rewards, while also offering AR features to bring them to life in the real world.
            </p>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Key Features:</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">Augmented Reality:</h4>
                  <p className="text-muted-foreground">Bring your watch into the real world with immersive AR interactions.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">Game Integration:</h4>
                  <p className="text-muted-foreground">Unlock functional power-ups, aesthetics, and more across different games.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">Customization:</h4>
                  <p className="text-muted-foreground">Dismantle, swap traits, and reassemble your watch to match your style and needs.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">20 Unique Themes:</h4>
                  <p className="text-muted-foreground">Choose from 20 diverse themes, from futuristic to classic, to make your watch truly yours.</p>
                </div>
              </div>
            </div>
            
            <p className="text-xl font-medium text-foreground pt-6">
              Transform your gaming experience and digital identity with Xioverse watches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;