import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductHero = ({ onPlayAudio, isAudioEnabled }) => {
  const [currentYear] = useState(new Date()?.getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-play welcome message if audio is enabled
    if (isAudioEnabled) {
      setTimeout(() => {
        onPlayAudio("Welcome to VISIONX Interactive Product Showcase. Empowering the blind with intelligent vision technology. Explore our smart glasses through immersive 3D visualization and discover AI-powered capabilities that transform daily experiences.");
      }, 1000);
    }
  }, [isAudioEnabled, onPlayAudio]);

  const features = [
    {
      icon: 'Eye',
      text: 'AI-Powered Vision'
    },
    {
      icon: 'Volume2',
      text: 'Spatial Audio'
    },
    {
      icon: 'Zap',
      text: 'Real-time Processing'
    },
    {
      icon: 'Shield',
      text: 'Privacy First'
    }
  ];

  return (
    <div className={`text-center space-y-6 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {/* Main Title */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm">
          <Icon name="Sparkles" size={16} className="text-primary" />
          <span className="text-primary font-medium">Next-Generation Assistive Technology</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            VISIONX
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
          Empowering the Blind with{' '}
          <span className="text-primary font-medium">Intelligent Vision</span>
        </p>
      </div>
      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
        {features?.map((feature, index) => (
          <div
            key={feature?.text}
            className={`flex items-center space-x-2 bg-card/50 border border-border rounded-full px-4 py-2 transition-all duration-500 hover:bg-card/70 hover:border-primary/30 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Icon name={feature?.icon} size={16} className="text-primary" />
            <span className="text-sm text-foreground font-medium">
              {feature?.text}
            </span>
          </div>
        ))}
      </div>
      {/* Description */}
      <div className="max-w-4xl mx-auto space-y-4">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Experience revolutionary smart glasses that transform how visually impaired individuals 
          navigate and interact with the world. Through advanced AI vision processing, spatial audio, 
          and intuitive voice commands, VISIONX provides unprecedented independence and confidence.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>FDA Approved</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-success" />
            <span>CES Innovation Award {currentYear}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-success" />
            <span>10,000+ Users Worldwide</span>
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button
          variant="default"
          size="lg"
          onClick={() => {
            if (isAudioEnabled) {
              onPlayAudio("Scrolling to interactive 3D model. Use your mouse to rotate and explore the smart glasses, or use keyboard controls for accessibility.");
            }
            document.getElementById('3d-showcase')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-3 text-lg font-semibold focus-ring-adaptive semantic-interactive"
          iconName="MousePointer"
          iconPosition="left"
          iconSize={20}
        >
          Explore in 3D
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            if (isAudioEnabled) {
              onPlayAudio("Opening accessibility information. VISIONX is designed with comprehensive accessibility features including screen reader support, keyboard navigation, and audio descriptions.");
            }
          }}
          className="px-8 py-3 text-lg font-semibold focus-ring-adaptive"
          iconName="Accessibility"
          iconPosition="left"
          iconSize={20}
        >
          Accessibility Info
        </Button>
      </div>
      {/* Scroll Indicator */}
      <div className="pt-8">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default ProductHero;