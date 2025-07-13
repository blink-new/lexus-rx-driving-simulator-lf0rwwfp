import { useEffect, useRef } from 'react'

interface VoiceAnnouncerProps {
  enabled: boolean
  speed: number
  direction: string
  isMoving: boolean
}

const VoiceAnnouncer: React.FC<VoiceAnnouncerProps> = ({
  enabled,
  speed,
  direction,
  isMoving
}) => {
  const lastAnnouncementRef = useRef<string>('')
  const announcementTimeoutRef = useRef<NodeJS.Timeout>()

  const announce = (text: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!enabled || !('speechSynthesis' in window)) return

    // Avoid duplicate announcements
    if (lastAnnouncementRef.current === text) return
    lastAnnouncementRef.current = text

    // Clear any pending announcements for immediate ones
    if (priority === 'assertive') {
      speechSynthesis.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.8
    utterance.volume = 0.7
    utterance.pitch = 1

    speechSynthesis.speak(utterance)
  }

  // Announce speed changes
  useEffect(() => {
    if (!enabled) return

    // Clear previous timeout
    if (announcementTimeoutRef.current) {
      clearTimeout(announcementTimeoutRef.current)
    }

    // Debounce speed announcements
    announcementTimeoutRef.current = setTimeout(() => {
      if (isMoving && speed > 0) {
        const speedText = Math.round(speed)
        if (speedText % 20 === 0 || speedText < 10) {
          announce(`Speed ${speedText} kilometers per hour`)
        }
      } else if (!isMoving && speed === 0) {
        announce('Vehicle stopped')
      }
    }, 500)

    return () => {
      if (announcementTimeoutRef.current) {
        clearTimeout(announcementTimeoutRef.current)
      }
    }
  }, [enabled, speed, isMoving])

  // Announce direction changes
  useEffect(() => {
    if (!enabled || !isMoving) return

    const directionMap: Record<string, string> = {
      forward: 'moving forward',
      backward: 'reversing',
      left: 'turning left',
      right: 'turning right'
    }

    if (direction in directionMap) {
      announce(directionMap[direction])
    }
  }, [enabled, direction, isMoving])

  // Initial announcement
  useEffect(() => {
    if (enabled) {
      announce('Lexus RX Driving Simulator loaded. Use W A S D keys to drive, or access alternative controls in settings.', 'assertive')
    }
  }, [enabled])

  return null
}

export default VoiceAnnouncer