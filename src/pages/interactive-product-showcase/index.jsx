import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AccessibilityPanel from './components/AccessibilityPanel';
import SmartGlasses3D from './components/SmartGlasses3D';
import HotspotTooltip from './components/HotspotTooltip';
import DemoLauncher from './components/DemoLauncher';
import TextToSpeechService, { useTextToSpeech } from './components/TextToSpeechService';
import ProductHero from './components/ProductHero';

const InteractiveProductShowcase = () => {
  // Theme and accessibility state
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(false);
  
  // 3D interaction state
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  
  // Text-to-speech hook
  const { speak, stop, isSupported } = useTextToSpeech();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('visionx-theme');
    const savedAudio = localStorage.getItem('visionx-audio') === 'true';
    const savedCaptions = localStorage.getItem('visionx-captions') === 'true';
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    setIsAudioEnabled(savedAudio);
    setIsCaptionsEnabled(savedCaptions);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement?.classList?.toggle('dark', isDarkMode);
    document.documentElement?.classList?.toggle('light', !isDarkMode);
    localStorage.setItem('visionx-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Save accessibility preferences
  useEffect(() => {
    localStorage.setItem('visionx-audio', isAudioEnabled?.toString());
  }, [isAudioEnabled]);

  useEffect(() => {
    localStorage.setItem('visionx-captions', isCaptionsEnabled?.toString());
  }, [isCaptionsEnabled]);

  // Model loading handler
  const handleModelLoad = useCallback(() => {
    setIsModelLoaded(true);
    if (isAudioEnabled) {
      speak("3D model loaded successfully. You can now explore the smart glasses features.");
    }
  }, [isAudioEnabled, speak]);

  // Simulate model loading (since Three.js doesn't have a direct loading event)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleModelLoad();
    }, 2000); // 2 second loading simulation

    return () => clearTimeout(timer);
  }, [handleModelLoad]);

  // Theme toggle handler
  const handleThemeToggle = useCallback(() => {
    setIsDarkMode(prev => !prev);
    if (isAudioEnabled) {
      speak(`Switched to ${!isDarkMode ? 'dark' : 'light'} mode`);
    }
  }, [isDarkMode, isAudioEnabled, speak]);

  // Audio toggle handler
  const handleAudioToggle = useCallback(() => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    
    if (newState) {
      speak("Audio narration enabled. You will now hear descriptions and guidance.");
    } else {
      stop();
    }
  }, [isAudioEnabled, speak, stop]);

  // Captions toggle handler
  const handleCaptionsToggle = useCallback(() => {
    setIsCaptionsEnabled(prev => {
      const newState = !prev;
      if (isAudioEnabled) {
        speak(`Captions ${newState ? 'enabled' : 'disabled'}`);
      }
      return newState;
    });
  }, [isAudioEnabled, speak]);

  // Hotspot click handler
  const handleHotspotClick = useCallback((hotspot, event) => {
    if (event) {
      setTooltipPosition({
        x: event?.clientX || window.innerWidth / 2,
        y: event?.clientY || window.innerHeight / 2
      });
    } else {
      setTooltipPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    }
    
    setSelectedHotspot(hotspot);
    
    if (isAudioEnabled) {
      speak(`Selected ${hotspot?.name}. ${hotspot?.description}`);
    }
  }, [isAudioEnabled, speak]);

  // Close tooltip handler
  const handleCloseTooltip = useCallback(() => {
    setSelectedHotspot(null);
    stop();
  }, [stop]);

  // Audio playback handler
  const handlePlayAudio = useCallback((text) => {
    if (isAudioEnabled && text) {
      speak(text, {
        rate: 0.9,
        pitch: 1,
        volume: 0.8
      });
    }
  }, [isAudioEnabled, speak]);

  // Demo launcher handler
  const handleLaunchDemo = useCallback(() => {
    if (isAudioEnabled) {
      speak("Redirecting to demo experience player. You will experience real-world scenarios with AI vision assistance.");
    }
    
    setTimeout(() => {
      window.location.href = '/demo-experience-player';
    }, 1000);
  }, [isAudioEnabled, speak]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event?.key) {
        case 'Escape':
          if (selectedHotspot) {
            handleCloseTooltip();
          }
          break;
        case 'h':
          if (event?.ctrlKey || event?.metaKey) {
            event?.preventDefault();
            if (isAudioEnabled) {
              speak("Keyboard shortcuts: H for help, Space to reset 3D view, Arrow keys to rotate model, Plus and minus to zoom, Escape to close dialogs, Tab to navigate interface elements.");
            }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedHotspot, handleCloseTooltip, isAudioEnabled, speak]);

  return (
    <TextToSpeechService isEnabled={isAudioEnabled}>
      {({ speak: ttsSpeak, stop: ttsStop }) => (
        <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : 'light'}`}>
          <Helmet>
            <title>VISIONX - Interactive Product Showcase | AI-Powered Smart Glasses</title>
            <meta 
              name="description" 
              content="Explore VISIONX smart glasses through immersive 3D visualization. Discover AI-powered capabilities that empower visually impaired individuals with intelligent vision assistance." 
            />
            <meta name="keywords" content="VISIONX, smart glasses, AI vision, assistive technology, accessibility, blind, visually impaired" />
            <meta property="og:title" content="VISIONX - Interactive Product Showcase" />
            <meta property="og:description" content="Revolutionary smart glasses with AI-powered vision assistance for the visually impaired" />
            <meta property="og:type" content="website" />
            <link rel="canonical" href="/interactive-product-showcase" />
          </Helmet>

          {/* Header */}
          <Header />

          {/* Accessibility Panel */}
          <AccessibilityPanel
            isDarkMode={isDarkMode}
            onThemeToggle={handleThemeToggle}
            isAudioEnabled={isAudioEnabled}
            onAudioToggle={handleAudioToggle}
            isCaptionsEnabled={isCaptionsEnabled}
            onCaptionsToggle={handleCaptionsToggle}
          />

          {/* Main Content */}
          <main className="pt-16">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-6 py-12">
              <div className="w-full max-w-7xl mx-auto">
                <ProductHero 
                  onPlayAudio={handlePlayAudio}
                  isAudioEnabled={isAudioEnabled}
                />
              </div>
            </section>

            {/* 3D Showcase Section */}
            <section 
              id="3d-showcase" 
              className="min-h-screen bg-gradient-to-b from-background to-card/20 px-6 py-12"
            >
              <div className="w-full max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Interactive 3D Experience
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore every detail of VISIONX smart glasses. Click on hotspots to learn about 
                    advanced features and AI-powered capabilities.
                  </p>
                </div>

                {/* 3D Model Container */}
                <div className="relative w-full h-[600px] md:h-[700px] bg-card/30 border border-border rounded-2xl overflow-hidden">
                  <SmartGlasses3D
                    onHotspotClick={handleHotspotClick}
                    selectedHotspot={selectedHotspot}
                    className="w-full h-full"
                  />

                  {/* Conditional Loading indicator for 3D model */}
                  {!isModelLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10">
                      <div className="text-center space-y-4">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-sm text-muted-foreground">Loading 3D Model...</p>
                        <p className="text-xs text-muted-foreground/70">
                          Initializing Three.js renderer and 3D scene
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Model loaded indicator */}
                  {isModelLoaded && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-green-500/20 border border-green-500/40 rounded-lg px-3 py-1 backdrop-blur-sm">
                        <div className="flex items-center space-x-2 text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs font-medium">3D Model Ready</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accessibility Instructions */}
                <div className="mt-6 bg-card/50 border border-border rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Accessibility Instructions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <strong>Mouse/Touch:</strong> Click and drag to rotate, scroll to zoom, right-click and drag to pan
                    </div>
                    <div>
                      <strong>Keyboard:</strong> Arrow keys to rotate, +/- to zoom, Space to reset view
                    </div>
                    <div>
                      <strong>Screen Readers:</strong> Hotspot descriptions are announced automatically
                    </div>
                    <div>
                      <strong>Audio:</strong> Enable narration in accessibility panel for guided experience
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Demo Section */}
            <section className="py-16 px-6 bg-gradient-to-b from-card/20 to-background">
              <div className="w-full max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Experience AI Vision in Action
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    See how VISIONX transforms daily experiences through real-time object detection, 
                    navigation assistance, and intelligent scene understanding.
                  </p>
                </div>

                <DemoLauncher
                  onLaunchDemo={handleLaunchDemo}
                  isAudioEnabled={isAudioEnabled}
                  onPlayAudio={handlePlayAudio}
                />
              </div>
            </section>
          </main>

          {/* Hotspot Tooltip */}
          {selectedHotspot && (
            <HotspotTooltip
              hotspot={selectedHotspot}
              onClose={handleCloseTooltip}
              onPlayAudio={handlePlayAudio}
              isAudioEnabled={isAudioEnabled}
              position={tooltipPosition}
            />
          )}

          {/* Captions Overlay */}
          {isCaptionsEnabled && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm max-w-md text-center z-40">
              {selectedHotspot ? selectedHotspot?.description : "Captions enabled - descriptions will appear here"}
            </div>
          )}

          {/* Skip Links for Accessibility */}
          <div className="sr-only">
            <a href="#3d-showcase" className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded">
              Skip to 3D showcase
            </a>
          </div>
        </div>
      )}
    </TextToSpeechService>
  );
};

export default InteractiveProductShowcase;