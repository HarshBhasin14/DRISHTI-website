import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const ScenarioSelector = ({ currentScenario, onScenarioChange, progress }) => {
  const scenarios = [
    {
      value: 'indoor-navigation',
      label: 'Indoor Navigation',
      description: 'Navigate through office spaces and buildings',
      icon: 'Building',
      duration: '2:30',
      difficulty: 'Beginner'
    },
    {
      value: 'outdoor-mobility',
      label: 'Outdoor Mobility',
      description: 'Street crossing and sidewalk navigation',
      icon: 'Navigation',
      duration: '3:15',
      difficulty: 'Intermediate'
    },
    {
      value: 'reading-assistance',
      label: 'Reading Assistance',
      description: 'Menu reading and text recognition',
      icon: 'BookOpen',
      duration: '2:45',
      difficulty: 'Beginner'
    },
    {
      value: 'face-recognition',
      label: 'Face Recognition',
      description: 'Identifying people in social settings',
      icon: 'Users',
      duration: '3:00',
      difficulty: 'Advanced'
    },
    {
      value: 'object-detection',
      label: 'Object Detection',
      description: 'Identifying everyday objects and obstacles',
      icon: 'Scan',
      duration: '2:20',
      difficulty: 'Beginner'
    }
  ];

  const currentScenarioData = scenarios?.find(s => s?.value === currentScenario) || scenarios?.[0];

  const handleScenarioChange = (value) => {
    onScenarioChange(value);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/20 border-success/30';
      case 'Intermediate': return 'text-warning bg-warning/20 border-warning/30';
      case 'Advanced': return 'text-error bg-error/20 border-error/30';
      default: return 'text-muted-foreground bg-muted/20 border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20">
          <Icon name="Play" size={16} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Demo Scenarios</h3>
          <p className="text-xs text-muted-foreground">Choose your experience</p>
        </div>
      </div>
      {/* Scenario Selector */}
      <div className="mb-4">
        <Select
          label="Select Scenario"
          options={scenarios?.map(scenario => ({
            value: scenario?.value,
            label: scenario?.label,
            description: scenario?.description
          }))}
          value={currentScenario}
          onChange={handleScenarioChange}
          className="mb-3"
        />
      </div>
      {/* Current Scenario Info */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
            <Icon name={currentScenarioData?.icon} size={20} className="text-primary" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-body font-semibold text-foreground mb-1">
              {currentScenarioData?.label}
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {currentScenarioData?.description}
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">
                  {currentScenarioData?.duration}
                </span>
              </div>
              
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body border ${getDifficultyColor(currentScenarioData?.difficulty)}`}>
                {currentScenarioData?.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-foreground">Progress</span>
          <span className="text-sm font-mono text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Start</span>
          <span>Complete</span>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 transition-colors text-sm font-body">
            <Icon name="RotateCcw" size={14} />
            <span>Restart</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 transition-colors text-sm font-body">
            <Icon name="Bookmark" size={14} />
            <span>Bookmark</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelector;