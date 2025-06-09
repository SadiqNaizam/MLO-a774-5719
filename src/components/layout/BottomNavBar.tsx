import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ListOrdered, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/orders', label: 'Orders', icon: ListOrdered },
  { path: '/profile', label: 'Profile', icon: User },
];

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  console.log("Rendering BottomNavBar, current path:", location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/" && location.pathname.startsWith("/restaurant")); // Highlight Home if on restaurant page
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 p-2 rounded-md text-xs font-medium transition-colors w-1/4",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;