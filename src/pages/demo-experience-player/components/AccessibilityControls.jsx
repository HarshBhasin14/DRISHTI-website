import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccessibilityControls = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    captions: true,
    audioDescription: true,
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    keyboardNavigation: true,
    screenReaderMode: false,
    autoPlay: false
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const accessibilityOptions = [
    {
      key: 'captions',
      label: 'Closed Captions',
      description: 'Display text captions for audio content',
      icon: 'Captions'
    },
    {
      key: 'audioDescription',
      label: 'Audio Description',
      description: 'Narrate visual elements and actions',
      icon: 'Volume2'
    },
    {
      key: 'highContrast',
      label: 'High Contrast Mode',
      description: 'Increase color contrast for better visibility',
      icon: 'Contrast'
    },
    {
      key: 'reducedMotion',
      label: 'Reduced Motion',
      description: 'Minimize animations and transitions',
      icon: 'Pause'
    },
    {
      key: 'largeText',
      label: 'Large Text',
      description: 'Increase text size for better readability',
      icon: 'Type'
    },
    {
      key: 'keyboardNavigation',
      label: 'Keyboard Navigation',
      description: 'Enable full keyboard control',
      icon: 'Keyboard'
    },
    {
      key: 'screenReaderMode',
      label: 'Screen Reader Mode',
      description: 'Optimize for screen reader compatibility',
      icon: 'Accessibility'
    },
    {
      key: 'autoPlay',
      label: 'Auto-play Videos',
      description: 'Automatically start video playback',
      icon: 'PlayCircle'
    }
  ];

  const enabledCount = Object.values(settings)?.filter(Boolean)?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20">
            <Icon name="Accessibility" size={16} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Accessibility</h3>
            <p className="text-xs text-muted-foreground">
              {enabledCount} of {accessibilityOptions?.length} features enabled
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconSize={16}
          aria-label={isExpanded ? 'Collapse accessibility controls' : 'Expand accessibility controls'}
        />
      </div>
      {/* Quick Toggle Bar */}
      <div className="p-4 bg-muted/20 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-body text-foreground">Quick Access</span>
          <div className="flex items-center space-x-2">
            <Button
              variant={settings?.captions ? 'default' : 'outline'}
              size="xs"
              onClick={() => handleSettingChange('captions', !settings?.captions)}
              iconName="Captions"
              iconSize={14}
              aria-label="Toggle captions"
            />
            
            <Button
              variant={settings?.audioDescription ? 'default' : 'outline'}
              size="xs"
              onClick={() => handleSettingChange('audioDescription', !settings?.audioDescription)}
              iconName="Volume2"
              iconSize={14}
              aria-label="Toggle audio description"
            />
            
            <Button
              variant={settings?.highContrast ? 'default' : 'outline'}
              size="xs"
              onClick={() => handleSettingChange('highContrast', !settings?.highContrast)}
              iconName="Contrast"
              iconSize={14}
              aria-label="Toggle high contrast"
            />
          </div>
        </div>
      </div>
      {/* Detailed Controls */}
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-4">
            {accessibilityOptions?.map((option) => (
              <div key={option?.key} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Checkbox
                    checked={settings?.[option?.key]}
                    onChange={(e) => handleSettingChange(option?.key, e?.target?.checked)}
                    id={`accessibility-${option?.key}`}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={`accessibility-${option?.key}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                    <span className="font-body font-medium text-foreground">
                      {option?.label}
                    </span>
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Preset Configurations */}
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="font-body font-medium text-foreground mb-3">Quick Presets</h4>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const visuallyImpairedSettings = {
                    captions: true,
                    audioDescription: true,
                    highContrast: true,
                    reducedMotion: false,
                    largeText: true,
                    keyboardNavigation: true,
                    screenReaderMode: true,
                    autoPlay: false
                  };
                  setSettings(visuallyImpairedSettings);
                  onSettingsChange?.(visuallyImpairedSettings);
                }}
                className="justify-start"
                iconName="Eye"
                iconPosition="left"
                iconSize={16}
              >
                Visually Impaired Preset
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const hearingImpairedSettings = {
                    captions: true,
                    audioDescription: false,
                    highContrast: false,
                    reducedMotion: false,
                    largeText: false,
                    keyboardNavigation: true,
                    screenReaderMode: false,
                    autoPlay: true
                  };
                  setSettings(hearingImpairedSettings);
                  onSettingsChange?.(hearingImpairedSettings);
                }}
                className="justify-start"
                iconName="EarOff"
                iconPosition="left"
                iconSize={16}
              >
                Hearing Impaired Preset
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const motorImpairedSettings = {
                    captions: false,
                    audioDescription: false,
                    highContrast: false,
                    reducedMotion: true,
                    largeText: false,
                    keyboardNavigation: true,
                    screenReaderMode: false,
                    autoPlay: true
                  };
                  setSettings(motorImpairedSettings);
                  onSettingsChange?.(motorImpairedSettings);
                }}
                className="justify-start"
                iconName="Hand"
                iconPosition="left"
                iconSize={16}
              >
                Motor Impaired Preset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityControls;