import React from 'react'
import { useBox } from '@react-three/cannon'

interface TrackProps {
  trackName: string
}

// Simplified real-world track layouts
const TRACKS = {
  monaco: {
    name: "Monaco Grand Prix Circuit",
    trackPoints: [
      [0, 0], [10, 5], [20, 15], [25, 30], [20, 45], [10, 50], 
      [0, 45], [-10, 35], [-15, 20], [-10, 5], [0, 0]
    ]
  },
  silverstone: {
    name: "Silverstone Circuit", 
    trackPoints: [
      [0, 0], [15, 10], [30, 20], [40, 35], [35, 50], [20, 55],
      [5, 50], [-10, 40], [-15, 25], [-10, 10], [0, 0]
    ]
  },
  nurburgring: {
    name: "Nürburgring Nordschleife",
    trackPoints: [
      [0, 0], [20, 15], [35, 25], [45, 40], [40, 60], [25, 70],
      [5, 75], [-15, 65], [-25, 45], [-30, 25], [-20, 5], [0, 0]
    ]
  }
}

const Track: React.FC<TrackProps> = ({ trackName }) => {
  const track = TRACKS[trackName as keyof typeof TRACKS] || TRACKS.monaco

  // Generate track barriers
  const generateBarriers = () => {
    const barriers = []
    const trackWidth = 6
    
    for (let i = 0; i < track.trackPoints.length - 1; i++) {
      const current = track.trackPoints[i]
      const next = track.trackPoints[i + 1]
      
      const dx = next[0] - current[0]
      const dz = next[1] - current[1]
      const length = Math.sqrt(dx * dx + dz * dz)
      const angle = Math.atan2(dx, dz)
      
      // Center position
      const centerX = (current[0] + next[0]) / 2
      const centerZ = (current[1] + next[1]) / 2
      
      // Left barrier
      const leftX = centerX - Math.cos(angle) * (trackWidth / 2)
      const leftZ = centerZ + Math.sin(angle) * (trackWidth / 2)
      
      // Right barrier  
      const rightX = centerX + Math.cos(angle) * (trackWidth / 2)
      const rightZ = centerZ - Math.sin(angle) * (trackWidth / 2)
      
      barriers.push(
        <TrackBarrier
          key={`left-${i}`}
          position={[leftX, 0.5, leftZ]}
          rotation={[0, angle, 0]}
          length={length}
        />,
        <TrackBarrier
          key={`right-${i}`}
          position={[rightX, 0.5, rightZ]}
          rotation={[0, angle, 0]}
          length={length}
        />
      )
    }
    
    return barriers
  }

  // Generate track surface
  const generateTrackSurface = () => {
    const segments = []
    const trackWidth = 6
    
    for (let i = 0; i < track.trackPoints.length - 1; i++) {
      const current = track.trackPoints[i]
      const next = track.trackPoints[i + 1]
      
      const centerX = (current[0] + next[0]) / 2
      const centerZ = (current[1] + next[1]) / 2
      const dx = next[0] - current[0]
      const dz = next[1] - current[1]
      const length = Math.sqrt(dx * dx + dz * dz)
      const angle = Math.atan2(dx, dz)
      
      segments.push(
        <mesh
          key={`track-${i}`}
          position={[centerX, 0.02, centerZ]}
          rotation={[-Math.PI / 2, 0, angle]}
          receiveShadow
        >
          <planeGeometry args={[trackWidth, length]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      )
      
      // Center line
      segments.push(
        <mesh
          key={`centerline-${i}`}
          position={[centerX, 0.03, centerZ]}
          rotation={[-Math.PI / 2, 0, angle]}
        >
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )
    }
    
    return segments
  }

  return (
    <group>
      {/* Track surface */}
      {generateTrackSurface()}
      
      {/* Track barriers */}
      {generateBarriers()}
      
      {/* Start/Finish line */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Checkered pattern */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[-2.5 + i, 0.05, (i % 2 === 0) ? -0.5 : 0.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#000000" : "#ffffff"} />
        </mesh>
      ))}
      
      {/* Simple grandstands */}
      <mesh position={[10, 2, 0]} castShadow>
        <boxGeometry args={[15, 4, 3]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      
      <mesh position={[-10, 2, 0]} castShadow>
        <boxGeometry args={[15, 4, 3]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
    </group>
  )
}

// Simplified track barrier component
interface TrackBarrierProps {
  position: [number, number, number]
  rotation: [number, number, number]
  length: number
}

const TrackBarrier: React.FC<TrackBarrierProps> = ({ position, rotation, length }) => {
  const [ref] = useBox(() => ({
    position,
    rotation,
    args: [0.3, 0.8, length],
    type: 'Static',
    material: { friction: 0.1, restitution: 0.8 }
  }))

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.3, 0.8, length]} />
      <meshStandardMaterial color="#e74c3c" />
    </mesh>
  )
}

export default Track