import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoLauncher = ({ onLaunchDemo, isAudioEnabled, onPlayAudio }) => {
  const [isHovered, setIsHovered] = useState(false);

  const demoFeatures = [
    {
      icon: 'Eye',
      title: 'Object Detection',
      description: 'Real-time identification of objects, people, and obstacles'
    },
    {
      icon: 'Navigation',
      title: 'Navigation Assistance',
      description: 'Turn-by-turn directions with spatial audio guidance'
    },
    {
      icon: 'FileText',
      title: 'Text Recognition',
      description: 'Read signs, labels, and documents aloud instantly'
    },
    {
      icon: 'Users',
      title: 'Face Recognition',
      description: 'Identify familiar faces and describe people nearby'
    }
  ];

  const handleDemoClick = () => {
    if (isAudioEnabled) {
      onPlayAudio("Launching interactive demo experience. You will see real-time AI vision capabilities including object detection, navigation assistance, and text recognition in action.");
    }
    onLaunchDemo();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Demo Button */}
      <div className="text-center mb-8">
        <Button
          variant="default"
          size="lg"
          onClick={handleDemoClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative px-8 py-4 text-lg font-semibold transition-all duration-300 transform ${
            isHovered ? 'scale-105' : 'scale-100'
          } focus-ring-adaptive semantic-interactive`}
          iconName="Play"
          iconPosition="left"
          iconSize={24}
        >
          Try Interactive Demo
        </Button>

        <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
          Experience VISIONX capabilities through simulated real-world scenarios with AI-powered visual assistance
        </p>
      </div>
      {/* Feature Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {demoFeatures?.map((feature, index) => (
          <div
            key={feature?.title}
            className="bg-card/50 border border-border rounded-lg p-4 hover:bg-card/70 transition-all duration-200 hover:border-primary/30"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon 
                  name={feature?.icon} 
                  size={24} 
                  className="text-primary" 
                />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {feature?.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Demo Stats */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">Object Recognition Accuracy</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-secondary">12hrs</div>
            <div className="text-sm text-muted-foreground">Battery Life</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-accent">0.3s</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
        </div>
      </div>
      {/* Quick Access Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/ai-vision-scenarios-gallery'}
          className="focus-ring-adaptive"
          iconName="Grid3X3"
          iconPosition="left"
          iconSize={16}
        >
          View Scenarios
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/demo-experience-player'}
          className="focus-ring-adaptive"
          iconName="PlayCircle"
          iconPosition="left"
          iconSize={16}
        >
          Full Experience
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (isAudioEnabled) {
              onPlayAudio("VISIONX smart glasses use advanced AI to provide real-time visual assistance for the visually impaired. Features include object detection, navigation help, text reading, and face recognition.");
            }
          }}
          className="focus-ring-adaptive"
          iconName="Info"
          iconPosition="left"
          iconSize={16}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default DemoLauncher;