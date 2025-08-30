import Navigation from '@/components/Navigation';

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Market Overview
          </h1>
          <p className="text-muted-foreground mb-8">
            Comprehensive market analytics and insights. Coming soon!
          </p>
          <div className="bg-card border border-border/50 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-xl font-semibold mb-2">Analytics Dashboard</h2>
            <p className="text-muted-foreground">
              Market overview with trading statistics, price trends, and collection insights will be available here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;