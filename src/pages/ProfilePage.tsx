import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"; // Using shadcn Form

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional().refine(val => !val || /^\+?[1-9]\d{1,14}$/.test(val), { message: "Invalid phone number" }),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  console.log('ProfilePage loaded');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+11234567890",
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log('Profile updated:', data);
    // Add API call to save data
    alert("Profile saved successfully!");
  }
  
  const handleLogout = () => {
    console.log('User logged out');
    // Add logout logic here
    navigate('/'); // Navigate to home or login page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="pageTitle" title="Profile" />
      <main className="flex-grow pb-20 pt-4 px-4 space-y-6">
        <section className="flex flex-col items-center space-y-2">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://source.unsplash.com/random/150x150?person,avatar" alt="User Avatar" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <Button variant="link" size="sm">Change Photo</Button>
        </section>
        
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 123 456 7890" {...field} />
                  </FormControl>
                  <FormDescription>Optional. Include country code.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </Form>

        <Separator />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="addresses">
            <AccordionTrigger>Delivery Addresses</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <p className="text-muted-foreground text-sm">Manage your saved delivery addresses.</p>
              {/* Placeholder for address list and add new address button */}
              <div className="p-3 border rounded-md">
                <p className="font-medium">Home</p>
                <p className="text-sm text-muted-foreground">123 Main St, Anytown, USA</p>
              </div>
              <Button variant="outline" size="sm">Add New Address</Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment">
            <AccordionTrigger>Payment Methods</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <p className="text-muted-foreground text-sm">Manage your saved payment methods.</p>
               {/* Placeholder for payment methods list and add new payment button */}
              <div className="p-3 border rounded-md">
                <p className="font-medium">Visa **** 1234</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
              <Button variant="outline" size="sm">Add New Payment Method</Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="settings">
            <AccordionTrigger>Settings</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground text-sm">Configure your app preferences.</p>
              {/* Placeholder for settings like notifications, theme */}
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="notifications">Enable Notifications</Label>
                {/* For a real switch, import and use '@/components/ui/switch' */}
                <input type="checkbox" id="notifications" defaultChecked />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />
        
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          Logout
        </Button>

      </main>
      <BottomNavBar />
    </div>
  );
};

export default ProfilePage;