import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import BottomNavBar from '@/components/layout/BottomNavBar';
import MenuItemCard from '@/components/MenuItemCard';
import CartItemRow from '@/components/CartItemRow'; // For Sheet
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Star, Clock, ShoppingCart } from 'lucide-react'; // Added ShoppingCart for sheet trigger

// Dummy Data
const dummyRestaurant = {
  id: "1",
  name: "The Gourmet Place",
  bannerUrl: "https://source.unsplash.com/random/1200x400?restaurant,interior,food",
  logoUrl: "https://source.unsplash.com/random/100x100?logo,brand",
  rating: 4.7,
  reviews: 250,
  deliveryTime: "30-45 min",
  cuisine: "Modern European",
  menu: {
    appetizers: [
      { id: "m1", name: "Bruschetta", description: "Grilled bread rubbed with garlic and topped with olive oil and salt.", price: 8.50, imageUrl: "https://source.unsplash.com/random/100x100?bruschetta,appetizer" },
      { id: "m2", name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and sweet basil.", price: 10.00, imageUrl: "https://source.unsplash.com/random/100x100?caprese,salad" },
    ],
    main_courses: [
      { id: "m3", name: "Grilled Salmon", description: "Served with roasted vegetables and lemon butter sauce.", price: 22.00, imageUrl: "https://source.unsplash.com/random/100x100?salmon,dish" },
      { id: "m4", name: "Ribeye Steak", description: "12oz prime ribeye, cooked to perfection.", price: 28.50, imageUrl: "https://source.unsplash.com/random/100x100?steak,meal" },
    ],
    desserts: [
      { id: "m5", name: "Tiramisu", description: "Classic Italian coffee-flavoured dessert.", price: 9.00, imageUrl: "https://source.unsplash.com/random/100x100?tiramisu,dessert" },
    ]
  }
};

interface CartItem extends ReturnType<typeof MenuItemCard_ExtractProps> {
  quantity: number;
}
// Helper to infer props for MenuItemCard without exporting its specific onAddToCart item type
type MenuItemCard_ExtractProps = Omit<React.ComponentProps<typeof MenuItemCard>, 'onAddToCart'>;


const RestaurantMenuPage = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurantData, setRestaurantData] = useState<typeof dummyRestaurant | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);

  useEffect(() => {
    console.log('RestaurantMenuPage loaded for ID:', restaurantId);
    // Simulate fetching restaurant data
    setRestaurantData(dummyRestaurant); // In a real app, fetch based on restaurantId
  }, [restaurantId]);

  const handleAddToCart = (item: MenuItemCard_ExtractProps) => {
    console.log('Adding to cart:', item);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(ci => ci.id === item.id);
      if (existingItem) {
        return prevItems.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci);
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartSheetOpen(true); // Open cart sheet on add
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems => prevItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!restaurantData) return <p>Loading restaurant...</p>; // Or a skeleton loader

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        variant="simpleTitle"
        title={restaurantData.name}
        onBackClick={() => navigate(-1)}
      />
      <main className="flex-grow pb-20">
        <div className="relative h-48 md:h-64 bg-gray-200">
          <img src={restaurantData.bannerUrl} alt={`${restaurantData.name} banner`} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4">
            <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-background">
              <AvatarImage src={restaurantData.logoUrl} alt={`${restaurantData.name} logo`} />
              <AvatarFallback>{restaurantData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <section className="p-4 space-y-2">
          <h1 className="text-2xl font-bold">{restaurantData.name}</h1>
          <p className="text-muted-foreground">{restaurantData.cuisine}</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" /> {restaurantData.rating} ({restaurantData.reviews} reviews)</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {restaurantData.deliveryTime}</div>
          </div>
        </section>

        <Tabs defaultValue="appetizers" className="w-full px-4">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            {Object.keys(restaurantData.menu).map(categoryKey => (
              <TabsTrigger key={categoryKey} value={categoryKey}>
                {categoryKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(restaurantData.menu).map(([categoryKey, items]) => (
            <TabsContent key={categoryKey} value={categoryKey}>
              <ScrollArea className="h-[calc(100vh-450px)]"> {/* Adjust height as needed */}
                <div className="space-y-1">
                  {(items as MenuItemCard_ExtractProps[]).map(item => (
                    <MenuItemCard
                      key={item.id}
                      {...item}
                      onAddToCart={() => handleAddToCart(item)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Floating Cart Button / Sheet Trigger */}
        {cartItems.length > 0 && (
           <Sheet open={isCartSheetOpen} onOpenChange={setIsCartSheetOpen}>
            <SheetTrigger asChild>
                <Button
                    className="fixed bottom-20 right-4 z-30 shadow-lg rounded-full h-14 w-14 p-0 sm:w-auto sm:px-6 sm:py-3"
                    aria-label="Open cart"
                >
                    <ShoppingCart className="h-6 w-6 sm:mr-2"/>
                    <span className="hidden sm:inline">View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                    <span className="sm:hidden absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              {cartItems.length > 0 ? (
                <>
                  <ScrollArea className="flex-grow my-4">
                    <div className="space-y-2 pr-3">
                      {cartItems.map(item => (
                        <CartItemRow
                          key={item.id}
                          {...item}
                          onQuantityChange={handleQuantityChange}
                          onRemove={handleRemoveItem}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                  <SheetFooter className="mt-auto border-t pt-4">
                    <div className="w-full space-y-2">
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" onClick={() => { console.log("Proceed to checkout"); navigate('/checkout'); setIsCartSheetOpen(false); }}>
                            Proceed to Checkout
                        </Button>
                        <SheetClose asChild>
                             <Button variant="outline" className="w-full">Continue Shopping</Button>
                        </SheetClose>
                    </div>
                  </SheetFooter>
                </>
              ) : (
                <p className="text-center py-8 text-muted-foreground">Your cart is empty.</p>
              )}
            </SheetContent>
          </Sheet>
        )}

      </main>
      <BottomNavBar />
    </div>
  );
};

export default RestaurantMenuPage;