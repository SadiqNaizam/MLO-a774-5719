import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Bike } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[]; // e.g., ["Pizza", "Italian"]
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "25-35 min"
  deliveryFee?: string; // e.g., "$2.99" or "Free"
  // onClick?: (id: string) => void; // Use Link for navigation instead
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  deliveryFee,
}) => {
  console.log("Rendering RestaurantCard:", name);

  return (
    <Link to={`/restaurant/${id}`} className="block group">
      <Card className="overflow-hidden transition-shadow hover:shadow-md w-full">
        <CardHeader className="p-0">
          <div className="aspect-[16/9] bg-gray-100">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 space-y-1">
          <h3 className="text-base font-semibold truncate group-hover:text-primary">{name}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {cuisineTypes.join(', ')}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{deliveryTime}</span>
            </div>
            {deliveryFee && (
              <div className="flex items-center">
                <Bike className="h-3.5 w-3.5 mr-1" />
                <span>{deliveryFee}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;