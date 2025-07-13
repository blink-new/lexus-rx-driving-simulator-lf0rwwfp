import React, { forwardRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface LexusCarProps {
  // Add any props you need
}

const LexusCar = forwardRef<THREE.Mesh, LexusCarProps>((props, ref) => {
  // Create a simple car geometry since we don't have the actual Lexus model
  return (
    <group ref={ref} {...props}>
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 1.2, -0.5]} castShadow>
        <boxGeometry args={[1.8, 0.8, 2.5]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Front Grille */}
      <mesh position={[0, 0.3, 2.1]} castShadow>
        <boxGeometry args={[1.5, 0.6, 0.1]} />
        <meshStandardMaterial color="#0066cc" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Wheels */}
      <group>
        {/* Front Left Wheel */}
        <mesh position={[-1.2, -0.3, 1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        
        {/* Front Right Wheel */}
        <mesh position={[1.2, -0.3, 1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        
        {/* Rear Left Wheel */}
        <mesh position={[-1.2, -0.3, -1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        
        {/* Rear Right Wheel */}
        <mesh position={[1.2, -0.3, -1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
      
      {/* Headlights */}
      <mesh position={[-0.6, 0.3, 2.05]} castShadow>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.6, 0.3, 2.05]} castShadow>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Taillights */}
      <mesh position={[-0.6, 0.3, -2.05]} castShadow>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.6, 0.3, -2.05]} castShadow>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
})

LexusCar.displayName = 'LexusCar'

export default LexusCar