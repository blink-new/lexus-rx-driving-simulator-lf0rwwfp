import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useBox, usePlane } from '@react-three/cannon'
import { Vector3 } from 'three'
import * as THREE from 'three'
import LexusCar from './LexusCar'
import Terrain from './Terrain'
import Environment from './Environment'

const DrivingSimulator: React.FC = () => {
  const { camera } = useThree()
  const [keys, setKeys] = useState({
    w: false,
    s: false,
    a: false,
    d: false
  })

  // Car physics body
  const [carRef, carApi] = useBox(() => ({
    mass: 1000,
    position: [0, 2, 0],
    args: [2, 1, 4],
    material: { friction: 0.3, restitution: 0.1 }
  }))

  const carPosition = useRef([0, 2, 0])
  const carRotation = useRef([0, 0, 0])
  const velocity = useRef([0, 0, 0])

  // Subscribe to car position and rotation
  useEffect(() => {
    const unsubscribePos = carApi.position.subscribe((pos) => {
      carPosition.current = pos
    })
    const unsubscribeRot = carApi.rotation.subscribe((rot) => {
      carRotation.current = rot
    })
    const unsubscribeVel = carApi.velocity.subscribe((vel) => {
      velocity.current = vel
    })

    return () => {
      unsubscribePos()
      unsubscribeRot()
      unsubscribeVel()
    }
  }, [carApi])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key in keys) {
        setKeys(prev => ({ ...prev, [key]: true }))
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key in keys) {
        setKeys(prev => ({ ...prev, [key]: false }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Car movement and camera follow
  useFrame(() => {
    const speed = 15
    const turnSpeed = 2

    // Get current rotation
    const currentRotation = carRotation.current[1]

    // Calculate movement direction based on car rotation
    const forward = new Vector3(
      Math.sin(currentRotation),
      0,
      Math.cos(currentRotation)
    )
    const right = new Vector3(
      Math.cos(currentRotation),
      0,
      -Math.sin(currentRotation)
    )

    let forceX = 0
    let forceZ = 0
    let torqueY = 0

    // Forward/Backward movement
    if (keys.w) {
      forceX += forward.x * speed
      forceZ += forward.z * speed
    }
    if (keys.s) {
      forceX -= forward.x * speed * 0.7
      forceZ -= forward.z * speed * 0.7
    }

    // Turning (only when moving)
    const isMoving = keys.w || keys.s
    if (isMoving) {
      if (keys.a) {
        torqueY += turnSpeed
      }
      if (keys.d) {
        torqueY -= turnSpeed
      }
    }

    // Apply forces
    carApi.applyForce([forceX, 0, forceZ], [0, 0, 0])
    carApi.applyTorque([0, torqueY, 0])

    // Apply drag to prevent infinite acceleration
    const dragFactor = 0.95
    carApi.velocity.set(
      velocity.current[0] * dragFactor,
      velocity.current[1],
      velocity.current[2] * dragFactor
    )

    // Camera follow car with smooth interpolation
    const targetCameraPosition = new Vector3(
      carPosition.current[0] - forward.x * 10,
      carPosition.current[1] + 5,
      carPosition.current[2] - forward.z * 10
    )

    camera.position.lerp(targetCameraPosition, 0.1)
    camera.lookAt(
      carPosition.current[0],
      carPosition.current[1] + 1,
      carPosition.current[2]
    )
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Environment */}
      <Environment />

      {/* Terrain */}
      <Terrain />

      {/* Lexus Car */}
      <LexusCar ref={carRef} />
    </>
  )
}

export default DrivingSimulator