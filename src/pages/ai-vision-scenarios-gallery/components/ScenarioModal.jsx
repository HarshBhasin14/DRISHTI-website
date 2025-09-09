import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScenarioModal = ({ scenario, isOpen, onClose, onPlayDemo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus management for accessibility
      const modal = document.getElementById('scenario-modal');
      if (modal) {
        modal?.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
      setIsPlaying(false);
      setCurrentStep(0);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      onClose();
    }
  };

  const handlePlayDemo = () => {
    setIsPlaying(true);
    onPlayDemo(scenario);
    
    if (audioEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Starting demonstration for ${scenario.title}. ${scenario.audioDescription}`
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleStepNavigation = (direction) => {
    const maxSteps = scenario?.steps?.length || 0;
    if (direction === 'next' && currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }

    if (audioEnabled && scenario?.steps && scenario?.steps?.[currentStep]) {
      const utterance = new SpeechSynthesisUtterance(scenario.steps[currentStep].description);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      speechSynthesis.cancel();
    }
  };

  if (!isOpen || !scenario) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        id="scenario-modal"
        className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e?.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Icon name="Eye" size={16} />
              <span>{scenario?.category}</span>
            </div>
            <h2 id="modal-title" className="text-2xl font-bold text-foreground">
              {scenario?.title}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAudio}
              iconName={audioEnabled ? "Volume2" : "VolumeX"}
              iconSize={20}
              className={audioEnabled ? "text-primary" : "text-muted-foreground"}
              aria-label={audioEnabled ? "Disable audio" : "Enable audio"}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={20}
              aria-label="Close modal"
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Hero Section */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={scenario?.image}
              alt={scenario?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Play Demo Button */}
            <div className="absolute bottom-6 left-6">
              <Button
                variant="default"
                size="lg"
                onClick={handlePlayDemo}
                iconName="Play"
                iconPosition="left"
                iconSize={20}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                disabled={isPlaying}
                loading={isPlaying}
              >
                {isPlaying ? 'Playing Demo...' : 'Play Interactive Demo'}
              </Button>
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-6 right-6 flex space-x-4">
              <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center space-x-1 text-warning">
                  <Icon name="Star" size={14} className="fill-current" />
                  <span className="font-medium">{scenario?.rating}</span>
                </div>
              </div>
              <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{scenario?.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description and Details */}
          <div className="p-6">
            <p id="modal-description" className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {scenario?.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Zap" size={20} className="text-primary" />
                  <span>AI Features</span>
                </h3>
                <div className="space-y-2">
                  {scenario?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Target" size={20} className="text-primary" />
                  <span>Benefits</span>
                </h3>
                <div className="space-y-2">
                  {scenario?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                      <Icon name="ArrowRight" size={16} className="text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                        <Icon name="ArrowRight" size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">Enhanced independence</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                        <Icon name="ArrowRight" size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">Improved safety</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                        <Icon name="ArrowRight" size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">Better quality of life</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Demo Steps */}
            {scenario?.steps && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="List" size={20} className="text-primary" />
                  <span>Demo Steps</span>
                </h3>
                
                <div className="bg-muted/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      Step {currentStep + 1} of {scenario?.steps?.length}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStepNavigation('prev')}
                        disabled={currentStep === 0}
                        iconName="ChevronLeft"
                        iconSize={16}
                        aria-label="Previous step"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStepNavigation('next')}
                        disabled={currentStep === scenario?.steps?.length - 1}
                        iconName="ChevronRight"
                        iconSize={16}
                        aria-label="Next step"
                      />
                    </div>
                  </div>
                  
                  <div className="text-foreground">
                    <h4 className="font-medium mb-2">{scenario?.steps?.[currentStep]?.title}</h4>
                    <p className="text-muted-foreground">{scenario?.steps?.[currentStep]?.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-muted/10 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{scenario?.usage}</div>
                <div className="text-sm text-muted-foreground">Users Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">{scenario?.rating}/5</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">{scenario?.difficulty}</div>
                <div className="text-sm text-muted-foreground">Difficulty Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Volume2" size={14} />
              <span>Audio narration available</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Accessibility" size={14} />
              <span>Screen reader compatible</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
            >
              Back to Gallery
            </Button>
            <Button
              variant="default"
              onClick={() => window.location.href = '/demo-experience-player'}
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={16}
            >
              Try Full Experience
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioModal;