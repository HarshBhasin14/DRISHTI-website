import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VideoPlayer from './components/VideoPlayer';
import DetectionPanel from './components/DetectionPanel';
import ScenarioSelector from './components/ScenarioSelector';
import AccessibilityControls from './components/AccessibilityControls';

const DemoExperiencePlayer = () => {
  const navigate = useNavigate();
  const [currentScenario, setCurrentScenario] = useState('indoor-navigation');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    captions: true,
    audioDescription: true,
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    keyboardNavigation: true,
    screenReaderMode: false,
    autoPlay: false
  });
  const [isLoading, setIsLoading] = useState(true);

  // Calculate progress percentage
  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleDurationChange = (dur) => {
    setDuration(dur);
  };

  const handleScenarioChange = (scenario) => {
    setCurrentScenario(scenario);
    setCurrentTime(0);
    setProgress(0);
  };

  const handleAccessibilityChange = (settings) => {
    setAccessibilitySettings(settings);
    
    // Apply accessibility settings to document
    if (settings?.highContrast) {
      document.documentElement?.classList?.add('high-contrast');
    } else {
      document.documentElement?.classList?.remove('high-contrast');
    }
    
    if (settings?.largeText) {
      document.documentElement?.classList?.add('large-text');
    } else {
      document.documentElement?.classList?.remove('large-text');
    }
    
    if (settings?.reducedMotion) {
      document.documentElement?.classList?.add('reduced-motion');
    } else {
      document.documentElement?.classList?.remove('reduced-motion');
    }
  };

  const navigationItems = [
    {
      label: 'Product Showcase',
      path: '/interactive-product-showcase',
      icon: 'Eye',
      description: 'Explore 3D product model'
    },
    {
      label: 'AI Scenarios',
      path: '/ai-vision-scenarios-gallery',
      icon: 'Brain',
      description: 'Browse use case scenarios'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
              Loading Demo Experience
            </h2>
            <p className="text-muted-foreground">
              Preparing immersive AI vision demonstration...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${accessibilitySettings?.highContrast ? 'high-contrast' : ''} ${accessibilitySettings?.largeText ? 'large-text' : ''}`}>
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background via-background to-primary/5 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary">
                  <Icon name="Play" size={32} className="text-primary-foreground" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Demo Experience Player
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Experience VISIONX smart glasses through immersive simulated demonstrations with real-time AI object detection and audio narration
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Eye" size={16} className="text-primary" />
                  <span>Real-time Detection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Volume2" size={16} className="text-secondary" />
                  <span>Audio Narration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Accessibility" size={16} className="text-accent" />
                  <span>Fully Accessible</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center justify-center space-x-4">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant="outline"
                  onClick={() => navigate(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="focus-ring-adaptive"
                >
                  {item?.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Player Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Video Player */}
              <div className="lg:col-span-3">
                <VideoPlayer
                  currentScenario={currentScenario}
                  onTimeUpdate={handleTimeUpdate}
                  onDurationChange={handleDurationChange}
                />
                
                {/* Demo Info */}
                <div className="mt-6 p-6 bg-card border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        Current Demo: {currentScenario?.split('-')?.map(word => 
                          word?.charAt(0)?.toUpperCase() + word?.slice(1)
                        )?.join(' ')}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        This demonstration showcases how VISIONX smart glasses use advanced AI to identify and describe objects, text, and people in real-time, providing audio feedback to assist visually impaired users in navigating their environment.
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)?.toString()?.padStart(2, '0')} / {Math.floor(duration / 60)}:{Math.floor(duration % 60)?.toString()?.padStart(2, '0')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="BarChart3" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Share"
                      iconSize={16}
                      aria-label="Share demo"
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Scenario Selector */}
                <ScenarioSelector
                  currentScenario={currentScenario}
                  onScenarioChange={handleScenarioChange}
                  progress={progress}
                />

                {/* Detection Panel */}
                <DetectionPanel
                  currentTime={currentTime}
                  scenario={currentScenario}
                />

                {/* Accessibility Controls */}
                <AccessibilityControls
                  onSettingsChange={handleAccessibilityChange}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/20 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Demo Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our demo experience includes comprehensive accessibility features and realistic AI vision simulations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: 'Eye',
                  title: 'Real-time Detection',
                  description: 'Experience how AI identifies objects, text, and people with confidence levels and positioning data'
                },
                {
                  icon: 'Volume2',
                  title: 'Audio Narration',
                  description: 'Comprehensive audio descriptions provide context and details about detected elements'
                },
                {
                  icon: 'Accessibility',
                  title: 'Full Accessibility',
                  description: 'Complete keyboard navigation, screen reader support, and customizable accessibility options'
                },
                {
                  icon: 'Settings',
                  title: 'Customizable Experience',
                  description: 'Adjust playback speed, captions, contrast, and other settings to match your preferences'
                },
                {
                  icon: 'Bookmark',
                  title: 'Progress Tracking',
                  description: 'Bookmark important moments and track your progress through different scenarios'
                },
                {
                  icon: 'Share',
                  title: 'Shareable Demos',
                  description: 'Share specific demo moments with others to showcase VISIONX capabilities'
                }
              ]?.map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 mb-4">
                    <Icon name={feature?.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Icon name="Eye" size={16} className="text-primary-foreground" />
              </div>
              <div>
                <div className="font-heading font-bold text-foreground">VISIONX</div>
                <div className="text-xs text-muted-foreground">Empowering the Blind with Intelligent Vision</div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} VISIONX. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemoExperiencePlayer;