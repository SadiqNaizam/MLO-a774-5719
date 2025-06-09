import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import BottomNavBar from '@/components/layout/BottomNavBar';
import Carousel from '@/components/Carousel';
import RestaurantCard from '@/components/RestaurantCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // For potential category buttons
import { Separator } from '@/components/ui/separator';

const HomePage = () => {
  const navigate = useNavigate();
  console.log('HomePage loaded');

  const handleSearchSubmit = (searchTerm: string) => {
    console.log('HomePage search:', searchTerm);
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleLocationClick = () => {
    console.log('Location button clicked');
    // Add logic to handle location change, e.g., open a modal
  };

  const carouselSlides = [
    { id: 1, content: <img src="https://source.unsplash.com/random/800x400?food,promotion,offer" alt="Special Offer 1" className="w-full h-full object-cover" />, altText: 'Special Offer 1' },
    { id: 2, content: <img src="https://source.unsplash.com/random/800x400?food,deal,banner" alt="Discount Deal 2" className="w-full h-full object-cover" />, altText: 'Discount Deal 2' },
    { id: 3, content: <img src="https://source.unsplash.com/random/800x400?restaurant,cuisine,special" alt="New Cuisine 3" className="w-full h-full object-cover" />, altText: 'New Cuisine 3' },
  ];

  const categories = ["Pizza", "Burgers", "Sushi", "Italian", "Chinese", "Desserts", "Vegan"];

  const restaurants = [
    { id: "1", name: "The Pizza Place", imageUrl: "https://source.unsplash.com/random/400x225?pizza,restaurant", cuisineTypes: ["Pizza", "Italian"], rating: 4.5, deliveryTime: "25-35 min", deliveryFee: "$2.99" },
    { id: "2", name: "Burger Hub", imageUrl: "https://source.unsplash.com/random/400x225?burger,restaurant", cuisineTypes: ["Burgers", "American"], rating: 4.2, deliveryTime: "20-30 min", deliveryFee: "Free" },
    { id: "3", name: "Sushi World", imageUrl: "https://source.unsplash.com/random/400x225?sushi,restaurant", cuisineTypes: ["Sushi", "Japanese"], rating: 4.8, deliveryTime: "30-40 min", deliveryFee: "$3.50" },
    { id: "4", name: "Pasta Palace", imageUrl: "https://source.unsplash.com/random/400x225?pasta,restaurant", cuisineTypes: ["Italian", "Pasta"], rating: 4.6, deliveryTime: "25-35 min", deliveryFee: "$1.99" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        variant="default"
        onSearchSubmit={handleSearchSubmit}
        onLocationClick={handleLocationClick}
      />
      <main className="flex-grow pb-20"> {/* pb-20 for BottomNavBar */}
        <section className="py-4">
          <Carousel slides={carouselSlides} />
        </section>

        <section className="px-4 py-4">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 pb-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant="outline"
                  className="px-3 py-1.5 text-sm cursor-pointer hover:bg-muted"
                  onClick={() => navigate(`/search?category=${category}`)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </section>
        
        <Separator className="my-2"/>

        <section className="px-4 py-4">
          <h2 className="text-xl font-semibold mb-3">Featured Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </section>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default HomePage;