import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For quantity, though buttons are often preferred on mobile
import { X, Plus, Minus } from 'lucide-react';

interface CartItemRowProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onQuantityChange,
  onRemove,
}) => {
  console.log("Rendering CartItemRow for:", name, "Quantity:", quantity);

  const handleIncrease = () => onQuantityChange(id, quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    } else {
      onRemove(id); // Or prompt for removal if quantity becomes 0
    }
  };
  const handleRemove = () => onRemove(id);

  return (
    <div className="flex items-center space-x-3 py-3 border-b last:border-b-0">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 object-cover rounded flex-shrink-0"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center space-x-1.5">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleDecrease}>
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="text-sm w-6 text-center">{quantity}</span>
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleIncrease}>
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-sm font-semibold w-16 text-right">${(price * quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-7 w-7" onClick={handleRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItemRow;