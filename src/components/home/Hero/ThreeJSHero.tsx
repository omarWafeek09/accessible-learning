// src\components\home\Hero\ThreeJSHero.tsx
import { useRef, useMemo, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function WheelchairModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group>
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.4, 24, 24]} />
            <meshStandardMaterial color="#f5d0c5" roughness={0.8} />
          </mesh>
          
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.45, 24, 24]} />
            <meshStandardMaterial color="#58cc02" roughness={0.6} />
          </mesh>
          
          <mesh position={[0.35, 0.4, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.06, 0.06, 0.6, 12]} />
            <meshStandardMaterial color="#f5d0c5" roughness={0.8} />
          </mesh>
          
          <mesh position={[-0.35, 0.4, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.06, 0.06, 0.6, 12]} />
            <meshStandardMaterial color="#f5d0c5" roughness={0.8} />
          </mesh>

          <mesh position={[0, 0.7, 0.45]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#f5d0c5" roughness={0.8} />
          </mesh>
          
          <mesh position={[-0.12, 0.75, 0.4]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#3c3c3c" />
          </mesh>
          <mesh position={[0.08, 0.75, 0.4]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#3c3c3c" />
          </mesh>

          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[0.6, 0.3, 0.5]} />
            <meshStandardMaterial color="#ce82ff" roughness={0.5} />
          </mesh>

          <mesh position={[0.4, -0.7, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
            <meshStandardMaterial color="#333" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0.4, -0.5, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
            <meshStandardMaterial color="#666" roughness={0.4} />
          </mesh>

          <mesh position={[-0.4, -0.7, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
            <meshStandardMaterial color="#333" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[-0.4, -0.5, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
            <meshStandardMaterial color="#666" roughness={0.4} />
          </mesh>

          <mesh position={[0, -0.2, 0.35]} rotation={[0.3, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
            <meshStandardMaterial color="#666" roughness={0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function FloatingElements() {
  return (
    <>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[1.5, 1, -1]}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color="#58cc02" />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-1.5, 0.5, -1]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#ce82ff" />
        </mesh>
      </Float>
      
      <Float speed={4} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[1, -0.5, -0.5]}>
          <torusGeometry args={[0.15, 0.06, 6, 12]} />
          <meshStandardMaterial color="#ffc800" />
        </mesh>
      </Float>

      <Float speed={3.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh position={[-1.2, 1, 0]}>
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial color="#ff4b4b" />
        </mesh>
      </Float>
    </>
  );
}

function Particles() {
  const count = 30;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 2;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#58cc02" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#58cc02" wireframe />
    </mesh>
  );
}

export default function ThreeJSHero() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '400px',
          background: 'linear-gradient(135deg, #f7f7f7 0%, #fff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=400&fit=crop"
          alt="تعلم للأطفال ذوي الاحتياجات الخاصة"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '20px' }}
        />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas 
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        onError={() => setHasError(true)}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <spotLight 
          position={[3, 3, 3]} 
          angle={0.4} 
          penumbra={1} 
          intensity={0.8} 
        />
        <pointLight position={[-3, 2, 2]} intensity={0.4} color="#ce82ff" />
        
        <Suspense fallback={<LoadingFallback />}>
          <WheelchairModel />
          <FloatingElements />
          <Particles />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}