import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Settings, Eye, Volume2, Keyboard, Gamepad2 } from 'lucide-react'

interface AccessibilityControlsProps {
  isOpen: boolean
  onToggle: () => void
  settings: AccessibilitySettings
  onSettingsChange: (settings: AccessibilitySettings) => void
}

export interface AccessibilitySettings {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: number
  soundEnabled: boolean
  voiceAnnouncements: boolean
  alternativeControls: 'keyboard' | 'mouse' | 'gamepad'
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  focusIndicator: boolean
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  isOpen,
  onToggle,
  settings,
  onSettingsChange
}) => {
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white"
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <Settings className="w-5 h-5" />
        <span className="sr-only">Accessibility Settings</span>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Accessibility Settings
          </CardTitle>
          <Button
            onClick={onToggle}
            className="absolute top-4 right-4"
            variant="outline"
            size="sm"
            aria-label="Close accessibility settings"
          >
            ×
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Visual Settings
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                aria-describedby="high-contrast-desc"
              />
            </div>
            <p id="high-contrast-desc" className="text-sm text-gray-600">
              Increases contrast for better visibility
            </p>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion">Reduce Motion</Label>
              <Switch
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                aria-describedby="reduced-motion-desc"
              />
            </div>
            <p id="reduced-motion-desc" className="text-sm text-gray-600">
              Reduces animations and camera movements
            </p>

            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size: {settings.fontSize}%</Label>
              <Slider
                id="font-size"
                min={75}
                max={150}
                step={25}
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSetting('fontSize', value)}
                aria-describedby="font-size-desc"
              />
              <p id="font-size-desc" className="text-sm text-gray-600">
                Adjust text size for better readability
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colorblind-mode">Color Blind Support</Label>
              <Select
                value={settings.colorBlindMode}
                onValueChange={(value: AccessibilitySettings['colorBlindMode']) => 
                  updateSetting('colorBlindMode', value)
                }
              >
                <SelectTrigger id="colorblind-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="protanopia">Protanopia (Red-blind)</SelectItem>
                  <SelectItem value="deuteranopia">Deuteranopia (Green-blind)</SelectItem>
                  <SelectItem value="tritanopia">Tritanopia (Blue-blind)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="focus-indicator">Enhanced Focus Indicators</Label>
              <Switch
                id="focus-indicator"
                checked={settings.focusIndicator}
                onCheckedChange={(checked) => updateSetting('focusIndicator', checked)}
                aria-describedby="focus-indicator-desc"
              />
            </div>
            <p id="focus-indicator-desc" className="text-sm text-gray-600">
              Shows clear focus indicators for keyboard navigation
            </p>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Audio Settings
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-enabled">Sound Effects</Label>
              <Switch
                id="sound-enabled"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
                aria-describedby="sound-desc"
              />
            </div>
            <p id="sound-desc" className="text-sm text-gray-600">
              Enable engine sounds and audio feedback
            </p>

            <div className="flex items-center justify-between">
              <Label htmlFor="voice-announcements">Voice Announcements</Label>
              <Switch
                id="voice-announcements"
                checked={settings.voiceAnnouncements}
                onCheckedChange={(checked) => updateSetting('voiceAnnouncements', checked)}
                aria-describedby="voice-desc"
              />
            </div>
            <p id="voice-desc" className="text-sm text-gray-600">
              Announces speed, direction, and important events
            </p>
          </div>

          {/* Control Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Control Settings
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="control-method">Control Method</Label>
              <Select
                value={settings.alternativeControls}
                onValueChange={(value: AccessibilitySettings['alternativeControls']) => 
                  updateSetting('alternativeControls', value)
                }
              >
                <SelectTrigger id="control-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keyboard">
                    <div className="flex items-center gap-2">
                      <Keyboard className="w-4 h-4" />
                      Keyboard (WASD)
                    </div>
                  </SelectItem>
                  <SelectItem value="mouse">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 text-center">🖱️</span>
                      Mouse Click Controls
                    </div>
                  </SelectItem>
                  <SelectItem value="gamepad">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4" />
                      Gamepad Support
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  updateSetting('highContrast', true)
                  updateSetting('fontSize', 125)
                  updateSetting('focusIndicator', true)
                }}
                variant="outline"
                className="text-sm"
              >
                Low Vision Profile
              </Button>
              <Button
                onClick={() => {
                  updateSetting('voiceAnnouncements', true)
                  updateSetting('soundEnabled', true)
                  updateSetting('focusIndicator', true)
                }}
                variant="outline"
                className="text-sm"
              >
                Screen Reader Profile
              </Button>
              <Button
                onClick={() => {
                  updateSetting('reducedMotion', true)
                  updateSetting('alternativeControls', 'mouse')
                }}
                variant="outline"
                className="text-sm"
              >
                Motor Impairment Profile
              </Button>
              <Button
                onClick={() => {
                  updateSetting('colorBlindMode', 'deuteranopia')
                  updateSetting('highContrast', true)
                }}
                variant="outline"
                className="text-sm"
              >
                Color Blind Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccessibilityControls