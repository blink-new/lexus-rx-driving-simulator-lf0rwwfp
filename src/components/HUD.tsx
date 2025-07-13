import React, { useState, useEffect } from 'react'

const HUD: React.FC = () => {
  const [speed, setSpeed] = useState(0)
  const [fps, setFps] = useState(60)

  useEffect(() => {
    // Simulate speed changes based on key presses
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key === 'w') {
        setSpeed(prev => Math.min(prev + 10, 120))
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key === 'w') {
        setSpeed(prev => Math.max(prev - 5, 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // FPS counter simulation
    const fpsInterval = setInterval(() => {
      setFps(Math.floor(Math.random() * 10) + 55)
    }, 1000)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      clearInterval(fpsInterval)
    }
  }, [])

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
      <div className="text-sm space-y-2">
        <div className="flex justify-between items-center">
          <span>Speed:</span>
          <span className="font-mono text-lg">{speed} km/h</span>
        </div>
        <div className="flex justify-between items-center">
          <span>FPS:</span>
          <span className="font-mono">{fps}</span>
        </div>
      </div>
    </div>
  )
}

export default HUD