import React from 'react';
import ScenarioCard from './ScenarioCard';
import Icon from '../../../components/AppIcon';

const ScenarioGrid = ({ scenarios, onScenarioClick, onPlayDemo, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
            <div className="h-48 bg-muted/20" />
            <div className="p-6">
              <div className="h-4 bg-muted/20 rounded mb-3" />
              <div className="h-3 bg-muted/20 rounded mb-2" />
              <div className="h-3 bg-muted/20 rounded mb-4 w-3/4" />
              <div className="flex space-x-2 mb-4">
                <div className="h-6 bg-muted/20 rounded w-16" />
                <div className="h-6 bg-muted/20 rounded w-20" />
              </div>
              <div className="h-9 bg-muted/20 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (scenarios?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted/20 rounded-full flex items-center justify-center">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No scenarios found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Try adjusting your filters or search terms to find the scenarios you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <div className="text-sm text-muted-foreground">
            Suggestions: Try searching for "navigation", "healthcare", or "shopping"
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scenarios?.map((scenario) => (
        <ScenarioCard
          key={scenario?.id}
          scenario={scenario}
          onScenarioClick={onScenarioClick}
          onPlayDemo={onPlayDemo}
        />
      ))}
    </div>
  );
};

export default ScenarioGrid;