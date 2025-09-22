import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, ExternalLink, Timer, Users, Trophy } from 'lucide-react';
import watchHero from '@/assets/watch-hero.jpg';
import cyberWatch from '@/assets/cyber-watch.jpg';
import goldenTrait from '@/assets/golden-trait.jpg';
import traitHero from '@/assets/trait-hero.jpg';

interface Asset {
  id: string;
  type: 'watch' | 'trait';
  name: string;
  image: string;
  rarity: number;
  tokenId: string;
  owner: string;
  lastSalePrice?: number;
  listingType: 'auction' | 'buyNow' | 'both' | 'makeOffer';
  currentPrice?: number;
  highestBid?: number;
  timeRemaining?: string;
  // Watch specific
  components?: {
    strap: { name: string; theme: string; rarity: number; video?: string };
    dial: { name: string; theme: string; rarity: number; video?: string };
    hologram: { name: string; theme: string; rarity: number; video?: string };
    item: { name: string; theme: string; rarity: number; video?: string };
  };
  // Trait specific
  theme?: string;
  traitType?: string;
  lore?: string;
}

const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [makeOfferAmount, setMakeOfferAmount] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; component?: string }>({ isOpen: false });

  // Mock data based on ID
  useEffect(() => {
    if (!id) return;
    
    const isWatch = id.includes('watch');
    const mockAsset: Asset = {
      id,
      type: isWatch ? 'watch' : 'trait',
      name: isWatch ? 'Cyber Genesis Watch #1247' : 'Alien Strap Component',
      image: isWatch ? watchHero : goldenTrait,
      rarity: isWatch ? 95.2 : 87.5,
      tokenId: `#${id}`,
      owner: '0x742d35Cc6C6C4532BC558B40c22469DDC38C95e1',
      lastSalePrice: 2.5,
      listingType: Math.random() > 0.5 ? 'both' : Math.random() > 0.5 ? 'auction' : 'buyNow',
      currentPrice: 3.2,
      highestBid: 2.8,
      timeRemaining: '2d 14h 32m'
    };

    if (isWatch) {
      mockAsset.components = {
        strap: { name: 'Cyber Strap Alpha', theme: 'Alien', rarity: 89.3, video: '/videos/strap.mp4' },
        dial: { name: 'Quantum Dial', theme: 'Aquatic', rarity: 92.1, video: '/videos/dial.mp4' },
        hologram: { name: 'Genesis Hologram', theme: 'Cyber', rarity: 95.7, video: '/videos/hologram.mp4' },
        item: { name: 'Power Core', theme: 'Ancient', rarity: 88.4, video: '/videos/item.mp4' }
      };
    } else {
      mockAsset.theme = 'Alien';
      mockAsset.traitType = 'Strap';
      mockAsset.lore = 'Forged in the depths of an alien world, this strap pulses with otherworldly energy that synchronizes with the wearer\'s biorhythm.';
    }

    setAsset(mockAsset);
  }, [id]);

  const handleMakeOffer = () => {
    console.log('Making offer:', makeOfferAmount);
    // Implementation for making offer
  };

  const handleBuyNow = () => {
    console.log('Buying now at:', asset?.currentPrice);
    // Implementation for buy now
  };

  const handlePlaceBid = () => {
    console.log('Placing bid:', bidAmount);
    // Implementation for placing bid
  };

  const openVideo = (component: string) => {
    setVideoModal({ isOpen: true, component });
  };

  if (!asset) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Asset not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image section */}
          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <img 
                    src={asset.image} 
                    alt={asset.name}
                    className="w-full rounded-lg shadow-gaming group-hover:shadow-glow transition-all duration-300"
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">Click to expand</p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src={asset.image} 
                  alt={asset.name}
                  className="w-full h-auto rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Details section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{asset.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  <Trophy className="mr-1 h-3 w-3" />
                  Rarity: {asset.rarity}%
                </Badge>
                <Badge variant="outline">{asset.tokenId}</Badge>
              </div>
            </div>

            {/* Asset Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Owner</p>
                    <p className="font-mono text-xs">{asset.owner}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Blockchain</p>
                    <p className="font-semibold">ERC SKALE</p>
                  </div>
                  {asset.lastSalePrice && (
                    <div>
                      <p className="text-muted-foreground">Last Sale</p>
                      <p className="font-semibold">{asset.lastSalePrice} ETH</p>
                    </div>
                  )}
                </div>

                {asset.theme && (
                  <div>
                    <p className="text-muted-foreground">Theme</p>
                    <p className="font-semibold">{asset.theme}</p>
                  </div>
                )}

                {asset.traitType && (
                  <div>
                    <p className="text-muted-foreground">Trait Type</p>
                    <p className="font-semibold">{asset.traitType}</p>
                  </div>
                )}

                {asset.lore && (
                  <div>
                    <p className="text-muted-foreground">Lore</p>
                    <p className="text-sm leading-relaxed">{asset.lore}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Components (for watches) */}
            {asset.type === 'watch' && asset.components && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Components</h3>
                  <div className="space-y-3">
                    {Object.entries(asset.components).map(([type, component]) => (
                      <div key={type} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <div>
                          <button
                            onClick={() => openVideo(type)}
                            className="font-medium hover:text-primary transition-colors cursor-pointer flex items-center gap-2"
                          >
                            {component.name}
                            <ExternalLink className="h-3 w-3" />
                          </button>
                          <p className="text-sm text-muted-foreground">{component.theme} • Rarity: {component.rarity}%</p>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">{type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Purchase options */}
            <Card>
              <CardContent className="p-6 space-y-4">
                {asset.listingType === 'auction' && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Highest Bid</span>
                        <span className="font-semibold">{asset.highestBid} ETH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Timer className="h-4 w-4" />
                          Time Remaining
                        </span>
                        <span className="font-semibold">{asset.timeRemaining}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter bid amount (ETH)"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                      <Button onClick={handlePlaceBid} className="min-w-[100px]">
                        Place Bid
                      </Button>
                    </div>
                  </>
                )}

                {(asset.listingType === 'buyNow' || asset.listingType === 'both') && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Price</span>
                      <span className="text-xl font-bold">{asset.currentPrice} ETH</span>
                    </div>
                    <Button onClick={handleBuyNow} className="w-full" variant="gaming">
                      Buy Now
                    </Button>
                  </div>
                )}

                {(asset.listingType === 'buyNow' || asset.listingType === 'both' || asset.listingType === 'makeOffer') && (
                  <>
                    {asset.listingType === 'both' && <div className="border-t pt-3" />}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Make an Offer</label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Enter offer amount (ETH)"
                          value={makeOfferAmount}
                          onChange={(e) => setMakeOfferAmount(e.target.value)}
                        />
                        <Button onClick={handleMakeOffer} variant="outline" className="min-w-[100px]">
                          Make Offer
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {asset.listingType === 'both' && (
                  <div className="space-y-3 border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Highest Bid</span>
                      <span className="font-semibold">{asset.highestBid} ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        Time Remaining
                      </span>
                      <span className="font-semibold">{asset.timeRemaining}</span>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter bid amount (ETH)"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                      <Button onClick={handlePlaceBid} variant="premium" className="min-w-[100px]">
                        Place Bid
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoModal.isOpen} onOpenChange={(open) => setVideoModal({ isOpen: open })}>
        <DialogContent className="max-w-4xl">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Video player for {videoModal.component} component</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetDetail;