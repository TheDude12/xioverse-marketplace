import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

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

export default function Marketplace() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minRarityScore, setMinRarityScore] = useState<number>(0);
  const [maxRarityScore, setMaxRarityScore] = useState<number>(100);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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
    traits: false,
    traitTypes: false,
    watchComponents: false,
    watchTraits: false
  });

  // Trait types and their themes
  const TRAIT_TYPES = ['Strap', 'Dial', 'Item', 'Hologram'];
  const TRAIT_THEMES = {
    'Strap': ['Cyberpunk', 'Futuristic', 'Classic', 'Neon', 'Golden', 'Holographic', 'Digital', 'Metallic', 'Plasma', 'Crystal'],
    'Dial': ['Cyberpunk', 'Futuristic', 'Classic', 'Neon', 'Golden', 'Holographic', 'Digital', 'Metallic', 'Plasma', 'Crystal'],
    'Item': ['Cyberpunk', 'Futuristic', 'Classic', 'Neon', 'Golden', 'Holographic', 'Digital', 'Metallic', 'Plasma', 'Crystal'],
    'Hologram': ['Cyberpunk', 'Futuristic', 'Classic', 'Neon', 'Golden', 'Holographic', 'Digital', 'Metallic', 'Plasma', 'Crystal']
  };

  // Mock data - replace with actual Google Sheets API call
  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      // Enhanced mock assets with proper gaming data
      const mockAssets: Asset[] = [
        {
          id: '1001',
          type: 'Watch',
          equipped: 'no',
          traits: 'Legendary',
          theme: 'Cyberpunk',
          name: 'Neon Genesis Watch',
          rarity: 'Ultra Rare',
          rarityValue: 95.8,
          lastSold: 2500,
          listed: 'yes',
          price: 3200,
          imageUrl: watchHero
        },
        {
          id: '1002',
          type: 'Trait',
          equipped: 'no',
          traits: 'Epic',
          theme: 'Holographic',
          name: 'Plasma Glow Effect',
          rarity: 'Super Rare',
          rarityValue: 87.3,
          lastSold: 1200,
          listed: 'yes',
          price: 1800,
          imageUrl: traitHero
        },
        {
          id: '1003',
          type: 'Watch',
          equipped: 'no',
          traits: 'Rare',
          theme: 'Futuristic',
          name: 'Cyber Elite Timepiece',
          rarity: 'Rare',
          rarityValue: 76.2,
          lastSold: 800,
          listed: 'yes',
          price: 1200,
          imageUrl: cyberWatch
        },
        {
          id: '1004',
          type: 'Trait',
          equipped: 'no',
          traits: 'Unique',
          theme: 'Golden',
          name: 'Divine Aura Boost',
          rarity: 'Unique',
          rarityValue: 99.9,
          lastSold: 5000,
          listed: 'yes',
          price: 7500,
          imageUrl: goldenTrait
        },
        {
          id: '1005',
          type: 'Watch',
          equipped: 'no',
          traits: 'Common',
          theme: 'Classic',
          name: 'Standard Timer',
          rarity: 'Common',
          rarityValue: 45.1,
          lastSold: 200,
          listed: 'yes',
          price: 350,
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

    // Trait type filters (for traits)
    if (filters.traitTypes.length > 0 && filters.trait) {
      filtered = filtered.filter(asset => 
        asset.type === 'Trait' && filters.traitTypes.includes(asset.traits)
      );
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
          <div className="flex items-center justify-between">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-80 shrink-0 space-y-4">
            <Card className="p-6 bg-card/90 border-border shadow-card sticky top-24 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary animate-pulse" />
                <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                  FILTERS
                </h2>
              </div>

              <div className="space-y-4">
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

                {/* Rarity */}
                <Collapsible open={expandedSections.rarity} onOpenChange={() => toggleSection('rarity')}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0">
                      <span className="font-medium text-sm text-muted-foreground">RARITY</span>
                      {expandedSections.rarity ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {filters.trait && (
                      <>
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
                      </>
                    )}
                    {filters.watch && (
                      <div className="space-y-2">
                        <h4 className="text-xs text-muted-foreground">RARITY SCORE RANGE</h4>
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
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>

                {/* Trait Types (for Traits) */}
                {filters.trait && (
                  <Collapsible open={expandedSections.traitTypes} onOpenChange={() => toggleSection('traitTypes')}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0">
                        <span className="font-medium text-sm text-muted-foreground">TRAIT TYPES</span>
                        {expandedSections.traitTypes ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {TRAIT_TYPES.map((traitType) => (
                        <div key={traitType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`traitType-${traitType}`}
                            checked={filters.traitTypes.includes(traitType)}
                            onCheckedChange={() => toggleArrayFilter('traitTypes', traitType)}
                          />
                          <label htmlFor={`traitType-${traitType}`} className="text-sm cursor-pointer">
                            {traitType}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* Themes */}
                <Collapsible open={expandedSections.themes} onOpenChange={() => toggleSection('themes')}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0">
                      <span className="font-medium text-sm text-muted-foreground">THEMES</span>
                      {expandedSections.themes ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {['Cyberpunk', 'Futuristic', 'Classic', 'Neon', 'Golden', 'Holographic'].map((theme) => (
                      <div key={theme} className="flex items-center space-x-2">
                        <Checkbox
                          id={`theme-${theme}`}
                          checked={filters.themes.includes(theme)}
                          onCheckedChange={() => toggleArrayFilter('themes', theme)}
                        />
                        <label htmlFor={`theme-${theme}`} className="text-sm cursor-pointer">
                          {theme}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Watch Component Themes */}
                {filters.watch && (
                  <Collapsible open={expandedSections.watchComponents} onOpenChange={() => toggleSection('watchComponents')}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0">
                        <span className="font-medium text-sm text-muted-foreground">WATCH COMPONENTS</span>
                        {expandedSections.watchComponents ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 mt-2">
                      {TRAIT_TYPES.map((componentType) => (
                        <div key={componentType} className="space-y-2">
                          <h4 className="text-xs font-medium text-muted-foreground">{componentType.toUpperCase()}</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {TRAIT_THEMES[componentType as keyof typeof TRAIT_THEMES].slice(0, 6).map((theme) => (
                              <div key={`${componentType}-${theme}`} className="flex items-center space-x-1">
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
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}

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
                      {filters.watch && (
                        <>
                          <SelectItem value="rarity-score-high">Rarity Score: High to Low</SelectItem>
                          <SelectItem value="rarity-score-low">Rarity Score: Low to High</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredAssets.length} of {assets.length} items
              </p>
            </div>

            {/* Asset Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredAssets.map((asset) => (
            <Card key={asset.id} className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming cursor-pointer hover:scale-[1.02]">
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
                        <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                        <p className="font-bold text-lg text-primary">
                          {asset.price ? `${asset.price.toLocaleString()} USDC` : 'Make Offer'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Last Sold</p>
                        <p className="font-semibold">
                          {asset.lastSold ? `${asset.lastSold.toLocaleString()} USDC` : '-'}
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="gaming" className="w-full">
                      {asset.price ? 'Buy Now' : 'Make Offer'}
                    </Button>
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