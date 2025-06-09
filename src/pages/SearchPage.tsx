import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import BottomNavBar from '@/components/layout/BottomNavBar';
import RestaurantCard from '@/components/RestaurantCard';
import MenuItemCard from '@/components/MenuItemCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SlidersHorizontal } from 'lucide-react';

// Dummy data for search results
const dummyRestaurants = [
    { id: "101", name: "Search Pizza King", imageUrl: "https://source.unsplash.com/random/400x225?pizza,fastfood", cuisineTypes: ["Pizza"], rating: 4.3, deliveryTime: "30 min", deliveryFee: "$1" },
    { id: "102", name: "Burger Queen Search", imageUrl: "https://source.unsplash.com/random/400x225?burger,takeaway", cuisineTypes: ["Burgers"], rating: 4.0, deliveryTime: "25 min", deliveryFee: "Free" },
];
const dummyMenuItems = [
    { id: "m101", name: "Pepperoni Pizza Slice", description: "Classic pepperoni slice.", price: 3.99, imageUrl: "https://source.unsplash.com/random/100x100?pizza,slice", restaurantName: "Search Pizza King", restaurantId: "101" },
    { id: "m102", name: "Cheeseburger", description: "Juicy cheeseburger.", price: 5.50, imageUrl: "https://source.unsplash.com/random/100x100?cheeseburger", restaurantName: "Burger Queen Search", restaurantId: "102" },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ restaurants: any[], menuItems: any[] }>({ restaurants: [], menuItems: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    const category = queryParams.get('category') || '';
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    } else if (category) {
        setSearchTerm(category); // Display category as search term
        performSearch(category); // Simulate search by category
    }
  }, [location.search]);


  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults({ restaurants: [], menuItems: [] });
      return;
    }
    setIsLoading(true);
    console.log('Performing search for:', term);
    // Simulate API call
    setTimeout(() => {
      // For demonstration, show both types of results regardless of term
      setSearchResults({
        restaurants: dummyRestaurants.filter(r => r.name.toLowerCase().includes(term.toLowerCase()) || r.cuisineTypes.some(c => c.toLowerCase().includes(term.toLowerCase()))),
        menuItems: dummyMenuItems.filter(mi => mi.name.toLowerCase().includes(term.toLowerCase()) || mi.description.toLowerCase().includes(term.toLowerCase()))
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
    navigate(`/search?query=${encodeURIComponent(term)}`); // Update URL and trigger useEffect
  };
  
  const handleMenuItemAddToCart = (item: { id: string; name: string; price: number }) => {
    console.log('Added to cart from search:', item);
    // Add to cart logic, potentially open a mini-cart or show a toast
  };

  console.log('SearchPage loaded, initial search term:', searchTerm);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        variant="searchFocus"
        onSearchSubmit={handleSearchSubmit}
        onBackClick={() => navigate('/')}
      />
      <main className="flex-grow pb-20 px-4 pt-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">
            {searchTerm ? `Results for "${searchTerm}"` : "Search"}
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><SlidersHorizontal className="h-4 w-4 mr-2" /> Filters</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Filter Options</DialogTitle></DialogHeader>
              <div className="py-4 space-y-4">
                <div>
                  <Label className="text-base font-medium">Sort By</Label>
                  <div className="grid gap-2 mt-2">
                     {/* Placeholder filter options */}
                    <Label className="flex items-center"><Checkbox className="mr-2" /> Relevance</Label>
                    <Label className="flex items-center"><Checkbox className="mr-2" /> Delivery Time</Label>
                    <Label className="flex items-center"><Checkbox className="mr-2" /> Rating</Label>
                  </div>
                </div>
                 <div>
                  <Label className="text-base font-medium">Dietary</Label>
                   <div className="grid gap-2 mt-2">
                    <Label className="flex items-center"><Checkbox className="mr-2" /> Vegetarian</Label>
                    <Label className="flex items-center"><Checkbox className="mr-2" /> Vegan</Label>
                    <Label className="flex items-center"><Checkbox className="mr-2" /> Gluten-Free</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit">Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading && <p>Loading results...</p>}
        {!isLoading && searchResults.restaurants.length === 0 && searchResults.menuItems.length === 0 && searchTerm && (
          <p>No results found for "{searchTerm}". Try a different search.</p>
        )}

        <ScrollArea className="h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
          {searchResults.restaurants.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Restaurants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchResults.restaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            </section>
          )}

          {searchResults.menuItems.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Dishes</h2>
              <div className="space-y-3">
                {searchResults.menuItems.map(item => (
                  <MenuItemCard
                    key={item.id}
                    {...item}
                    onAddToCart={handleMenuItemAddToCart}
                  />
                ))}
              </div>
            </section>
          )}
        </ScrollArea>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default SearchPage;