import React from 'react';
import Header from '@/components/layout/Header';
import BottomNavBar from '@/components/layout/BottomNavBar';
import OrderSummaryCard from '@/components/OrderSummaryCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Dummy data for orders
const activeOrders = [
  {
    id: "order123",
    restaurantName: "Pizza Heaven",
    status: "Preparing",
    estimatedDelivery: "3:45 PM",
    items: [
      { label: "Pepperoni Pizza", amount: 15.99 },
      { label: "Coke", amount: 2.00 },
      { label: "Delivery Fee", amount: 3.00 },
    ],
    total: { label: "Total", amount: 20.99, isBold: true },
  },
];

const pastOrders = [
  {
    id: "order007",
    restaurantName: "Burger Joint",
    status: "Delivered",
    date: "2024-07-15",
    items: [
      { label: "Cheeseburger", amount: 8.50 },
      { label: "Fries", amount: 3.00 },
      { label: "Delivery Fee", amount: 2.50 },
    ],
    total: { label: "Total", amount: 14.00, isBold: true },
  },
  {
    id: "order006",
    restaurantName: "Sushi Place",
    status: "Delivered",
    date: "2024-07-10",
    items: [
      { label: "Salmon Nigiri Set", amount: 18.00 },
      { label: "Miso Soup", amount: 2.50 },
    ],
    total: { label: "Total", amount: 20.50, isBold: true },
  },
];


const OrdersPage = () => {
  console.log('OrdersPage loaded');

  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="pageTitle" title="My Orders" />
      <main className="flex-grow pb-20 pt-4">
        <Tabs defaultValue="active" className="w-full px-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="past">Past Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <ScrollArea className="h-[calc(100vh-220px)]"> {/* Adjust height */}
              {activeOrders.length > 0 ? (
                activeOrders.map(order => (
                  <div key={order.id} className="mb-4">
                    <OrderSummaryCard
                      title={`${order.restaurantName} (Order #${order.id.slice(-4)})`}
                      items={order.items}
                      total={order.total}
                      actionButtonText="Track Order"
                      onActionButtonClick={() => console.log("Track order:", order.id)}
                    />
                    <div className="p-3 bg-muted/50 rounded-b-md text-sm">
                        <p>Status: <span className="font-semibold">{order.status}</span></p>
                        <p>Estimated Delivery: <span className="font-semibold">{order.estimatedDelivery}</span></p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No active orders.</p>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="past">
            <ScrollArea className="h-[calc(100vh-220px)]"> {/* Adjust height */}
              {pastOrders.length > 0 ? (
                pastOrders.map(order => (
                  <div key={order.id} className="mb-4">
                    <OrderSummaryCard
                      title={`${order.restaurantName} - ${order.date}`}
                      items={order.items}
                      total={order.total}
                      actionButtonText="Reorder"
                      onActionButtonClick={() => console.log("Reorder:", order.id)}
                    />
                     <div className="p-3 bg-muted/50 rounded-b-md text-sm">
                        <p>Status: <span className="font-semibold">{order.status}</span></p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No past orders.</p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default OrdersPage;