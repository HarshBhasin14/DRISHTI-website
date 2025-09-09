import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetectionPanel = ({ currentTime, scenario }) => {
  const [detections, setDetections] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Mock detection data that changes based on video time
  const mockDetectionData = {
    'indoor-navigation': [
      {
        time: 0,
        objects: [
          { id: 1, name: 'Door', confidence: 94, position: { x: 120, y: 80 }, description: 'Wooden door with metal handle, partially open' },
          { id: 2, name: 'Wall', confidence: 98, position: { x: 200, y: 150 }, description: 'White painted wall with light switch' }
        ]
      },
      {
        time: 5,
        objects: [
          { id: 3, name: 'Chair', confidence: 87, position: { x: 300, y: 200 }, description: 'Office chair with wheels, black leather' },
          { id: 4, name: 'Table', confidence: 91, position: { x: 250, y: 180 }, description: 'Wooden desk with laptop and papers' },
          { id: 5, name: 'Person', confidence: 89, position: { x: 180, y: 120 }, description: 'Person sitting at desk, wearing blue shirt' }
        ]
      },
      {
        time: 10,
        objects: [
          { id: 6, name: 'Text', confidence: 92, position: { x: 160, y: 100 }, description: 'Sign reading "Conference Room A"' },
          { id: 7, name: 'Plant', confidence: 85, position: { x: 320, y: 220 }, description: 'Green potted plant on windowsill' }
        ]
      }
    ],
    'outdoor-mobility': [
      {
        time: 0,
        objects: [
          { id: 1, name: 'Crosswalk', confidence: 96, position: { x: 200, y: 300 }, description: 'Zebra crossing with white stripes' },
          { id: 2, name: 'Traffic Light', confidence: 93, position: { x: 100, y: 50 }, description: 'Red traffic light, do not cross' }
        ]
      },
      {
        time: 8,
        objects: [
          { id: 3, name: 'Car', confidence: 88, position: { x: 250, y: 200 }, description: 'Blue sedan approaching from left' },
          { id: 4, name: 'Sidewalk', confidence: 95, position: { x: 150, y: 350 }, description: 'Concrete sidewalk with slight crack' }
        ]
      }
    ],
    'reading-assistance': [
      {
        time: 0,
        objects: [
          { id: 1, name: 'Text', confidence: 97, position: { x: 200, y: 150 }, description: 'Menu item: "Grilled Salmon - $24.99"' },
          { id: 2, name: 'Text', confidence: 94, position: { x: 200, y: 180 }, description: 'Description: "Fresh Atlantic salmon with herbs"' }
        ]
      },
      {
        time: 6,
        objects: [
          { id: 3, name: 'Text', confidence: 96, position: { x: 200, y: 210 }, description: 'Menu item: "Vegetarian Pasta - $18.99"' },
          { id: 4, name: 'Image', confidence: 89, position: { x: 300, y: 150 }, description: 'Photo of grilled salmon dish' }
        ]
      }
    ]
  };

  useEffect(() => {
    const scenarioData = mockDetectionData?.[scenario] || mockDetectionData?.['indoor-navigation'];
    
    // Find the most recent detection data based on current time
    let currentDetections = [];
    for (let i = scenarioData?.length - 1; i >= 0; i--) {
      if (currentTime >= scenarioData?.[i]?.time) {
        currentDetections = scenarioData?.[i]?.objects;
        break;
      }
    }
    
    setDetections(currentDetections);
  }, [currentTime, scenario]);

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 75) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceBadgeColor = (confidence) => {
    if (confidence >= 90) return 'bg-success/20 text-success border-success/30';
    if (confidence >= 75) return 'bg-warning/20 text-warning border-warning/30';
    return 'bg-error/20 text-error border-error/30';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
            <Icon name="Eye" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">AI Detection</h3>
            <p className="text-xs text-muted-foreground">Real-time object recognition</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconSize={16}
          aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
        />
      </div>
      {/* Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Detection Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-primary">{detections?.length}</div>
              <div className="text-xs text-muted-foreground">Objects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-secondary">
                {detections?.length > 0 ? Math.round(detections?.reduce((acc, obj) => acc + obj?.confidence, 0) / detections?.length) : 0}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-accent">
                {detections?.filter(obj => obj?.confidence >= 90)?.length}
              </div>
              <div className="text-xs text-muted-foreground">High Confidence</div>
            </div>
          </div>

          {/* Detection List */}
          <div className="space-y-3">
            <h4 className="font-body font-medium text-foreground mb-3">Detected Objects</h4>
            
            {detections?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No objects detected</p>
                <p className="text-muted-foreground text-xs">AI is analyzing the scene...</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {detections?.map((detection) => (
                  <div
                    key={detection?.id}
                    className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse mt-2"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-body font-medium text-foreground truncate">
                          {detection?.name}
                        </h5>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono border ${getConfidenceBadgeColor(detection?.confidence)}`}>
                          {detection?.confidence}%
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {detection?.description}
                      </p>
                      
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Icon name="MapPin" size={12} className="mr-1" />
                        <span>Position: {detection?.position?.x}, {detection?.position?.y}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audio Description Status */}
          <div className="mt-6 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Volume2" size={16} className="text-primary" />
              <span className="text-sm font-body text-primary">Audio Description Active</span>
            </div>
            <p className="text-xs text-primary/80 mt-1">
              Narrating detected objects and scene context
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectionPanel;