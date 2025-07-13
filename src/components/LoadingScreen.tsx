import React from 'react'

const LoadingScreen: React.FC = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0066cc" />
    </mesh>
  )
}

export default LoadingScreen