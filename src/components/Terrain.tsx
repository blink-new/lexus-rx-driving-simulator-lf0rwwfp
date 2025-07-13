import React from 'react'
import { usePlane } from '@react-three/cannon'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'

const Terrain: React.FC = () => {
  // Create physics plane for the ground
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: { friction: 0.8, restitution: 0.1 }
  }))

  return (
    <group>
      {/* Main ground plane */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color="#4a7c59" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Additional terrain features */}
      {/* Road/Track */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 100]} />
        <meshStandardMaterial color="#333333" roughness={0.9} />
      </mesh>
      
      {/* Road markings */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 100]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Some decorative elements */}
      {Array.from({ length: 20 }, (_, i) => (
        <group key={i}>
          {/* Trees */}
          <mesh position={[15 + Math.random() * 20, 2, (i - 10) * 8]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 4]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[15 + Math.random() * 20, 5, (i - 10) * 8]} castShadow>
            <sphereGeometry args={[2]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
          
          {/* Trees on the other side */}
          <mesh position={[-15 - Math.random() * 20, 2, (i - 10) * 8]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 4]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[-15 - Math.random() * 20, 5, (i - 10) * 8]} castShadow>
            <sphereGeometry args={[2]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default Terrain