import Navigation from '@/components/Navigation';

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Unlock the Future
            </h1>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Xioverse offers customizable virtual watches that enhance your gaming experience. These watches integrate with multiple games, unlocking new abilities and rewards, while also offering AR features to bring them to life in the real world.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Features:</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold min-w-[140px]">Augmented Reality:</span>
                  <span>Bring your watch into the real world with immersive AR interactions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold min-w-[140px]">Game Integration:</span>
                  <span>Unlock functional power-ups, aesthetics, and more across different games.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold min-w-[140px]">Customization:</span>
                  <span>Dismantle, swap traits, and reassemble your watch to match your style and needs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold min-w-[140px]">20 Unique Themes:</span>
                  <span>Choose from 20 diverse themes, from futuristic to classic, to make your watch truly yours.</span>
                </li>
              </ul>
              
              <p className="mt-6 text-lg font-medium text-foreground">
                Transform your gaming experience and digital identity with Xioverse watches.
              </p>
            </div>
          </div>
          
          {/* Video Section */}
          <div className="relative">
            <div className="aspect-video bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg">
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
        </div>
      </div>
    </div>
  );
};

export default Overview;