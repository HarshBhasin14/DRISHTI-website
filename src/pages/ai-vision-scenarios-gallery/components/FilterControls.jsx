import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterControls = ({
  selectedCategory,
  selectedDifficulty,
  selectedSort,
  searchQuery,
  onCategoryChange,
  onDifficultyChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
  scenarioCount,
  totalCount
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Navigation', label: 'Navigation' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Social', label: 'Social' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Education', label: 'Education' },
    { value: 'Safety', label: 'Safety' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' }
  ];

  const sortOptions = [
    { value: 'title', label: 'Title A-Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'usage', label: 'Most Popular' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'category', label: 'Category' }
  ];

  const hasActiveFilters = selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery?.trim() !== '';

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Filter Scenarios
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing {scenarioCount} of {totalCount} scenarios
          </p>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={16} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search scenarios..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
          aria-label="Search scenarios"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <Select
            label="Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={onCategoryChange}
            className="w-full"
          />
        </div>

        {/* Difficulty Filter */}
        <div>
          <Select
            label="Difficulty"
            options={difficultyOptions}
            value={selectedDifficulty}
            onChange={onDifficultyChange}
            className="w-full"
          />
        </div>

        {/* Sort Filter */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={selectedSort}
            onChange={onSortChange}
            className="w-full"
          />
        </div>

        {/* Audio Toggle */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-foreground mb-2">
            Audio Features
          </label>
          <Button
            variant="outline"
            size="default"
            iconName="Volume2"
            iconPosition="left"
            iconSize={16}
            className="justify-start h-11"
          >
            Audio Available
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                  {selectedCategory}
                  <button
                    onClick={() => onCategoryChange('all')}
                    className="ml-1 hover:text-primary/80"
                    aria-label={`Remove ${selectedCategory} filter`}
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                  {selectedDifficulty}
                  <button
                    onClick={() => onDifficultyChange('all')}
                    className="ml-1 hover:text-primary/80"
                    aria-label={`Remove ${selectedDifficulty} filter`}
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {searchQuery?.trim() && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                  "{searchQuery}"
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-1 hover:text-primary/80"
                    aria-label="Clear search filter"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;