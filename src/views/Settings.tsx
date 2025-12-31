import React, { useState } from 'react';
import {
  SettingsContainer,
  SettingsDivider,
  SettingsField,
  SettingsInputFrame,
  SettingsLabel,
  SettingsSliderFrame,
} from '@telemetryos/sdk/react';
import {
  useLocationsStoreState,
  useLocationModeStoreState,
  useCycleDurationStoreState,
  useTransitionStyleStoreState,
  useForecastRangeStoreState,
  useBackgroundTypeStoreState,
  useBackgroundColorStoreState,
  useBackgroundImageStoreState,
  useBackgroundOpacityStoreState,
  useFontColorStoreState,
  useTemperatureUnitStoreState,
  useTimeFormatStoreState,
  useDateFormatStoreState,
  type LocationConfig,
} from '../hooks/store';

export function Settings() {
  const [isLoadingLocations, locations, setLocations] = useLocationsStoreState();
  const [isLoadingMode, locationMode, setLocationMode] = useLocationModeStoreState();
  const [isLoadingCycle, cycleDuration, setCycleDuration] = useCycleDurationStoreState();
  const [isLoadingTransition, transitionStyle, setTransitionStyle] = useTransitionStyleStoreState();
  const [isLoadingForecast, forecastRange, setForecastRange] = useForecastRangeStoreState();
  const [isLoadingBgType, backgroundType, setBackgroundType] = useBackgroundTypeStoreState();
  const [isLoadingBgColor, backgroundColor, setBackgroundColor] = useBackgroundColorStoreState();
  const [isLoadingBgImage, backgroundImage, setBackgroundImage] = useBackgroundImageStoreState();
  const [isLoadingBgOpacity, backgroundOpacity, setBackgroundOpacity] = useBackgroundOpacityStoreState();
  const [isLoadingFontColor, fontColor, setFontColor] = useFontColorStoreState();
  const [isLoadingUnit, temperatureUnit, setTemperatureUnit] = useTemperatureUnitStoreState();
  const [isLoadingTimeFormat, timeFormat, setTimeFormat] = useTimeFormatStoreState();
  const [isLoadingDateFormat, dateFormat, setDateFormat] = useDateFormatStoreState();

  const [newCityInput, setNewCityInput] = useState('');
  const [newDisplayNameInput, setNewDisplayNameInput] = useState('');

  const addLocation = () => {
    if (!newCityInput.trim()) return;
    
    const newLocation: LocationConfig = {
      id: Date.now().toString(),
      city: newCityInput.trim(),
      displayName: newDisplayNameInput.trim() || undefined,
      isAutoLocation: false,
    };
    
    setLocations([...locations, newLocation]);
    setNewCityInput('');
    setNewDisplayNameInput('');
  };

  const removeLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const updateLocation = (id: string, updates: Partial<LocationConfig>) => {
    setLocations(locations.map(loc => loc.id === id ? { ...loc, ...updates } : loc));
  };

  const enableAutoLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding would be done here, but for now we'll use coordinates
          const autoLocation: LocationConfig = {
            id: 'auto-location',
            city: `${latitude},${longitude}`,
            displayName: 'Current Location',
            isAutoLocation: true,
          };
          
          // Check if auto location already exists
          const existingAuto = locations.find(loc => loc.isAutoLocation);
          if (existingAuto) {
            updateLocation(existingAuto.id, autoLocation);
          } else {
            setLocations([...locations, autoLocation]);
          }
          setLocationMode('auto');
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get your location. Please check your browser permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <SettingsContainer>
      {/* Location Configuration */}
      <SettingsField>
        <SettingsLabel>Location Mode</SettingsLabel>
        <SettingsInputFrame>
          <select
            value={locationMode}
            onChange={(e) => setLocationMode(e.target.value as 'manual' | 'auto')}
            disabled={isLoadingMode}
          >
            <option value="manual">Manual Entry</option>
            <option value="auto">Automatic (Geolocation)</option>
          </select>
        </SettingsInputFrame>
      </SettingsField>

      {locationMode === 'auto' && (
        <SettingsField>
          <SettingsLabel>Enable Auto Location</SettingsLabel>
          <SettingsInputFrame>
            <button onClick={enableAutoLocation} type="button">
              Detect Current Location
            </button>
          </SettingsInputFrame>
        </SettingsField>
      )}

      {locationMode === 'manual' && (
        <>
          <SettingsField>
            <SettingsLabel>Add City</SettingsLabel>
            <SettingsInputFrame>
              <input
                type="text"
                placeholder="e.g., Vancouver, BC"
                value={newCityInput}
                onChange={(e) => setNewCityInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addLocation()}
              />
            </SettingsInputFrame>
          </SettingsField>

          <SettingsField>
            <SettingsLabel>Display Name (Optional)</SettingsLabel>
            <SettingsInputFrame>
              <input
                type="text"
                placeholder="Custom display name"
                value={newDisplayNameInput}
                onChange={(e) => setNewDisplayNameInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addLocation()}
              />
            </SettingsInputFrame>
          </SettingsField>

          <SettingsField>
            <SettingsLabel>Add Location</SettingsLabel>
            <SettingsInputFrame>
              <button onClick={addLocation} type="button">
                Add
              </button>
            </SettingsInputFrame>
          </SettingsField>
        </>
      )}

      <SettingsDivider />

      {/* Locations List */}
      {locations.length > 0 && (
        <>
          <SettingsField>
            <SettingsLabel>Configured Locations ({locations.length})</SettingsLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {locations.map((loc) => (
                <div key={loc.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                  <div style={{ flex: 1 }}>
                    <div><strong>{loc.displayName || loc.city}</strong></div>
                    {loc.displayName && <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>{loc.city}</div>}
                    {loc.isAutoLocation && <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Auto Location</div>}
                  </div>
                  <input
                    type="text"
                    placeholder="Display name"
                    value={loc.displayName || ''}
                    onChange={(e) => updateLocation(loc.id, { displayName: e.target.value || undefined })}
                    style={{ flex: 1, padding: '0.25rem' }}
                  />
                  <button onClick={() => removeLocation(loc.id)} type="button" style={{ padding: '0.25rem 0.5rem' }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </SettingsField>
          <SettingsDivider />
        </>
      )}

      {/* City Cycling Settings */}
      {locations.length > 1 && (
        <>
          <SettingsField>
            <SettingsLabel>Cycle Duration (seconds)</SettingsLabel>
            <SettingsSliderFrame>
              <input
                type="range"
                min={5}
                max={300}
                step={5}
                disabled={isLoadingCycle}
                value={cycleDuration}
                onChange={(e) => setCycleDuration(parseInt(e.target.value))}
              />
              <span>{cycleDuration}s</span>
            </SettingsSliderFrame>
          </SettingsField>

          <SettingsField>
            <SettingsLabel>Transition Style</SettingsLabel>
            <SettingsInputFrame>
              <select
                value={transitionStyle}
                onChange={(e) => setTransitionStyle(e.target.value as 'fade' | 'slide' | 'instant')}
                disabled={isLoadingTransition}
              >
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="instant">Instant</option>
              </select>
            </SettingsInputFrame>
          </SettingsField>
          <SettingsDivider />
        </>
      )}

      {/* Forecast Range */}
      <SettingsField>
        <SettingsLabel>Forecast Time Range</SettingsLabel>
        <SettingsInputFrame>
          <select
            value={forecastRange}
            onChange={(e) => setForecastRange(e.target.value as '24H' | '3D' | '1W')}
            disabled={isLoadingForecast}
          >
            <option value="24H">24-Hour View (Hourly)</option>
            <option value="3D">3-Day View (Daily)</option>
            <option value="1W">1-Week View (Weekly)</option>
          </select>
        </SettingsInputFrame>
      </SettingsField>

      <SettingsDivider />

      {/* Visual Customization */}
      <SettingsField>
        <SettingsLabel>Background Type</SettingsLabel>
        <SettingsInputFrame>
          <select
            value={backgroundType}
            onChange={(e) => setBackgroundType(e.target.value as 'solid' | 'weather' | 'image')}
            disabled={isLoadingBgType}
          >
            <option value="solid">Solid Color</option>
            <option value="weather">Match Weather Conditions</option>
            <option value="image">Image/Video</option>
          </select>
        </SettingsInputFrame>
      </SettingsField>

      {backgroundType === 'solid' && (
        <SettingsField>
          <SettingsLabel>Background Color</SettingsLabel>
          <SettingsInputFrame>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              disabled={isLoadingBgColor}
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              disabled={isLoadingBgColor}
              style={{ marginLeft: '0.5rem', flex: 1 }}
            />
          </SettingsInputFrame>
        </SettingsField>
      )}

      {backgroundType === 'image' && (
        <SettingsField>
          <SettingsLabel>Background Image URL</SettingsLabel>
          <SettingsInputFrame>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
              disabled={isLoadingBgImage}
            />
          </SettingsInputFrame>
        </SettingsField>
      )}

      <SettingsField>
        <SettingsLabel>Background Opacity (%)</SettingsLabel>
        <SettingsSliderFrame>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            disabled={isLoadingBgOpacity}
            value={backgroundOpacity}
            onChange={(e) => setBackgroundOpacity(parseInt(e.target.value))}
          />
          <span>{backgroundOpacity}%</span>
        </SettingsSliderFrame>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Font Color</SettingsLabel>
        <SettingsInputFrame>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            disabled={isLoadingFontColor}
          />
          <input
            type="text"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            disabled={isLoadingFontColor}
            style={{ marginLeft: '0.5rem', flex: 1 }}
          />
        </SettingsInputFrame>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Temperature Unit</SettingsLabel>
        <SettingsInputFrame>
          <select
            value={temperatureUnit}
            onChange={(e) => setTemperatureUnit(e.target.value as 'C' | 'F')}
            disabled={isLoadingUnit}
          >
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </SettingsInputFrame>
      </SettingsField>

      <SettingsDivider />

      {/* Date & Time Formats */}
      <SettingsField>
        <SettingsLabel>Time Format</SettingsLabel>
        <SettingsInputFrame>
          <select
            value={timeFormat}
            onChange={(e) => setTimeFormat(e.target.value as '12h' | '24h')}
            disabled={isLoadingTimeFormat}
          >
            <option value="12h">12-Hour (AM/PM)</option>
            <option value="24h">24-Hour</option>
          </select>
        </SettingsInputFrame>
      </SettingsField>

      <SettingsField>
        <SettingsLabel>Date Format</SettingsLabel>
        <SettingsInputFrame>
          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value as 'MMM DD, YYYY' | 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD')}
            disabled={isLoadingDateFormat}
          >
            <option value="MMM DD, YYYY">MMM DD, YYYY (e.g., Jan 15, 2025)</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY (e.g., 01/15/2025)</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY (e.g., 15/01/2025)</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD (e.g., 2025-01-15)</option>
          </select>
        </SettingsInputFrame>
      </SettingsField>
    </SettingsContainer>
  );
}
