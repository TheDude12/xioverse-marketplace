import Navigation from '@/components/Navigation';

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-16">        
        {/* Main Content Grid - Centered */}
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl">
            {/* Video Section - Left Side */}
            <div className="relative">
              <div className="aspect-[9/16] bg-card border border-border/50 rounded-lg overflow-hidden shadow-2xl max-w-md mx-auto lg:mx-0">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  poster="/assets/watch-hero.jpg"
                >
                  <source src="/assets/clockhead-showcase.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Content Section - Right Side */}
            <div className="space-y-8">
              {/* Header centered above text */}
              <div className="text-center">
                <h1 className="text-6xl md:text-7xl font-black bg-gradient-primary bg-clip-text text-transparent leading-none tracking-tight">
                  UNLOCK<br />THE<br />FUTURE
                </h1>
              </div>
              
              {/* Text Content */}
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Xioverse offers customizable virtual watches that enhance your gaming experience. These watches integrate with multiple games, unlocking new abilities and rewards, while also offering AR features to bring them to life in the real world.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Key Features:</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Augmented Reality:</h4>
                      <p>Bring your watch into the real world with immersive AR interactions.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Game Integration:</h4>
                      <p>Unlock functional power-ups, aesthetics, and more across different games.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Customization:</h4>
                      <p>Dismantle, swap traits, and reassemble your watch to match your style and needs.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-1">20 Unique Themes:</h4>
                      <p>Choose from 20 diverse themes, from futuristic to classic, to make your watch truly yours.</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl font-medium pt-4">
                  Transform your gaming experience and digital identity with Xioverse watches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;