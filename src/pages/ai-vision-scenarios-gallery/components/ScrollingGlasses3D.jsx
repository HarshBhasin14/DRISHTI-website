import React, { useRef, useEffect, useState } from 'react';
        import { Canvas, useFrame } from '@react-three/fiber';
        import { Environment } from '@react-three/drei';
        import { motion, useScroll, useTransform } from 'framer-motion';
        import * as THREE from 'three';

        // Individual Glasses Model Component
        const GlassesModel = ({ position, rotation, scale, color = "#1a1a2e", scrollProgress }) => {
          const meshRef = useRef();
          const [time, setTime] = useState(0);

          useFrame((state, delta) => {
            setTime(time + delta);
            if (meshRef?.current) {
              // Gentle floating animation
              meshRef.current.position.y = position?.[1] + Math.sin(time * 0.5 + position?.[0]) * 0.1;
              meshRef.current.rotation.y = rotation?.[1] + Math.sin(time * 0.3) * 0.1;
              meshRef.current.rotation.z = rotation?.[2] + Math.cos(time * 0.4) * 0.05;
              
              // Scroll-based movement
              const scrollOffset = scrollProgress * 8; // Multiply for more dramatic movement
              meshRef.current.position.y += scrollOffset;
            }
          });

          return (
            <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
              {/* Main Glasses Frame */}
              <mesh>
                <boxGeometry args={[2.4, 0.6, 0.15]} />
                <meshStandardMaterial 
                  color={color} 
                  metalness={0.8} 
                  roughness={0.2}
                  emissive={color}
                  emissiveIntensity={0.1}
                />
              </mesh>
              
              {/* Left Lens */}
              <mesh position={[-0.6, 0, 0.08]}>
                <cylinderGeometry args={[0.3, 0.3, 0.04, 32]} />
                <meshStandardMaterial 
                  color="#000033" 
                  transparent 
                  opacity={0.3}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
              
              {/* Right Lens */}
              <mesh position={[0.6, 0, 0.08]}>
                <cylinderGeometry args={[0.3, 0.3, 0.04, 32]} />
                <meshStandardMaterial 
                  color="#000033" 
                  transparent 
                  opacity={0.3}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
              
              {/* Bridge */}
              <mesh position={[0, 0, 0.08]}>
                <boxGeometry args={[0.24, 0.08, 0.08]} />
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
              </mesh>
              
              {/* Left Temple */}
              <mesh position={[-0.96, 0, -0.4]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.64, 0.08, 0.08]} />
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
              </mesh>
              
              {/* Right Temple */}
              <mesh position={[0.96, 0, -0.4]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.64, 0.08, 0.08]} />
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
              </mesh>
              
              {/* Camera Module */}
              <mesh position={[0.6, 0.15, 0.4]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial 
                  color="#0066ff" 
                  emissive="#0066ff"
                  emissiveIntensity={0.4}
                />
              </mesh>
              
              {/* Glowing accent ring */}
              <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.8, 0.85, 32]} />
                <meshStandardMaterial 
                  color="#00ccff"
                  transparent
                  opacity={0.3}
                  emissive="#00ccff"
                  emissiveIntensity={0.2}
                  side={THREE?.DoubleSide}
                />
              </mesh>
            </group>
          );
        };

        // Multiple Glasses in 3D Space
        const GlassesScene = ({ scrollProgress }) => {
          const glassesData = [
            { 
              position: [0, 0, 0], 
              rotation: [0, 0, 0], 
              scale: [1, 1, 1], 
              color: "#1a1a2e" 
            },
            { 
              position: [-4, 2, -2], 
              rotation: [0.1, 0.3, 0], 
              scale: [0.8, 0.8, 0.8], 
              color: "#2a2a3e" 
            },
            { 
              position: [4, -1, -1], 
              rotation: [-0.1, -0.2, 0.1], 
              scale: [0.9, 0.9, 0.9], 
              color: "#0f3f5f" 
            },
            { 
              position: [-2, -3, 1], 
              rotation: [0.2, 0.5, -0.1], 
              scale: [0.7, 0.7, 0.7], 
              color: "#1f4f6f" 
            },
            { 
              position: [3, 3, -3], 
              rotation: [-0.2, -0.4, 0.2], 
              scale: [0.6, 0.6, 0.6], 
              color: "#2f5f8f" 
            },
            { 
              position: [0, -2, 2], 
              rotation: [0.3, 0, -0.1], 
              scale: [0.85, 0.85, 0.85], 
              color: "#1a3a5a" 
            }
          ];

          return (
            <>
              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0066ff" />
              <spotLight 
                position={[0, 15, 0]} 
                angle={0.4} 
                penumbra={1} 
                intensity={0.8}
                color="#00ccff"
              />

              {/* Environment */}
              <Environment preset="studio" />

              {/* Multiple Glasses Models */}
              {glassesData?.map((glasses, index) => (
                <GlassesModel
                  key={index}
                  position={glasses?.position}
                  rotation={glasses?.rotation}
                  scale={glasses?.scale}
                  color={glasses?.color}
                  scrollProgress={scrollProgress}
                />
              ))}

              {/* Particle-like effects */}
              {Array?.from({ length: 20 })?.map((_, i) => (
                <mesh
                  key={`particle-${i}`}
                  position={[
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10 + scrollProgress * 5,
                    (Math.random() - 0.5) * 10
                  ]}
                >
                  <sphereGeometry args={[0.02, 8, 8]} />
                  <meshStandardMaterial 
                    color="#00ccff"
                    emissive="#00ccff"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              ))}
            </>
          );
        };

        const ScrollingGlasses3D = ({ className = "" }) => {
          const containerRef = useRef(null);
          const { scrollYProgress } = useScroll({
            target: containerRef,
            offset: ["start end", "end start"]
          });

          // Transform scroll progress to movement values
          const scrollProgress = useTransform(scrollYProgress, [0, 1], [-2, 2]);
          const [scrollValue, setScrollValue] = useState(0);

          useEffect(() => {
            const unsubscribe = scrollProgress?.onChange(setScrollValue);
            return () => unsubscribe();
          }, [scrollProgress]);

          return (
            <motion.div 
              ref={containerRef}
              className={`relative ${className}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                className="w-full h-full"
                gl={{ 
                  antialias: true, 
                  alpha: true,
                  powerPreference: "high-performance"
                }}
              >
                <GlassesScene scrollProgress={scrollValue} />
              </Canvas>
              {/* Overlay gradients for depth effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>
              {/* Scroll indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="flex flex-col items-center text-muted-foreground"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="text-sm mb-2 text-center">
                    Scroll to see glasses movement
                  </div>
                  <motion.div
                    className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
                    animate={{ 
                      borderColor: ["rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0.8)", "rgba(59, 130, 246, 0.3)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-1 h-3 bg-primary/60 rounded-full mt-2"
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          );
        };

        export default ScrollingGlasses3D;