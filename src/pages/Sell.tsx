import Navigation from '@/components/Navigation';

const Sell = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Sell Your NFTs
          </h1>
          <p className="text-muted-foreground mb-8">
            This page will show your owned NFTs for selling. Coming soon!
          </p>
          <div className="bg-card border border-border/50 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-xl font-semibold mb-2">Under Construction</h2>
            <p className="text-muted-foreground">
              The sell functionality will be implemented soon. This page will display your owned NFTs with sell options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;