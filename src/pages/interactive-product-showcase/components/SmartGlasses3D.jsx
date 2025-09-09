import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Icon from '../../../components/AppIcon';

// Smart Glasses 3D Model Component
const GlassesModel = ({ onHotspotClick, selectedHotspot }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(null);

  useFrame((state) => {
    if (meshRef?.current) {
      meshRef.current.rotation.y = Math.sin(state?.clock?.elapsedTime * 0.3) * 0.1;
    }
  });

  // Hotspot positions on the glasses
  const hotspots = [
    {
      id: 'camera',
      position: [0.8, 0.2, 0.5],
      name: 'AI Camera Module',
      description: `Advanced computer vision camera with real-time object detection and scene analysis.\nCaptures high-resolution images for AI processing.\nProvides visual context for navigation and object recognition.`
    },
    {
      id: 'speaker-left',
      position: [-1.2, -0.3, 0.2],
      name: 'Bone Conduction Speaker',
      description: `Bone conduction technology delivers crystal-clear audio without blocking ambient sounds.\nAllows users to hear AI descriptions while staying aware of surroundings.\nComfortable for extended wear with no ear canal obstruction.`
    },
    {
      id: 'speaker-right',
      position: [1.2, -0.3, 0.2],
      name: 'Bone Conduction Speaker',
      description: `Stereo bone conduction speaker for immersive spatial audio experience.\nProvides directional audio cues for navigation assistance.\nWeather-resistant design for outdoor use.`
    },
    {
      id: 'microphone',
      position: [0, -0.5, 0.8],
      name: 'Voice Command Microphone',
      description: `High-sensitivity microphone with noise cancellation technology.\nEnables hands-free voice commands and queries.\nSupports natural language processing for intuitive interaction.`
    },
    {
      id: 'battery',
      position: [1.5, 0, -0.3],
      name: 'Battery Compartment',
      description: `Long-lasting lithium battery provides 12+ hours of continuous use.\nQuick-charge capability with USB-C connector.\nLightweight design maintains comfortable wearing experience.`
    }
  ];

  return (
    <group ref={meshRef}>
      {/* Main Glasses Frame - Make more visible */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.8, 0.2]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#0066ff"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Left Lens */}
      <mesh position={[-0.8, 0, 0.1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial 
          color="#000033" 
          transparent 
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Right Lens */}
      <mesh position={[0.8, 0, 0.1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial 
          color="#000033" 
          transparent 
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left Temple */}
      <mesh position={[-1.2, 0, -0.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Right Temple */}
      <mesh position={[1.2, 0, -0.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Camera Module */}
      <mesh position={[0.8, 0.2, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#0066ff" 
          emissive="#0066ff"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Enhanced visibility for hotspots */}
      {hotspots?.map((hotspot) => (
        <mesh
          key={hotspot?.id}
          position={hotspot?.position}
          onClick={(e) => {
            e?.stopPropagation();
            onHotspotClick(hotspot, e?.nativeEvent);
          }}
          onPointerOver={(e) => {
            e?.stopPropagation();
            setHovered(hotspot?.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e?.stopPropagation();
            setHovered(null);
            document.body.style.cursor = 'default';
          }}
          scale={hovered === hotspot?.id ? 1.3 : selectedHotspot?.id === hotspot?.id ? 1.2 : 1}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={selectedHotspot?.id === hotspot?.id ? "#00ffaa" : "#00ccff"}
            emissive={selectedHotspot?.id === hotspot?.id ? "#00ffaa" : "#00ccff"}
            emissiveIntensity={hovered === hotspot?.id ? 0.8 : 0.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      {/* Pulsing rings around hotspots */}
      {hotspots?.map((hotspot) => (
        <mesh
          key={`ring-${hotspot?.id}`}
          position={hotspot?.position}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.12, 0.15, 16]} />
          <meshStandardMaterial 
            color="#00ccff"
            transparent
            opacity={0.3}
            side={THREE?.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

// Camera Controls Component
const CameraController = ({ resetTrigger }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (resetTrigger && controlsRef?.current) {
      controlsRef?.current?.reset();
    }
  }, [resetTrigger]);

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl?.domElement]}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={3}
      maxDistance={10}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI - Math.PI / 6}
      autoRotate={false}
      autoRotateSpeed={0.5}
    />
  );
};

const SmartGlasses3D = ({ onHotspotClick, selectedHotspot, className = "" }) => {
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleReset = useCallback(() => {
    setResetTrigger(prev => prev + 1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event?.key) {
        case ' ':
          event?.preventDefault();
          handleReset();
          break;
        case 'ArrowUp': case'ArrowDown': case'ArrowLeft': case'ArrowRight': case'+': case'-':
          event?.preventDefault();
          // These will be handled by OrbitControls
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReset]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="w-full h-full"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl, scene, camera }) => {
          // Ensure proper rendering
          gl.toneMapping = THREE?.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE?.PCFSoftShadowMap;
          
          // Clear any potential issues
          gl.autoClear = true;
          scene.background = null; // Ensure transparency
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <CameraController resetTrigger={resetTrigger} />
        
        {/* Enhanced Lighting for better visibility */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.7} color="#0066ff" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1}
          color="#00ccff"
          castShadow
        />

        {/* Environment */}
        <Environment preset="studio" />

        {/* 3D Model */}
        <GlassesModel 
          onHotspotClick={onHotspotClick}
          selectedHotspot={selectedHotspot}
        />
      </Canvas>
      {/* Reset Button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleReset}
          className="bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-lg p-2 backdrop-blur-sm transition-all duration-200 focus-ring-adaptive"
          aria-label="Reset camera view"
        >
          <Icon name="RotateCcw" size={20} className="text-primary" />
        </button>
      </div>
      {/* Keyboard Instructions */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 max-w-xs">
        <h4 className="text-xs font-semibold text-foreground mb-2">
          Keyboard Controls
        </h4>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Arrow keys: Rotate view</div>
          <div>+/- keys: Zoom in/out</div>
          <div>Space: Reset camera</div>
          <div>Click hotspots to explore</div>
        </div>
      </div>
    </div>
  );
};

export default SmartGlasses3D;