import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HotspotTooltip = ({ 
  hotspot, 
  onClose, 
  onPlayAudio, 
  isAudioEnabled,
  position = { x: 0, y: 0 }
}) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipRef?.current && hotspot) {
      // Auto-play audio description if enabled
      if (isAudioEnabled) {
        onPlayAudio(hotspot?.description);
      }
    }
  }, [hotspot, isAudioEnabled, onPlayAudio]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!hotspot) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg max-w-sm w-full mx-4"
        style={{
          left: `${Math.min(Math.max(position?.x, 16), window.innerWidth - 400)}px`,
          top: `${Math.min(Math.max(position?.y, 16), window.innerHeight - 200)}px`,
        }}
        role="dialog"
        aria-labelledby="hotspot-title"
        aria-describedby="hotspot-description"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon 
                name={getHotspotIcon(hotspot?.id)} 
                size={16} 
                className="text-primary" 
              />
            </div>
            <h3 
              id="hotspot-title"
              className="text-sm font-semibold text-foreground"
            >
              {hotspot?.name}
            </h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 focus-ring-adaptive"
            iconName="X"
            iconSize={16}
            aria-label="Close tooltip"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <p 
            id="hotspot-description"
            className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
          >
            {hotspot?.description}
          </p>

          {/* Audio Controls */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPlayAudio(hotspot?.description)}
              className="flex items-center space-x-2 focus-ring-adaptive"
              iconName="Volume2"
              iconPosition="left"
              iconSize={14}
            >
              Play Audio
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                Press ESC to close
              </span>
            </div>
          </div>
        </div>

        {/* Visual indicator for the hotspot */}
        <div className="absolute -top-2 left-6 w-4 h-4 bg-primary rounded-full animate-pulse" />
      </div>
    </>
  );
};

// Helper function to get appropriate icon for each hotspot
const getHotspotIcon = (hotspotId) => {
  const iconMap = {
    'camera': 'Camera',
    'speaker-left': 'Volume2',
    'speaker-right': 'Volume2',
    'microphone': 'Mic',
    'battery': 'Battery'
  };
  return iconMap?.[hotspotId] || 'Info';
};

export default HotspotTooltip;