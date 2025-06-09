import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (item: { id: string; name: string; price: number }) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  console.log("Rendering MenuItemCard:", name);

  const handleAdd = () => {
    onAddToCart({ id, name, price });
    // Consider showing a toast notification here: toast({ title: `${name} added to cart`})
  };

  return (
    <div className="flex items-start space-x-3 py-4 border-b last:border-b-0">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md flex-shrink-0"
          onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
        />
      )}
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold sm:text-base">{name}</h4>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        <p className="text-sm font-medium sm:text-base">${price.toFixed(2)}</p>
      </div>
      <Button variant="outline" size="sm" onClick={handleAdd} className="self-center sm:self-start ml-auto">
        <PlusCircle className="h-4 w-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Add</span>
      </Button>
    </div>
  );
};

export default MenuItemCard;