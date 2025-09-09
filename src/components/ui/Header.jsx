import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    {
      name: 'Product Showcase',
      path: '/interactive-product-showcase',
      icon: 'Eye'
    },
    {
      name: 'AI Scenarios',
      path: '/ai-vision-scenarios-gallery',
      icon: 'Brain'
    },
    {
      name: 'Demo Player',
      path: '/demo-experience-player',
      icon: 'Play'
    }
  ];

  const secondaryNavItems = [
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
    { name: 'Support', path: '/support', icon: 'MessageCircle' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-heading font-bold text-foreground tracking-tight">
              VISIONX
            </h1>
            <span className="text-xs font-caption text-muted-foreground">
              Assistive Technology
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Primary navigation">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-body focus-ring-adaptive semantic-interactive"
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {item?.name}
            </Button>
          ))}
        </nav>

        {/* Actions Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMoreMenu}
              className="focus-ring-adaptive"
              iconName="MoreHorizontal"
              iconSize={20}
              aria-expanded={isMoreMenuOpen}
              aria-haspopup="true"
              aria-label="More options"
            >
              More
            </Button>

            {/* Dropdown Menu */}
            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-60">
                <div className="py-2" role="menu">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-body text-popover-foreground hover:bg-muted/50 focus-ring-adaptive"
                      role="menuitem"
                    >
                      <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                      <span>{item?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden focus-ring-adaptive"
            iconName="Menu"
            iconSize={20}
            aria-label="Open mobile menu"
          >
            Menu
          </Button>

          {/* Accessibility Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="focus-ring-keyboard"
            iconName="Accessibility"
            iconSize={16}
            aria-label="Toggle accessibility features"
          >
            <span className="sr-only">Accessibility</span>
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-sm">
        <nav className="px-6 py-4 space-y-2" role="navigation" aria-label="Mobile navigation">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              className="w-full justify-start space-x-3 focus-ring-adaptive semantic-interactive"
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {item?.name}
            </Button>
          ))}
          <div className="border-t border-border pt-2 mt-4">
            {secondaryNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className="w-full justify-start space-x-3 text-muted-foreground focus-ring-adaptive"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
              >
                {item?.name}
              </Button>
            ))}
          </div>
        </nav>
      </div>
      {/* Click outside overlay to close more menu */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMoreMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;