import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import DrivingSimulator from './components/DrivingSimulator'
import LoadingScreen from './components/LoadingScreen'
import HUD from './components/HUD'
import './App.css'

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden">
      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          Lexus RX 3D Driving Simulator
        </h1>
      </div>

      {/* Controls Instructions */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
        <h3 className="font-semibold mb-2">Controls:</h3>
        <div className="text-sm space-y-1">
          <div>W - Forward</div>
          <div>S - Backward</div>
          <div>A - Turn Left</div>
          <div>D - Turn Right</div>
          <div className="border-t border-gray-500 pt-2 mt-2">
            <div>T - Select Track</div>
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="absolute top-4 right-4 z-10 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
        <h3 className="font-semibold mb-2">🏁 Racing Circuits</h3>
        <div className="text-sm space-y-1">
          <div>🇲🇨 Monaco GP Circuit</div>
          <div>🇬🇧 Silverstone Circuit</div>
          <div>🇩🇪 Nürburgring Nordschleife</div>
          <div className="border-t border-gray-500 pt-2 mt-2 text-xs text-gray-300">
            Press T to change tracks
          </div>
        </div>
      </div>

      {/* HUD */}
      <HUD />

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        shadows
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingScreen />}>
          <Physics gravity={[0, -30, 0]}>
            <DrivingSimulator />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App