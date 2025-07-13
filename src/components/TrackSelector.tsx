import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface TrackSelectorProps {
  selectedTrack: string
  onTrackChange: (track: string) => void
  isVisible: boolean
  onClose: () => void
}

const TRACK_INFO = {
  monaco: {
    name: "Monaco Grand Prix Circuit",
    country: "Monaco",
    length: "3.337 km",
    corners: 19,
    description: "The most prestigious street circuit in Formula 1, featuring tight corners and elevation changes through Monte Carlo.",
    difficulty: "Expert",
    image: "🏎️"
  },
  silverstone: {
    name: "Silverstone Circuit",
    country: "United Kingdom", 
    length: "5.891 km",
    corners: 18,
    description: "The home of British motorsport, known for its high-speed corners and challenging layout.",
    difficulty: "Intermediate",
    image: "🇬🇧"
  },
  nurburgring: {
    name: "Nürburgring Nordschleife",
    country: "Germany",
    length: "20.832 km",
    corners: 154,
    description: "The legendary 'Green Hell' - the most challenging and longest circuit in motorsport.",
    difficulty: "Extreme",
    image: "🇩🇪"
  }
}

const TrackSelector: React.FC<TrackSelectorProps> = ({ 
  selectedTrack, 
  onTrackChange, 
  isVisible, 
  onClose 
}) => {
  if (!isVisible) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Intermediate': return 'text-yellow-500'
      case 'Expert': return 'text-orange-500'
      case 'Extreme': return 'text-red-500'
      default: return 'text-green-500'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Select Racing Circuit</h2>
              <p className="text-gray-600 mt-1">Choose from legendary real-world racing tracks</p>
            </div>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(TRACK_INFO).map(([key, track]) => (
            <Card 
              key={key}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTrack === key 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onTrackChange(key)}
            >
              <CardHeader className="text-center pb-3">
                <div className="text-4xl mb-2">{track.image}</div>
                <CardTitle className="text-lg">{track.name}</CardTitle>
                <CardDescription className="text-sm font-medium text-gray-600">
                  {track.country}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-100 rounded p-2 text-center">
                    <div className="font-semibold text-gray-900">{track.length}</div>
                    <div className="text-gray-600 text-xs">Length</div>
                  </div>
                  <div className="bg-gray-100 rounded p-2 text-center">
                    <div className="font-semibold text-gray-900">{track.corners}</div>
                    <div className="text-gray-600 text-xs">Corners</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(track.difficulty)}`}>
                    {track.difficulty}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 leading-relaxed">
                  {track.description}
                </p>
                
                {selectedTrack === key && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                      }}
                    >
                      Drive This Track
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">🏁 <strong>Pro Tip:</strong> Each track offers a unique driving experience</p>
            <div className="flex justify-center space-x-6 text-xs">
              <span className="text-green-500">● Beginner</span>
              <span className="text-yellow-500">● Intermediate</span>
              <span className="text-orange-500">● Expert</span>
              <span className="text-red-500">● Extreme</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackSelector