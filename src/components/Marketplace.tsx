import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List, ChevronDown, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Import generated images
import watchHero from '@/assets/watch-hero.jpg';
import traitHero from '@/assets/trait-hero.jpg';
import cyberWatch from '@/assets/cyber-watch.jpg';
import goldenTrait from '@/assets/golden-trait.jpg';

interface Asset {
  id: string;
  type: 'Watch' | 'Trait';
  equipped: string;
  traits: string;
  theme: string;
  strapId?: string;
  dialId?: string;
  itemId?: string;
  hologramId?: string;
  name: string;
  rarity: string;
  rarityValue: number;
  lastSold: number;
  listed: string;
  price: number;
  imageUrl: string;
  isAuction?: boolean;
  highestBid?: number;
  auctionEndTime?: number;
}

interface Filters {
  all: boolean;
  listed: boolean;
  common: boolean;
  rare: boolean;
  superrare: boolean;
  ultrarare: boolean;
  unique: boolean;
  watch: boolean;
  trait: boolean;
  themes: string[];
  traits: string[];
  traitTypes: string[]; // For filtering by trait type (Strap, Dial, Item, Hologram)
  traitStrapThemes: string[];
  traitDialThemes: string[];
  traitItemThemes: string[];
  traitHologramThemes: string[];
  watchStrapTheme: string[];
  watchDialTheme: string[];
  watchItemTheme: string[];
  watchHologramTheme: string[];
  watchTraits: string[];
  sortBy: string;
}

const RARITY_COLORS = {
  'Common': 'bg-muted text-muted-foreground',
  'Rare': 'bg-gaming-cyan text-black',
  'Super Rare': 'bg-gaming-purple text-white',
  'Ultra Rare': 'bg-gaming-gold text-black',
  'Unique': 'bg-gradient-nft text-white'
};

// All 20 themes
const ALL_THEMES = [
  'Alien', 'Aquatic', 'Biohazard', 'Corrosive', 'Cyberpunk', 
  'Egyptian Mythology', 'Greek Mythology', 'Lava', 'Medieval Age', 'Magic',
  'Military', 'Norse Mythology', 'Prehistory', 'Pirates', 'Renaissance',
  'Robot', 'Mutant', 'Steampunk', 'Skeletal', 'Zombie'
];

// Trait types for watches
const TRAIT_TYPES = ['Strap', 'Dial', 'Item', 'Hologram'];

// Trait themes for each component type
const TRAIT_THEMES = {
  Strap: ALL_THEMES,
  Dial: ALL_THEMES,
  Item: ALL_THEMES,
  Hologram: ALL_THEMES
};

export default function Marketplace() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minRarityScore, setMinRarityScore] = useState<number>(0);
  const [maxRarityScore, setMaxRarityScore] = useState<number>(100);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    all: false,
    listed: false,
    common: false,
    rare: false,
    superrare: false,
    ultrarare: false,
    unique: false,
    watch: false,
    trait: false,
    themes: [],
    traits: [],
    traitTypes: [],
    traitStrapThemes: [],
    traitDialThemes: [],
    traitItemThemes: [],
    traitHologramThemes: [],
    watchStrapTheme: [],
    watchDialTheme: [],
    watchItemTheme: [],
    watchHologramTheme: [],
    watchTraits: [],
    sortBy: 'price-high-low'
  });

  // Expandable sections state
  const [expandedSections, setExpandedSections] = useState({
    rarity: false,
    rarityScore: false,
    themes: false,
    traitTypes: false,
    traitStrap: false,
    traitDial: false,
    traitItem: false,
    traitHologram: false,
    watchComponents: false,
    watchStrap: false,
    watchDial: false,
    watchItem: false,
    watchHologram: false
  });

  // Mock data - replace with real API call
  useEffect(() => {
    const fetchAssets = async () => {
      // Simulate API call
      const mockAssets: Asset[] = [
        {
          id: '1001',
          type: 'Watch',
          equipped: 'no',
          traits: 'Strap',
          theme: 'Cyberpunk',
          strapId: '2001',
          dialId: '2002',
          itemId: '2003',
          hologramId: '2004',
          name: 'Cyber Watch Elite',
          rarity: 'Ultra Rare',
          rarityValue: 95.4,
          lastSold: 2500,
          listed: 'yes',
          price: 3200,
          isAuction: true,
          highestBid: 2800,
          auctionEndTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
          imageUrl: cyberWatch
        },
        {
          id: '1002',
          type: 'Trait',
          equipped: 'no',
          traits: 'Item',
          theme: 'Golden',
          name: 'Golden Aura Trait',
          rarity: 'Rare',
          rarityValue: 78.2,
          lastSold: 850,
          listed: 'yes',
          price: 1200,
          imageUrl: goldenTrait
        },
        {
          id: '1003',
          type: 'Watch',
          equipped: 'no',
          traits: 'Dial',
          theme: 'Steampunk',
          strapId: '2005',
          dialId: '2006',
          itemId: '2007',
          hologramId: '2008',
          name: 'Steam Powered Chronometer',
          rarity: 'Super Rare',
          rarityValue: 88.1,
          lastSold: 1800,
          listed: 'no',
          price: 0,
          imageUrl: watchHero
        },
        {
          id: '1004',
          type: 'Trait',
          equipped: 'no',
          traits: 'Hologram',
          theme: 'Alien',
          name: 'Xenomorph Hologram',
          rarity: 'Unique',
          rarityValue: 99.8,
          lastSold: 5000,
          listed: 'yes',
          price: 7500,
          isAuction: true,
          highestBid: 6800,
          auctionEndTime: Date.now() + 12 * 60 * 60 * 1000, // 12 hours from now
          imageUrl: traitHero
        },
        {
          id: '1005',
          type: 'Watch',
          equipped: 'no',
          traits: 'Strap',
          theme: 'Military',
          strapId: '2009',
          dialId: '2010',
          itemId: '2011',
          hologramId: '2012',
          name: 'Tactical Commander Watch',
          rarity: 'Rare',
          rarityValue: 82.7,
          lastSold: 950,
          listed: 'yes',
          price: 1350,
          imageUrl: watchHero
        },
        {
          id: '1006',
          type: 'Trait',
          equipped: 'no',
          traits: 'Super Rare',
          theme: 'Neon',
          name: 'Electric Storm Effect',
          rarity: 'Super Rare',
          rarityValue: 89.7,
          lastSold: 1500,
          listed: 'no',
          price: 0,
          imageUrl: traitHero
        }
      ];
      
      setTimeout(() => {
        setAssets(mockAssets);
        setFilteredAssets(mockAssets);
        setMaxPrice(Math.max(...mockAssets.map(a => a.price)));
        setLoading(false);
      }, 1000);
    };

    fetchAssets();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...assets];

    // Enhanced search filter - search through multiple fields
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(asset => {
        // Basic fields
        const basicMatch = asset.name.toLowerCase().includes(searchLower) ||
                          asset.theme.toLowerCase().includes(searchLower) ||
                          asset.traits.toLowerCase().includes(searchLower) ||
                          asset.type.toLowerCase().includes(searchLower) ||
                          asset.rarity.toLowerCase().includes(searchLower);
        
        // For watches, also search through component themes
        if (asset.type === 'Watch') {
          const componentMatch = TRAIT_TYPES.some(traitType => 
            traitType.toLowerCase().includes(searchLower)
          ) || TRAIT_THEMES['Strap'].some(theme => 
            theme.toLowerCase().includes(searchLower)
          );
          return basicMatch || componentMatch;
        }
        
        return basicMatch;
      });
    }

    // Type filters
    if (filters.watch && !filters.trait) {
      filtered = filtered.filter(asset => asset.type === 'Watch');
    } else if (filters.trait && !filters.watch) {
      filtered = filtered.filter(asset => asset.type === 'Trait');
    }

    // Trait theme filters (for traits)
    if (filters.trait) {
      // Check if any trait theme filters are active
      const hasTraitThemeFilters = 
        filters.traitStrapThemes.length > 0 || 
        filters.traitDialThemes.length > 0 || 
        filters.traitItemThemes.length > 0 || 
        filters.traitHologramThemes.length > 0;

      if (hasTraitThemeFilters) {
        filtered = filtered.filter(asset => {
          if (asset.type !== 'Trait') return false;
          
          // Check if the trait matches any of the selected theme filters
          const matchesStrapThemes = filters.traitStrapThemes.length === 0 || 
            (asset.traits === 'Strap' && filters.traitStrapThemes.includes(asset.theme));
          const matchesDialThemes = filters.traitDialThemes.length === 0 || 
            (asset.traits === 'Dial' && filters.traitDialThemes.includes(asset.theme));
          const matchesItemThemes = filters.traitItemThemes.length === 0 || 
            (asset.traits === 'Item' && filters.traitItemThemes.includes(asset.theme));
          const matchesHologramThemes = filters.traitHologramThemes.length === 0 || 
            (asset.traits === 'Hologram' && filters.traitHologramThemes.includes(asset.theme));
          
          return matchesStrapThemes || matchesDialThemes || matchesItemThemes || matchesHologramThemes;
        });
      }
    }

    // Theme filters
    if (filters.themes.length > 0) {
      filtered = filtered.filter(asset => filters.themes.includes(asset.theme));
    }

    // Watch component theme filters
    if (filters.watch) {
      // Rarity score range for watches
      if (minRarityScore > 0 || maxRarityScore < 100) {
        filtered = filtered.filter(asset => 
          asset.type === 'Watch' && 
          asset.rarityValue >= minRarityScore && 
          asset.rarityValue <= maxRarityScore
        );
      }

      // Component theme filters for watches
      if (filters.watchStrapTheme.length > 0 || 
          filters.watchDialTheme.length > 0 || 
          filters.watchItemTheme.length > 0 || 
          filters.watchHologramTheme.length > 0) {
        filtered = filtered.filter(asset => {
          if (asset.type !== 'Watch') return false;
          
          // Mock logic - in real implementation, you'd match against actual component themes
          const hasMatchingComponent = 
            (filters.watchStrapTheme.length === 0 || filters.watchStrapTheme.includes(asset.theme)) ||
            (filters.watchDialTheme.length === 0 || filters.watchDialTheme.includes(asset.theme)) ||
            (filters.watchItemTheme.length === 0 || filters.watchItemTheme.includes(asset.theme)) ||
            (filters.watchHologramTheme.length === 0 || filters.watchHologramTheme.includes(asset.theme));
          
          return hasMatchingComponent;
        });
      }
    }

    // Rarity filters (for traits)
    if (filters.trait) {
      const activeRarities = [];
      if (filters.common) activeRarities.push('Common');
      if (filters.rare) activeRarities.push('Rare');
      if (filters.superrare) activeRarities.push('Super Rare');
      if (filters.ultrarare) activeRarities.push('Ultra Rare');
      if (filters.unique) activeRarities.push('Unique');

      if (activeRarities.length > 0) {
        filtered = filtered.filter(asset => 
          asset.type === 'Trait' && activeRarities.includes(asset.rarity)
        );
      }
    }

    // Price filters
    if (minPrice > 0 || maxPrice > 0) {
      filtered = filtered.filter(asset => 
        asset.price >= minPrice && asset.price <= (maxPrice || Infinity)
      );
    }

    // Listed filter
    if (filters.listed) {
      filtered = filtered.filter(asset => asset.listed === 'yes');
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'most-rare':
        filtered.sort((a, b) => b.rarityValue - a.rarityValue);
        break;
      case 'least-rare':
        filtered.sort((a, b) => a.rarityValue - b.rarityValue);
        break;
      case 'rarity-score-high':
        filtered.sort((a, b) => b.rarityValue - a.rarityValue);
        break;
      case 'rarity-score-low':
        filtered.sort((a, b) => a.rarityValue - b.rarityValue);
        break;
    }

    setFilteredAssets(filtered);
  }, [assets, searchTerm, filters, minPrice, maxPrice, minRarityScore, maxRarityScore]);

  const toggleFilter = (filterKey: keyof Filters, value?: any) => {
    setFilters(prev => {
      if (filterKey === 'all' || filterKey === 'listed') {
        return {
          ...prev,
          all: filterKey === 'all' ? !prev.all : false,
          listed: filterKey === 'listed' ? !prev.listed : false
        };
      }
      
      if (filterKey === 'watch' || filterKey === 'trait') {
        return {
          ...prev,
          watch: filterKey === 'watch' ? !prev.watch : prev.watch,
          trait: filterKey === 'trait' ? !prev.trait : prev.trait
        };
      }

      return {
        ...prev,
        [filterKey]: typeof prev[filterKey] === 'boolean' ? !prev[filterKey] : value
      };
    });
  };

  const toggleArrayFilter = (filterKey: keyof Filters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[filterKey] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [filterKey]: newArray
      };
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Extract filters into a reusable function for both desktop and mobile
  const renderFilters = () => (
    <>
      {/* Basic Filters */}
      <div className="space-y-2">
        <Button
          variant={filters.all ? 'default' : 'outline'}
          size="sm"
          onClick={() => toggleFilter('all')}
          className="w-full justify-start"
        >
          All Items
        </Button>
        <Button
          variant={filters.listed ? 'default' : 'outline'}
          size="sm"
          onClick={() => toggleFilter('listed')}
          className="w-full justify-start"
        >
          Listed Only
        </Button>
      </div>

      {/* Item Type */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-muted-foreground">ITEM TYPE</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={filters.watch ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleFilter('watch')}
          >
            Watches
          </Button>
          <Button
            variant={filters.trait ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleFilter('trait')}
          >
            Traits
          </Button>
        </div>
      </div>

      {/* Conditional Filters based on selection */}
      {/* When both watches and traits are selected, only show price and basic filters */}
      {(!filters.watch && !filters.trait) || (filters.watch && filters.trait) ? (
        <>
          {/* Price Range */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">PRICE RANGE (USDC)</h3>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice || ''}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="bg-input"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="bg-input"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">SORT BY</h3>
            <Select value={filters.sortBy} onValueChange={(value) => toggleFilter('sortBy', value)}>
              <SelectTrigger className="bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ) : null}

      {/* Watch-specific filters */}
      {filters.watch && !filters.trait && (
        <>
          {/* Rarity Score Range */}
          <Collapsible open={expandedSections.rarity} onOpenChange={() => toggleSection('rarity')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <span className="font-medium text-sm text-muted-foreground">RARITY SCORE</span>
                {expandedSections.rarity ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min="0"
                  max="100"
                  value={minRarityScore || ''}
                  onChange={(e) => setMinRarityScore(Number(e.target.value))}
                  className="bg-input text-xs"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  min="0"
                  max="100"
                  value={maxRarityScore || ''}
                  onChange={(e) => setMaxRarityScore(Number(e.target.value))}
                  className="bg-input text-xs"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Watch Traits */}
          <Collapsible open={expandedSections.watchComponents} onOpenChange={() => toggleSection('watchComponents')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <span className="font-medium text-sm text-muted-foreground">WATCH TRAITS</span>
                {expandedSections.watchComponents ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-2">
              {TRAIT_TYPES.map((componentType) => (
                <Collapsible key={componentType} open={expandedSections[`watch${componentType}` as keyof typeof expandedSections]} onOpenChange={() => toggleSection(`watch${componentType}` as keyof typeof expandedSections)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 text-xs">
                      <span className="font-medium text-xs text-muted-foreground">{componentType.toUpperCase()}</span>
                      {expandedSections[`watch${componentType}` as keyof typeof expandedSections] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="max-h-32 overflow-y-auto space-y-1 border border-border rounded-md p-2">
                      {TRAIT_THEMES[componentType as keyof typeof TRAIT_THEMES].map((theme) => (
                        <div key={`${componentType}-${theme}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`watch${componentType}-${theme}`}
                            checked={filters[`watch${componentType}Theme` as keyof Filters] 
                              ? (filters[`watch${componentType}Theme` as keyof Filters] as string[]).includes(theme)
                              : false}
                            onCheckedChange={() => toggleArrayFilter(`watch${componentType}Theme` as keyof Filters, theme)}
                          />
                          <label htmlFor={`watch${componentType}-${theme}`} className="text-xs cursor-pointer">
                            {theme}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Price Range */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">PRICE RANGE (USDC)</h3>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice || ''}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="bg-input"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="bg-input"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">SORT BY</h3>
            <Select value={filters.sortBy} onValueChange={(value) => toggleFilter('sortBy', value)}>
              <SelectTrigger className="bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="rarity-score-high">Rarity Score: High to Low</SelectItem>
                <SelectItem value="rarity-score-low">Rarity Score: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Trait-specific filters */}
      {filters.trait && !filters.watch && (
        <>
          {/* Rarity */}
          <Collapsible open={expandedSections.rarity} onOpenChange={() => toggleSection('rarity')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <span className="font-medium text-sm text-muted-foreground">RARITY</span>
                {expandedSections.rarity ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {['common', 'rare', 'superrare', 'ultrarare', 'unique'].map((rarity) => (
                <div key={rarity} className="flex items-center space-x-2">
                  <Checkbox
                    id={rarity}
                    checked={filters[rarity as keyof Filters] as boolean}
                    onCheckedChange={() => toggleFilter(rarity as keyof Filters)}
                  />
                  <label htmlFor={rarity} className="text-sm capitalize cursor-pointer">
                    {rarity === 'superrare' ? 'Super Rare' : rarity === 'ultrarare' ? 'Ultra Rare' : rarity}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Trait Types */}
          <Collapsible open={expandedSections.traitTypes} onOpenChange={() => toggleSection('traitTypes')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <span className="font-medium text-sm text-muted-foreground">TRAIT TYPES</span>
                {expandedSections.traitTypes ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-2">
              {TRAIT_TYPES.map((traitType) => (
                <Collapsible key={traitType} open={expandedSections[`trait${traitType}` as keyof typeof expandedSections]} onOpenChange={() => toggleSection(`trait${traitType}` as keyof typeof expandedSections)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 text-xs">
                      <span className="font-medium text-xs text-muted-foreground">{traitType.toUpperCase()}</span>
                      {expandedSections[`trait${traitType}` as keyof typeof expandedSections] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="max-h-32 overflow-y-auto space-y-1 border border-border rounded-md p-2">
                      {ALL_THEMES.map((theme) => (
                        <div key={`${traitType}-${theme}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`trait${traitType}-${theme}`}
                            checked={filters[`trait${traitType}Themes` as keyof Filters] 
                              ? (filters[`trait${traitType}Themes` as keyof Filters] as string[]).includes(theme)
                              : false}
                            onCheckedChange={() => toggleArrayFilter(`trait${traitType}Themes` as keyof Filters, theme)}
                          />
                          <label htmlFor={`trait${traitType}-${theme}`} className="text-xs cursor-pointer">
                            {theme}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Price Range */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">PRICE RANGE (USDC)</h3>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice || ''}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="bg-input"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="bg-input"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">SORT BY</h3>
            <Select value={filters.sortBy} onValueChange={(value) => toggleFilter('sortBy', value)}>
              <SelectTrigger className="bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="most-rare">Most Rare</SelectItem>
                <SelectItem value="least-rare">Least Rare</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse-glow">
          <div className="w-16 h-16 bg-gradient-primary rounded-full animate-float"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-card">
        <div className="container mx-auto px-4 py-4">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                XIOVERSE MARKETPLACE
              </h1>
              <Badge variant="gaming" className="animate-pulse-glow">
                AR/VR Gaming Assets
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search watches, traits, themes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                XIOVERSE
              </h1>
              <div className="flex items-center space-x-2">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-background border-border p-0">
                    <div className="p-6 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-6">
                        <Filter className="w-5 h-5 text-primary animate-pulse" />
                        <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                          FILTERS
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {renderFilters()}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search watches, traits, themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-80 shrink-0 space-y-4">
            <Card className="p-6 bg-card/90 border-border shadow-card sticky top-24 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary animate-pulse" />
                <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                  FILTERS
                </h2>
              </div>

              <div className="space-y-4">
                {renderFilters()}
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredAssets.length} of {assets.length} items
              </p>
            </div>

            {/* Asset Grid */}
            <div className={`grid gap-4 md:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
                : 'grid-cols-1'
            }`}>
              {filteredAssets.map((asset) => (
                <Card 
                  key={asset.id} 
                  className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming cursor-pointer hover:scale-[1.02]"
                  onClick={() => navigate(`/asset/${asset.id}`)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={asset.imageUrl}
                      alt={asset.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 right-2">
                      <Badge className={`${RARITY_COLORS[asset.rarity as keyof typeof RARITY_COLORS]} font-bold`}>
                        {asset.rarity}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-background/80">
                        {asset.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {asset.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>ID: {asset.id}</span>
                      <span className="px-2 py-1 bg-secondary rounded-md">{asset.theme}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {asset.isAuction ? 'Highest Bid' : 'Current Price'}
                        </p>
                        <p className="font-bold text-lg text-primary">
                          {asset.isAuction && asset.highestBid 
                            ? `${asset.highestBid.toLocaleString()} USDC`
                            : asset.price 
                            ? `${asset.price.toLocaleString()} USDC` 
                            : 'Make Offer'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Last Sold</p>
                        <p className="font-semibold">
                          {asset.lastSold ? `${asset.lastSold.toLocaleString()} USDC` : '-'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {asset.isAuction ? (
                        <>
                          <Button 
                            variant="gaming" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/asset/${asset.id}`);
                            }}
                          >
                            Bid
                          </Button>
                          {asset.price && (
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/asset/${asset.id}`);
                              }}
                            >
                              Buy Now
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="gaming" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/asset/${asset.id}`);
                            }}
                          >
                            {asset.price ? 'Buy Now' : 'Make Offer'}
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/asset/${asset.id}`);
                            }}
                          >
                            Make Offer
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredAssets.length === 0 && !loading && (
              <div className="col-span-full text-center py-16">
                <div className="w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                  <Search className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">No items found</h3>
                <p className="text-muted-foreground text-lg">Try adjusting your filters or search terms</p>
                <Button variant="gaming" className="mt-6" onClick={() => {
                  setSearchTerm('');
                  setFilters(prev => ({ ...prev, all: true, listed: false, watch: false, trait: false }));
                }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}