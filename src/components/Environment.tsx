import React from 'react'
import { Sky } from '@react-three/drei'

const Environment: React.FC = () => {
  return (
    <>
      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#87CEEB', 50, 200]} />
      
      {/* Additional lighting */}
      <hemisphereLight
        skyColor="#87CEEB"
        groundColor="#4a7c59"
        intensity={0.6}
      />
    </>
  )
}

export default Environment