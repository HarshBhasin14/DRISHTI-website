import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const AccessibilityPanel = ({ 
  isDarkMode, 
  onThemeToggle, 
  isAudioEnabled, 
  onAudioToggle, 
  isCaptionsEnabled, 
  onCaptionsToggle 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (highContrast) {
      document.body?.classList?.add('high-contrast');
    } else {
      document.body?.classList?.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className={`bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-12'
      }`}>
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full h-12 flex items-center justify-center focus-ring-adaptive"
          iconName="Accessibility"
          iconSize={20}
          aria-label={isExpanded ? "Collapse accessibility panel" : "Expand accessibility panel"}
          aria-expanded={isExpanded}
        />

        {/* Expanded Panel */}
        {isExpanded && (
          <div className="p-4 border-t border-border space-y-3">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Accessibility Controls
            </h3>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeToggle}
                className="h-8 w-8 p-0 focus-ring-adaptive"
                iconName={isDarkMode ? "Moon" : "Sun"}
                iconSize={16}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              />
            </div>

            {/* Audio Narration Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">
                Audio Narration
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={onAudioToggle}
                className={`h-8 w-8 p-0 focus-ring-adaptive ${
                  isAudioEnabled ? 'text-success' : 'text-muted-foreground'
                }`}
                iconName={isAudioEnabled ? "Volume2" : "VolumeX"}
                iconSize={16}
                aria-label={`${isAudioEnabled ? 'Disable' : 'Enable'} audio narration`}
              />
            </div>

            {/* Captions Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">
                Captions
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCaptionsToggle}
                className={`h-8 w-8 p-0 focus-ring-adaptive ${
                  isCaptionsEnabled ? 'text-success' : 'text-muted-foreground'
                }`}
                iconName={isCaptionsEnabled ? "Subtitles" : "FileText"}
                iconSize={16}
                aria-label={`${isCaptionsEnabled ? 'Hide' : 'Show'} captions`}
              />
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">
                High Contrast
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleHighContrast}
                className={`h-8 w-8 p-0 focus-ring-adaptive ${
                  highContrast ? 'text-success' : 'text-muted-foreground'
                }`}
                iconName={highContrast ? "Eye" : "EyeOff"}
                iconSize={16}
                aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
              />
            </div>

            {/* Keyboard Navigation Info */}
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use arrow keys to rotate model, +/- to zoom, Space to reset view
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilityPanel;