import Navigation from '@/components/Navigation';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowLeft, 
  ChevronDown, 
  ExternalLink, 
  DollarSign, 
  Edit, 
  Gavel, 
  HandHeart, 
  X,
  Trash2,
  Play
} from 'lucide-react';

// Mock data - this would come from your API/state management
const mockAssets = [
  {
    id: 'owned-watch1',
    type: 'watch',
    name: 'Cyber Genesis #001',
    image: '/src/assets/cyber-watch.jpg',
    rarityScore: 98.7,
    tokenId: '001',
    owner: '0x1234567890abcdef1234567890abcdef12345678',
    lastSalePrice: 1.5,
    components: {
      strap: { name: 'Cyber Strap', theme: 'Neon', rarity: 'Ultra Rare', score: 95.2 },
      dial: { name: 'Genesis Dial', theme: 'Holographic', rarity: 'Legendary', score: 98.1 },
      hologram: { name: 'Quantum Hologram', theme: 'Cyber', rarity: 'Mythic', score: 99.8 },
      item: { name: 'Time Crystal', theme: 'Ethereal', rarity: 'Divine', score: 100 }
    },
    listing: null,
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
    owner: '0x1234567890abcdef1234567890abcdef12345678',
    lastSalePrice: 0.8,
    lore: 'Forged in the ancient fires of Mount Chronos, this golden strap channels the power of time itself.',
    listing: { type: 'sale', price: 1.2 },
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
    owner: '0x1234567890abcdef1234567890abcdef12345678',
    lastSalePrice: 2.1,
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

const AssetOwnerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedImage, setExpandedImage] = useState(false);
  const [componentVideo, setComponentVideo] = useState({ open: false, component: null });
  const [listingDialog, setListingDialog] = useState({ open: false, type: 'create' });
  const [acceptDialog, setAcceptDialog] = useState({ open: false, type: null, item: null });
  const [listingType, setListingType] = useState('sale');
  const [price, setPrice] = useState('');
  const [auctionPrice, setAuctionPrice] = useState('');
  const [reservePrice, setReservePrice] = useState('');
  const [duration, setDuration] = useState('7');

  const asset = mockAssets.find(a => a.id === id);

  if (!asset) {
    return <div>Asset not found</div>;
  }

  const abbreviateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleAddressClick = (address) => {
    window.open(`https://explorer.skale.network/address/${address}`, '_blank');
  };

  const handleTokenClick = (tokenId) => {
    window.open(`https://explorer.skale.network/token/${tokenId}`, '_blank');
  };

  const handleComponentClick = (component) => {
    setComponentVideo({ open: true, component });
  };

  const handleRemoveListing = (type = 'all') => {
    // Handle remove listing logic based on type
    console.log(`Removing listing type: ${type}`);
    setListingDialog({ open: false, type: 'create' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/sell')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <img
                src={asset.image}
                alt={asset.name}
                className="w-full h-96 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setExpandedImage(true)}
              />
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{asset.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>Token ID: #{asset.tokenId}</span>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto text-muted-foreground"
                  onClick={() => handleTokenClick(asset.tokenId)}
                >
                  ERC SKALE <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">Owner:</span>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => handleAddressClick(asset.owner)}
                >
                  {abbreviateAddress(asset.owner)} <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
              {asset.lastSalePrice && (
                <p className="text-sm text-muted-foreground mb-4">
                  Last Sale: {asset.lastSalePrice} ETH
                </p>
              )}
            </div>

            {/* Asset-specific details */}
            {asset.type === 'watch' ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Watch Details</h3>
                  <Badge variant="outline">Rarity Score: {asset.rarityScore}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(asset.components).map(([key, component]) => (
                    <div key={key} className="space-y-2">
                      <h4 className="font-medium capitalize">{key}</h4>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left justify-start"
                        onClick={() => handleComponentClick({ type: key, ...component })}
                      >
                        <div>
                          <p className="font-medium">{component.name}</p>
                          <p className="text-sm text-muted-foreground">Theme: {component.theme}</p>
                          <p className="text-sm text-muted-foreground">Rarity: {component.rarity}</p>
                          <p className="text-sm text-muted-foreground">Score: {component.score}</p>
                        </div>
                        <Play className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Trait Details</h3>
                  <Badge variant="outline">{asset.rarity}</Badge>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <p className="font-medium">{asset.traitType}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Theme:</span>
                      <p className="font-medium">{asset.theme}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Rarity Score:</span>
                    <p className="font-medium">{asset.rarityScore}</p>
                  </div>
                  {asset.lore && (
                    <div>
                      <span className="text-sm text-muted-foreground">Lore:</span>
                      <p className="text-sm mt-1">{asset.lore}</p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Current Listing Status */}
            {asset.listing && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Current Listing</h3>
                {asset.listing.type === 'auction' ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Auction</p>
                    <p className="text-lg font-semibold">Current Bid: {asset.listing.currentBid} ETH</p>
                    <p className="text-sm text-muted-foreground">Ends: {asset.listing.endTime}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Fixed Price</p>
                    <p className="text-lg font-semibold">Price: {asset.listing.price} ETH</p>
                  </div>
                )}
              </Card>
            )}

            {/* Owner Actions */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                {!asset.listing ? (
                  <Button 
                    className="w-full"
                    onClick={() => setListingDialog({ open: true, type: 'create' })}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    List Item
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setListingDialog({ open: true, type: 'edit' })}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Listing
                  </Button>
                )}

                {asset.bids.length > 0 && (
                  <Button 
                    variant="gaming" 
                    className="w-full"
                    onClick={() => setAcceptDialog({ open: true, type: 'bid', item: asset.bids[0] })}
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    Accept Bid ({asset.bids.length})
                  </Button>
                )}

                {asset.offers.length > 0 && (
                  <Button 
                    variant="nft" 
                    className="w-full"
                    onClick={() => setAcceptDialog({ open: true, type: 'offer', item: asset.offers[0] })}
                  >
                    <HandHeart className="w-4 h-4 mr-2" />
                    Accept Offer ({asset.offers.length})
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Expanded Image Dialog */}
        <Dialog open={expandedImage} onOpenChange={setExpandedImage}>
          <DialogContent className="max-w-4xl p-0">
            <div className="relative">
              <img src={asset.image} alt={asset.name} className="w-full max-h-[80vh] object-contain" />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                onClick={() => setExpandedImage(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Component Video Dialog */}
        <Dialog open={componentVideo.open} onOpenChange={(open) => setComponentVideo({ open, component: null })}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{componentVideo.component?.name} - {componentVideo.component?.type}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Component video would play here</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Listing Dialog */}
        <Dialog open={listingDialog.open} onOpenChange={(open) => setListingDialog({ open, type: 'create' })}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {listingDialog.type === 'edit' ? 'Edit Listing' : 'Create Listing'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Listing Type</Label>
                <Select value={listingType} onValueChange={setListingType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Fixed Price</SelectItem>
                    <SelectItem value="auction">Auction</SelectItem>
                    <SelectItem value="both">Both (Auction + Buy Now)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(listingType === 'sale' || listingType === 'both') && (
                <div>
                  <Label>Buy Now Price (ETH)</Label>
                  <Input 
                    placeholder="Enter buy now price..." 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              )}

              {(listingType === 'auction' || listingType === 'both') && (
                <>
                  <div>
                    <Label>Starting Bid (ETH)</Label>
                    <Input 
                      placeholder="Enter starting bid..." 
                      value={auctionPrice}
                      onChange={(e) => setAuctionPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Reserve Price (ETH) - Optional</Label>
                    <Input 
                      placeholder="Hidden minimum price..." 
                      value={reservePrice}
                      onChange={(e) => setReservePrice(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Reserve price is hidden from bidders. Auction fails if reserve not met.
                    </p>
                  </div>
                  <div>
                    <Label>Duration (Days)</Label>
                    <Input 
                      placeholder="7" 
                      type="number" 
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="flex gap-2">
                <Button className="flex-1">
                  {listingDialog.type === 'edit' ? 'Update Listing' : 'Create Listing'}
                </Button>
                {listingDialog.type === 'edit' && (
                  <>
                    {asset.listing?.type === 'both' ? (
                      <>
                        <Button variant="destructive" onClick={() => handleRemoveListing('auction')}>
                          Remove Auction
                        </Button>
                        <Button variant="destructive" onClick={() => handleRemoveListing('sale')}>
                          Remove Buy Now
                        </Button>
                        <Button variant="destructive" onClick={() => handleRemoveListing('all')}>
                          Remove All
                        </Button>
                      </>
                    ) : (
                      <Button variant="destructive" onClick={() => handleRemoveListing('all')}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </>
                )}
                <Button variant="outline" onClick={() => setListingDialog({ open: false, type: 'create' })}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Accept Bid/Offer Dialog */}
        <Dialog open={acceptDialog.open} onOpenChange={(open) => setAcceptDialog({ open, type: null, item: null })}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Accept {acceptDialog.type === 'bid' ? 'Bid' : 'Offer'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {acceptDialog.item?.amount} ETH
                </p>
                <p className="text-sm text-muted-foreground">
                  From: {acceptDialog.item?.user}
                </p>
                {acceptDialog.item?.expires && (
                  <p className="text-sm text-muted-foreground">
                    Expires: {acceptDialog.item.expires}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  Accept {acceptDialog.type === 'bid' ? 'Bid' : 'Offer'}
                </Button>
                <Button variant="outline" onClick={() => setAcceptDialog({ open: false, type: null, item: null })}>
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

export default AssetOwnerDetail;