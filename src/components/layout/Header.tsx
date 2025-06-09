import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingCart, User, MapPin, Search, ChevronLeft, Menu } from 'lucide-react';

type HeaderVariant = 'default' | 'searchFocus' | 'simpleTitle' | 'pageTitle';

interface HeaderProps {
  variant?: HeaderVariant;
  title?: string;
  onSearchSubmit?: (searchTerm: string) => void;
  onLocationClick?: () => void;
  onBackClick?: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  variant = 'default',
  title,
  onSearchSubmit,
  onLocationClick,
  onBackClick,
  showMenuButton,
  onMenuClick
}) => {
  console.log(`Rendering Header, variant: ${variant}, title: ${title}`);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm);
    }
    console.log('Search submitted:', searchTerm);
  };

  const renderDefaultHeader = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {showMenuButton && onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" onClick={onLocationClick} className="text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate max-w-[150px] sm:max-w-xs">Delivery Location</span>
        </Button>
      </div>
      <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-md px-2 py-1 flex-1 max-w-md">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search restaurants or dishes..."
          className="bg-transparent border-none focus:ring-0 h-8 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="flex items-center space-x-2">
        <Link to="/cart">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <Avatar className="h-7 w-7">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
            </Avatar>
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderSearchFocusHeader = () => (
    <div className="flex items-center space-x-2">
      {onBackClick && (
        <Button variant="ghost" size="icon" onClick={onBackClick}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
      <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-gray-100 rounded-md px-2 py-1 flex-1">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          type="search"
          placeholder="Search..."
          className="bg-transparent border-none focus:ring-0 h-9 text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );

  const renderSimpleTitleHeader = () => (
    <div className="flex items-center">
      {onBackClick && (
        <Button variant="ghost" size="icon" onClick={onBackClick} className="-ml-2">
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}
      {title && <h1 className="text-lg font-semibold ml-2">{title}</h1>}
    </div>
  );

  const renderPageTitleHeader = () => (
     <div className="flex items-center justify-between">
        {showMenuButton && onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {title && <h1 className="text-xl font-semibold text-center flex-1 md:text-left md:flex-none">{title}</h1>}
         {/* Placeholder for potential right-side actions on page title headers */}
        <div className="w-8 md:hidden"></div> {/* Spacer for centering title on mobile if menu button exists */}
    </div>
  );


  let content;
  switch (variant) {
    case 'searchFocus':
      content = renderSearchFocusHeader();
      break;
    case 'simpleTitle':
      content = renderSimpleTitleHeader();
      break;
    case 'pageTitle':
      content = renderPageTitleHeader();
      break;
    case 'default':
    default:
      content = renderDefaultHeader();
      break;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-4 sm:px-6 py-3">
      {content}
    </header>
  );
};

export default Header;