import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScenarioCard = ({ scenario, onScenarioClick, onPlayDemo }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-success border-success/20 bg-success/10';
      case 'Medium':
        return 'text-warning border-warning/20 bg-warning/10';
      case 'Hard':
        return 'text-error border-error/20 bg-error/10';
      default:
        return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Healthcare':
        return 'Heart';
      case 'Navigation':
        return 'Navigation';
      case 'Shopping':
        return 'ShoppingCart';
      case 'Social':
        return 'Users';
      case 'Transportation':
        return 'Car';
      case 'Education':
        return 'BookOpen';
      case 'Safety':
        return 'Shield';
      default:
        return 'Eye';
    }
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted/20">
        <Image
          src={scenario?.image}
          alt={scenario?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-2 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full border border-border">
          <Icon 
            name={getCategoryIcon(scenario?.category)} 
            size={14} 
            className="text-primary" 
          />
          <span className="text-xs font-medium text-foreground">
            {scenario?.category}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(scenario?.difficulty)}`}>
          {scenario?.difficulty}
        </div>

        {/* Play Demo Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onPlayDemo(scenario);
            }}
            iconName="Play"
            iconPosition="left"
            iconSize={14}
            className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm"
            aria-label={`Play demo for ${scenario?.title}`}
          >
            Demo
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {scenario?.title}
          </h3>
          <div className="flex items-center space-x-1 text-muted-foreground ml-2">
            <Icon name="Clock" size={14} />
            <span className="text-xs">{scenario?.duration}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {scenario?.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {scenario?.features?.slice(0, 3)?.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md"
            >
              {feature}
            </span>
          ))}
          {scenario?.features?.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md">
              +{scenario?.features?.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{scenario?.usage}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span>{scenario?.rating}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Volume2" size={12} />
            <span>Audio Available</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onScenarioClick(scenario)}
          className="w-full group-hover:border-primary/40 group-hover:text-primary transition-colors duration-200"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          Explore Scenario
        </Button>
      </div>
      {/* Accessibility Enhancement */}
      <div className="sr-only">
        Scenario: {scenario?.title}. Category: {scenario?.category}. 
        Difficulty: {scenario?.difficulty}. Duration: {scenario?.duration}. 
        Rating: {scenario?.rating} stars. Used by {scenario?.usage} people.
      </div>
    </div>
  );
};

export default ScenarioCard;