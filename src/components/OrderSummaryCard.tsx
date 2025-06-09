import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface OrderSummaryLineItem {
  label: string;
  amount: number | string; // Can be formatted string like "$10.00" or number
  isBold?: boolean;
}

interface OrderSummaryCardProps {
  title?: string;
  items: OrderSummaryLineItem[]; // e.g., [{ label: "Subtotal", amount: 50.00 }, { label: "Delivery Fee", amount: 5.00 }]
  total: OrderSummaryLineItem; // e.g., { label: "Total", amount: 55.00, isBold: true }
  actionButtonText?: string;
  onActionButtonClick?: () => void;
  isLoading?: boolean;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  title = "Order Summary",
  items,
  total,
  actionButtonText,
  onActionButtonClick,
  isLoading = false,
}) => {
  console.log("Rendering OrderSummaryCard with title:", title);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className={`flex justify-between text-sm ${item.isBold ? 'font-semibold' : ''}`}>
            <span>{item.label}</span>
            <span>{typeof item.amount === 'number' ? `$${item.amount.toFixed(2)}` : item.amount}</span>
          </div>
        ))}
        <Separator />
        <div className={`flex justify-between text-base ${total.isBold ? 'font-bold' : 'font-semibold'}`}>
          <span>{total.label}</span>
          <span>{typeof total.amount === 'number' ? `$${total.amount.toFixed(2)}` : total.amount}</span>
        </div>
      </CardContent>
      {actionButtonText && onActionButtonClick && (
        <CardFooter>
          <Button className="w-full" onClick={onActionButtonClick} disabled={isLoading}>
            {isLoading ? 'Processing...' : actionButtonText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderSummaryCard;