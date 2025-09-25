import Navigation from '@/components/Navigation';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Edit, DollarSign, Clock, Gavel, HandHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for owned assets
const mockOwnedAssets = [
  {
    id: 'owned-watch1',
    type: 'watch',
    name: 'Cyber Genesis #001',
    image: '/src/assets/cyber-watch.jpg',
    rarityScore: 98.7,
    tokenId: '001',
    components: {
      strap: { name: 'Cyber Strap', theme: 'Neon', rarity: 'Ultra Rare', score: 95.2 },
      dial: { name: 'Genesis Dial', theme: 'Holographic', rarity: 'Legendary', score: 98.1 },
      hologram: { name: 'Quantum Hologram', theme: 'Cyber', rarity: 'Mythic', score: 99.8 },
      item: { name: 'Time Crystal', theme: 'Ethereal', rarity: 'Divine', score: 100 }
    },
    listing: null, // Not listed
    bids: [],
    offers: [{ amount: 2.5, user: '0x1234...5678', expires: '2024-01-15' }]
  },
  {
    id: 'owned-trait1',
    type: 'trait',
    traitType: 'Strap',
    name: 'Golden Strap',
    image: '/src/assets/golden-trait.jpg',
    rarity: 'Legendary',
    theme: 'Gold',
    rarityScore: 92.4,
    tokenId: '456',
    listing: { type: 'sale', price: 1.2 }, // Listed for sale
    bids: [],
    offers: []
  },
  {
    id: 'owned-watch2',
    type: 'watch',
    name: 'Classic Elegance #789',
    image: '/src/assets/watch-hero.jpg',
    rarityScore: 87.3,
    tokenId: '789',
    components: {
      strap: { name: 'Leather Strap', theme: 'Classic', rarity: 'Rare', score: 78.5 },
      dial: { name: 'Roman Dial', theme: 'Traditional', rarity: 'Epic', score: 89.2 },
      hologram: { name: 'Time Vortex', theme: 'Mystic', rarity: 'Legendary', score: 94.7 },
      item: { name: 'Chronos Gem', theme: 'Ancient', rarity: 'Mythic', score: 97.1 }
    },
    listing: { type: 'auction', startPrice: 0.5, currentBid: 1.8, endTime: '2024-01-20' },
    bids: [{ amount: 1.8, user: '0xabcd...efgh', time: '2024-01-10' }],
    offers: []
  }
];

const Sell = () => {
  const [assets, setAssets] = useState(mockOwnedAssets);
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('all');
  const [listingDialog, setListingDialog] = useState({ open: false, asset: null });
  const navigate = useNavigate();

  const filteredAssets = assets.filter(asset => {
    if (filterType === 'all') return true;
    return asset.type === filterType;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rarity-high':
        return (b.rarityScore || 0) - (a.rarityScore || 0);
      case 'rarity-low':
        return (a.rarityScore || 0) - (b.rarityScore || 0);
      case 'token-high':
        return parseInt(b.tokenId) - parseInt(a.tokenId);
      case 'token-low':
        return parseInt(a.tokenId) - parseInt(b.tokenId);
      default:
        return 0;
    }
  });

  const getAssetLabel = (asset) => {
    if (asset.type === 'watch') return 'Watch';
    return asset.traitType;
  };

  const getListingStatus = (asset) => {
    if (!asset.listing) return 'Not Listed';
    return asset.listing.type === 'auction' ? 'Auction' : 'For Sale';
  };

  const handleAssetClick = (asset) => {
    navigate(`/my-asset/${asset.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Your Collection
          </h1>
          <p className="text-muted-foreground">
            Manage your owned NFTs, create listings, and accept offers.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rarity-high">Rarity Score (High)</SelectItem>
                <SelectItem value="rarity-low">Rarity Score (Low)</SelectItem>
                <SelectItem value="token-high">Token ID (High)</SelectItem>
                <SelectItem value="token-low">Token ID (Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter:</span>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="watch">Watches</SelectItem>
                <SelectItem value="trait">Traits</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="relative cursor-pointer" onClick={() => handleAssetClick(asset)}>
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {getAssetLabel(asset)}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  {asset.type === 'watch' ? (
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {asset.rarityScore}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {asset.rarity}
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge 
                    variant={asset.listing ? 'default' : 'secondary'} 
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    {getListingStatus(asset)}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{asset.name}</h3>
                  <p className="text-sm text-muted-foreground">Token ID: #{asset.tokenId}</p>
                </div>

                {asset.listing && (
                  <div className="text-sm">
                    {asset.listing.type === 'auction' ? (
                      <div>
                        <p className="text-muted-foreground">Current Bid: <span className="text-primary font-semibold">{asset.listing.currentBid} ETH</span></p>
                        <p className="text-muted-foreground">Ends: {asset.listing.endTime}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Listed for: <span className="text-primary font-semibold">{asset.listing.price} ETH</span></p>
                    )}
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  {!asset.listing ? (
                    <Button 
                      className="w-full" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setListingDialog({ open: true, asset });
                      }}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      List Item
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setListingDialog({ open: true, asset });
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Listing
                    </Button>
                  )}

                  {asset.bids.length > 0 && (
                    <Button variant="gaming" className="w-full" onClick={(e) => e.stopPropagation()}>
                      <Gavel className="w-4 h-4 mr-2" />
                      Accept Bid ({asset.bids.length})
                    </Button>
                  )}

                  {asset.offers.length > 0 && (
                    <Button variant="nft" className="w-full" onClick={(e) => e.stopPropagation()}>
                      <HandHeart className="w-4 h-4 mr-2" />
                      Accept Offer ({asset.offers.length})
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Listing Dialog */}
        <Dialog open={listingDialog.open} onOpenChange={(open) => setListingDialog({ open, asset: null })}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {listingDialog.asset?.listing ? 'Edit Listing' : 'Create Listing'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Listing Type</Label>
                <Select defaultValue="sale">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Fixed Price</SelectItem>
                    <SelectItem value="auction">Auction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price (ETH)</Label>
                <Input placeholder="Enter price..." />
              </div>
              <div>
                <Label>Duration (Days)</Label>
                <Input placeholder="7" type="number" />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  {listingDialog.asset?.listing ? 'Update Listing' : 'Create Listing'}
                </Button>
                <Button variant="outline" onClick={() => setListingDialog({ open: false, asset: null })}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Sell;