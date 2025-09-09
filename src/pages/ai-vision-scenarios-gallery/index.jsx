import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import FilterControls from './components/FilterControls';
import ScenarioGrid from './components/ScenarioGrid';
import ScenarioModal from './components/ScenarioModal';
import ScrollingGlasses3D from './components/ScrollingGlasses3D';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIVisionScenariosGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSort, setSelectedSort] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock scenarios data
  const allScenarios = [
    {
      id: 1,
      title: "Medicine Reading & Identification",
      category: "Healthcare",
      difficulty: "Easy",
      duration: "2-3 min",
      rating: 4.8,
      usage: "15,000+",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Learn how VISIONX smart glasses help visually impaired users safely identify medications, read prescription labels, and understand dosage instructions through advanced OCR and AI-powered text recognition.",
      features: [
        "OCR text recognition",
        "Medicine identification",
        "Dosage reading",
        "Safety warnings",
        "Audio instructions"
      ],
      benefits: [
        "Medication safety",
        "Independent healthcare management",
        "Reduced medication errors"
      ],
      audioDescription: "This scenario demonstrates how the smart glasses scan and read medicine labels, providing clear audio feedback about medication names, dosages, and important safety information.",
      steps: [
        {
          title: "Position glasses towards medicine bottle",
          description: "The AI camera automatically detects and focuses on the medication label for optimal reading."
        },
        {
          title: "OCR processing and text extraction",
          description: "Advanced optical character recognition processes the label text and identifies key information."
        },
        {
          title: "Audio feedback delivery",
          description: "Clear audio narration provides medication name, dosage, and important safety warnings."
        }
      ]
    },
    {
      id: 2,
      title: "Grocery Shopping Assistant",
      category: "Shopping",
      difficulty: "Medium",
      duration: "5-7 min",
      rating: 4.7,
      usage: "22,000+",
      image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Experience how VISIONX transforms grocery shopping by identifying products, reading prices, checking expiration dates, and providing nutritional information through computer vision and barcode scanning.",
      features: [
        "Product identification",
        "Price reading",
        "Barcode scanning",
        "Expiration date check",
        "Nutritional info"
      ],
      benefits: [
        "Independent shopping",
        "Better product choices",
        "Time efficiency"
      ],
      audioDescription: "This demonstration shows how users can navigate grocery stores independently, with the glasses providing real-time information about products, prices, and nutritional details.",
      steps: [
        {
          title: "Product scanning and identification",
          description: "The glasses identify products through visual recognition and barcode scanning."
        },
        {
          title: "Price and information extraction",
          description: "AI processes price tags and product labels to extract relevant information."
        },
        {
          title: "Audio guidance and feedback",
          description: "Users receive clear audio descriptions of products, prices, and recommendations."
        }
      ]
    },
    {
      id: 3,
      title: "Face Recognition & Social Interaction",
      category: "Social",
      difficulty: "Hard",
      duration: "4-6 min",
      rating: 4.9,
      usage: "18,500+",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Discover how VISIONX enables meaningful social connections by recognizing familiar faces, providing contextual information about people, and facilitating natural conversations in social settings.",
      features: [
        "Facial recognition",
        "Person identification",
        "Social context",
        "Conversation aids",
        "Privacy protection"
      ],
      benefits: [
        "Enhanced social interaction",
        "Improved relationships",
        "Increased confidence"
      ],
      audioDescription: "This scenario demonstrates the face recognition capabilities that help users identify friends, family, and colleagues in various social situations.",
      steps: [
        {
          title: "Face detection and analysis",
          description: "The system detects faces in the user\'s field of view and analyzes facial features."
        },
        {
          title: "Identity matching and verification",
          description: "AI matches detected faces with stored profiles while maintaining privacy."
        },
        {
          title: "Contextual information delivery",
          description: "Users receive discreet audio information about identified individuals."
        }
      ]
    },
    {
      id: 4,
      title: "Safe Road Crossing Navigation",
      category: "Safety",
      difficulty: "Hard",
      duration: "3-5 min",
      rating: 4.6,
      usage: "25,000+",
      image: "https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Learn how VISIONX enhances pedestrian safety by detecting traffic signals, identifying vehicles, monitoring crosswalk status, and providing real-time navigation guidance for safe street crossing.",
      features: [
        "Traffic light detection",
        "Vehicle identification",
        "Crosswalk recognition",
        "Audio navigation",
        "Hazard alerts"
      ],
      benefits: [
        "Enhanced safety",
        "Independent mobility",
        "Reduced accidents"
      ],
      audioDescription: "This demonstration shows how the glasses provide crucial safety information for crossing streets, including traffic light status and vehicle detection.",
      steps: [
        {
          title: "Traffic environment analysis",
          description: "The system analyzes the traffic environment, detecting lights, vehicles, and pedestrian signals."
        },
        {
          title: "Safety assessment and timing",
          description: "AI evaluates the safety of crossing based on traffic patterns and signal status."
        },
        {
          title: "Navigation guidance delivery",
          description: "Users receive clear audio instructions for safe crossing with timing information."
        }
      ]
    },
    {
      id: 5,
      title: "Public Transport Navigation",
      category: "Transportation",
      difficulty: "Medium",
      duration: "6-8 min",
      rating: 4.5,
      usage: "19,200+",
      image: "https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Explore how VISIONX simplifies public transportation by reading bus numbers, identifying stops, providing schedule information, and guiding users through transit systems with confidence.",
      features: [
        "Bus number recognition",
        "Stop identification",
        "Schedule reading",
        "Route guidance",
        "Platform navigation"
      ],
      benefits: [
        "Independent travel",
        "Reduced anxiety",
        "Better mobility"
      ],
      audioDescription: "This scenario demonstrates how users can navigate public transportation systems independently with real-time information about buses, trains, and stops.",
      steps: [
        {
          title: "Transport identification",
          description: "The glasses identify approaching buses, trains, and their route numbers."
        },
        {
          title: "Schedule and route processing",
          description: "AI processes schedule information and provides route guidance."
        },
        {
          title: "Navigation assistance",
          description: "Users receive step-by-step audio guidance for boarding and navigation."
        }
      ]
    },
    {
      id: 6,
      title: "Educational Text Reading",
      category: "Education",
      difficulty: "Easy",
      duration: "3-4 min",
      rating: 4.7,
      usage: "12,800+",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Discover how VISIONX transforms learning by reading books, documents, and educational materials aloud with natural speech synthesis and intelligent text processing.",
      features: [
        "Text recognition",
        "Document scanning",
        "Natural speech",
        "Reading speed control",
        "Bookmark features"
      ],
      benefits: [
        "Access to education",
        "Independent learning",
        "Improved literacy"
      ],
      audioDescription: "This demonstration shows how students and learners can access written educational content through advanced text-to-speech technology.",
      steps: [
        {
          title: "Document detection and alignment",
          description: "The system detects and properly aligns with text documents for optimal reading."
        },
        {
          title: "Text extraction and processing",
          description: "Advanced OCR extracts text while maintaining formatting and structure."
        },
        {
          title: "Natural speech synthesis",
          description: "High-quality text-to-speech converts written content to natural audio."
        }
      ]
    },
    {
      id: 7,
      title: "Kitchen Cooking Assistant",
      category: "Healthcare",
      difficulty: "Medium",
      duration: "7-10 min",
      rating: 4.8,
      usage: "16,500+",
      image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Learn how VISIONX makes cooking safer and more enjoyable by identifying ingredients, reading recipes, monitoring cooking progress, and providing step-by-step culinary guidance.",
      features: [
        "Ingredient identification",
        "Recipe reading",
        "Timer management",
        "Safety monitoring",
        "Cooking guidance"
      ],
      benefits: [
        "Culinary independence",
        "Kitchen safety",
        "Nutritious meals"
      ],
      audioDescription: "This scenario demonstrates how users can cook independently with AI assistance for ingredient identification and recipe guidance.",
      steps: [
        {
          title: "Ingredient and utensil recognition",
          description: "The glasses identify cooking ingredients and kitchen utensils for recipe preparation."
        },
        {
          title: "Recipe processing and guidance",
          description: "AI provides step-by-step cooking instructions with timing and technique tips."
        },
        {
          title: "Safety monitoring and alerts",
          description: "The system monitors cooking progress and provides safety alerts when needed."
        }
      ]
    },
    {
      id: 8,
      title: "Currency & Money Recognition",
      category: "Shopping",
      difficulty: "Easy",
      duration: "2-3 min",
      rating: 4.6,
      usage: "21,000+",
      image: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Experience how VISIONX helps users identify different currency denominations, count money accurately, and handle financial transactions with confidence and security.",
      features: [
        "Currency recognition",
        "Denomination identification",
        "Money counting",
        "Transaction assistance",
        "Security features"
      ],
      benefits: [
        "Financial independence",
        "Transaction confidence",
        "Fraud prevention"
      ],
      audioDescription: "This demonstration shows how users can handle money and financial transactions independently with accurate currency recognition.",
      steps: [
        {
          title: "Currency detection and analysis",
          description: "The system detects and analyzes different currency denominations and security features."
        },
        {
          title: "Value calculation and counting",
          description: "AI calculates total values and provides accurate counting assistance."
        },
        {
          title: "Transaction guidance",
          description: "Users receive audio feedback for making payments and receiving change."
        }
      ]
    },
    {
      id: 9,
      title: "Indoor Navigation & Wayfinding",
      category: "Navigation",
      difficulty: "Hard",
      duration: "5-7 min",
      rating: 4.4,
      usage: "14,300+",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Discover how VISIONX provides indoor navigation assistance by identifying landmarks, reading signs, detecting obstacles, and guiding users through complex indoor environments.",
      features: [
        "Indoor mapping",
        "Landmark recognition",
        "Obstacle detection",
        "Sign reading",
        "Audio directions"
      ],
      benefits: [
        "Independent navigation",
        "Reduced disorientation",
        "Increased mobility"
      ],
      audioDescription: "This scenario demonstrates indoor navigation capabilities that help users move confidently through buildings and complex indoor spaces.",
      steps: [
        {
          title: "Environment mapping and analysis",
          description: "The system creates a spatial map of the indoor environment and identifies key landmarks."
        },
        {
          title: "Path planning and obstacle detection",
          description: "AI plans optimal routes while detecting and avoiding obstacles in real-time."
        },
        {
          title: "Turn-by-turn navigation guidance",
          description: "Users receive detailed audio directions with landmark references for navigation."
        }
      ]
    },
    {
      id: 10,
      title: "Emergency Situation Response",
      category: "Safety",
      difficulty: "Hard",
      duration: "4-6 min",
      rating: 4.9,
      usage: "8,900+",
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Learn how VISIONX provides critical assistance during emergencies by detecting hazards, identifying emergency exits, reading safety signs, and connecting users with emergency services.",
      features: [
        "Hazard detection",
        "Emergency exit identification",
        "Safety sign reading",
        "Emergency contacts",
        "Location sharing"
      ],
      benefits: [
        "Enhanced safety",
        "Emergency preparedness",
        "Peace of mind"
      ],
      audioDescription: "This demonstration shows how the glasses provide crucial assistance during emergency situations with hazard detection and emergency response features.",
      steps: [
        {
          title: "Emergency detection and assessment",
          description: "The system detects potential emergency situations and assesses the level of danger."
        },
        {
          title: "Safety route identification",
          description: "AI identifies the safest evacuation routes and emergency exits."
        },
        {
          title: "Emergency response coordination",
          description: "The system provides emergency guidance and can contact emergency services if needed."
        }
      ]
    }
  ];

  // Filter and sort scenarios
  const filteredAndSortedScenarios = useMemo(() => {
    let filtered = allScenarios?.filter(scenario => {
      const matchesCategory = selectedCategory === 'all' || scenario?.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || scenario?.difficulty === selectedDifficulty;
      const matchesSearch = searchQuery === '' || 
        scenario?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        scenario?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        scenario?.features?.some(feature => feature?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      
      return matchesCategory && matchesDifficulty && matchesSearch;
    });

    // Sort scenarios
    filtered?.sort((a, b) => {
      switch (selectedSort) {
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'rating':
          return b?.rating - a?.rating;
        case 'usage':
          return parseInt(b?.usage?.replace(/[^\d]/g, '')) - parseInt(a?.usage?.replace(/[^\d]/g, ''));
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty];
        case 'category':
          return a?.category?.localeCompare(b?.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, selectedDifficulty, selectedSort, searchQuery]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleScenarioClick = (scenario) => {
    setSelectedScenario(scenario);
    setIsModalOpen(true);
  };

  const handlePlayDemo = (scenario) => {
    console.log('Playing demo for:', scenario?.title);
    // Demo functionality would be implemented here
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* 3D Glasses Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ScrollingGlasses3D className="w-full h-full" />
      </div>
      
      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section with enhanced background */}
          <div className="text-center mb-12 relative">
            {/* Glass morphism background for hero */}
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm rounded-3xl -mx-8 -my-8" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/20 backdrop-blur-sm text-primary rounded-full text-sm font-medium mb-6 border border-primary/20">
                <Icon name="Eye" size={16} />
                <span>AI Vision Scenarios</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Explore Real-Life
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  AI Vision Scenarios
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover how VISIONX smart glasses empower visually impaired individuals through 
                ten practical scenarios demonstrating AI-powered assistance in daily activities.
              </p>

              {/* Quick Stats with glass morphism */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
                <div className="text-center p-4 bg-card/30 backdrop-blur-md rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">10</div>
                  <div className="text-sm text-muted-foreground">Scenarios</div>
                </div>
                <div className="text-center p-4 bg-card/30 backdrop-blur-md rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-success mb-1">150K+</div>
                  <div className="text-sm text-muted-foreground">Users Helped</div>
                </div>
                <div className="text-center p-4 bg-card/30 backdrop-blur-md rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-secondary mb-1">4.7</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleNavigation('/interactive-product-showcase')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  iconSize={20}
                  className="backdrop-blur-sm bg-background/50 border-border/50"
                >
                  Product Showcase
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handleNavigation('/demo-experience-player')}
                  iconName="Play"
                  iconPosition="left"
                  iconSize={20}
                >
                  Try Full Experience
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Controls with glass morphism */}
          <div className="mb-8 bg-background/60 backdrop-blur-md rounded-2xl border border-border/50 p-6">
            <FilterControls
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
              selectedSort={selectedSort}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
              onDifficultyChange={setSelectedDifficulty}
              onSortChange={setSelectedSort}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
              scenarioCount={filteredAndSortedScenarios?.length}
              totalCount={allScenarios?.length}
            />
          </div>

          {/* Scenarios Grid with enhanced background */}
          <div className="bg-background/40 backdrop-blur-sm rounded-2xl border border-border/30 p-6">
            <ScenarioGrid
              scenarios={filteredAndSortedScenarios}
              onScenarioClick={handleScenarioClick}
              onPlayDemo={handlePlayDemo}
              isLoading={isLoading}
            />
          </div>

          {/* Call to Action with glass morphism */}
          {!isLoading && filteredAndSortedScenarios?.length > 0 && (
            <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md rounded-2xl border border-primary/30">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Experience VISIONX?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Try our interactive demo player to experience these scenarios firsthand 
                and see how VISIONX can transform daily life for visually impaired individuals.
              </p>
              <Button
                variant="default"
                size="lg"
                onClick={() => handleNavigation('/demo-experience-player')}
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={20}
                className="bg-primary hover:bg-primary/90"
              >
                Launch Demo Experience
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Scenario Modal */}
      <ScenarioModal
        scenario={selectedScenario}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlayDemo={handlePlayDemo}
      />
      {/* Accessibility Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isLoading ? 'Loading scenarios...' : `Showing ${filteredAndSortedScenarios?.length} scenarios`}
      </div>
    </div>
  );
};

export default AIVisionScenariosGallery;