import React, { useState, useEffect, useRef } from "react";
import { useWeather } from "../hooks/useWeather";
import { WeatherDashboard } from "./WeatherDashboard";
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
} from "../hooks/store";
import "../styles/weather.css";

const formatDate = (date: Date, timeZone: string, format: string): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  switch (format) {
    case 'MMM DD, YYYY':
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone,
      }).format(date);
    case 'MM/DD/YYYY':
      return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
    case 'DD/MM/YYYY':
      return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    default:
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone,
      }).format(date);
  }
};

const formatTime = (date: Date, timeZone: string, format: '12h' | '24h'): string => {
  if (format === '24h') {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    }).format(date);
  } else {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(date);
  }
};

const parseTelemetryDate = (value: string) => {
  if (/^\d{4}-\d{2}-\d{2}:\d{2}$/.test(value)) {
    return new Date(value.replace(":", "T") + ":00");
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(value + "T00:00:00");
  }
  return new Date(value);
};

const getDayFromDate = (dateString: string) => {
  const date = parseTelemetryDate(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const getHourFromDate = (dateString: string, timeFormat: '12h' | '24h') => {
  const date = parseTelemetryDate(dateString);
  if (timeFormat === '24h') {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const convertTemp = (temp: number, unit: 'C' | 'F'): number => {
  if (unit === 'F') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

export const Render: React.FC = () => {
  // Get all settings from store
  const [isLoadingLocations, locations] = useLocationsStoreState();
  const [isLoadingMode, locationMode] = useLocationModeStoreState();
  const [isLoadingCycle, cycleDuration] = useCycleDurationStoreState();
  const [isLoadingTransition, transitionStyle] = useTransitionStyleStoreState();
  const [isLoadingForecast, forecastRange, setForecastRange] = useForecastRangeStoreState();
  const [isLoadingBgType, backgroundType] = useBackgroundTypeStoreState();
  const [isLoadingBgColor, backgroundColor] = useBackgroundColorStoreState();
  const [isLoadingBgImage, backgroundImage] = useBackgroundImageStoreState();
  const [isLoadingBgOpacity, backgroundOpacity] = useBackgroundOpacityStoreState();
  const [isLoadingFontColor, fontColor] = useFontColorStoreState();
  const [isLoadingUnit, temperatureUnit] = useTemperatureUnitStoreState();
  const [isLoadingTimeFormat, timeFormat] = useTimeFormatStoreState();
  const [isLoadingDateFormat, dateFormat] = useDateFormatStoreState();

  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get current location
  const currentLocation = locations.length > 0 ? locations[currentLocationIndex] : null;
  const cityToFetch = currentLocation?.city || (locations.length === 0 ? "Delhi, India" : "");

  const { current, forecast, hourly, loading, error, retry } = useWeather(cityToFetch);

  // City cycling logic
  useEffect(() => {
    if (locations.length <= 1 || isLoadingCycle) {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
      return;
    }

    cycleIntervalRef.current = setInterval(() => {
      if (transitionStyle === 'fade') {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
          setTransitioning(false);
        }, 500);
      } else if (transitionStyle === 'slide') {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
          setTransitioning(false);
        }, 500);
      } else {
        setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
      }
    }, cycleDuration * 1000);

    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    };
  }, [locations.length, cycleDuration, transitionStyle, isLoadingCycle]);

  // Map forecast range to view
  const view = forecastRange === '24H' ? '24H' : forecastRange === '3D' ? '3D' : '1W';
  const setView = (newView: '24H' | '3D' | '1W' | ((prev: '24H' | '3D' | '1W') => '24H' | '3D' | '1W')) => {
    if (typeof newView === 'function') {
      setForecastRange(newView(forecastRange));
    } else {
      setForecastRange(newView);
    }
  };

  // Empty state
  if (!isLoadingLocations && locations.length === 0 && locationMode === 'manual') {
    return (
      <div className="empty-state" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        color: fontColor || '#ffffff',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Location Configured</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          Please configure at least one location in settings to display weather information.
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.6, marginTop: '1rem' }}>
          Go to Settings → Location Configuration to add a city.
        </p>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="loading-state" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        color: fontColor || '#ffffff'
      }}>
        <div className="skeleton">Loading weather data...</div>
      </div>
    );
  }

  // Error state
  if (error || !current) {
    return (
      <div className="error-state" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        color: fontColor || '#ffffff',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Unable to Fetch Weather</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
          There was an error retrieving weather data for {currentLocation?.displayName || currentLocation?.city || 'this location'}.
        </p>
        <button
          onClick={retry}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: fontColor || '#ffffff',
            border: `2px solid ${fontColor || '#ffffff'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }}
        >
          Retry
        </button>
        <p style={{ fontSize: '1rem', opacity: 0.6, marginTop: '1rem' }}>
          Or check your settings to verify the location is correct.
        </p>
      </div>
    );
  }

  // Determine visible forecast based on range
  const visibleForecast =
    forecastRange === '24H'
      ? hourly.slice(0, 24)
      : forecastRange === '3D'
      ? forecast.slice(0, 3)
      : forecast.slice(0, 7);

  // Convert UNIX timestamp (seconds → milliseconds)
  const currentDate = new Date(current.Timestamp * 1000);
  const timezone = current.Timezone || 'UTC';

  const transitionClass = transitioning ? `transition-${transitionStyle}` : '';

  return (
    <div className={`weather-container ${transitionClass}`}>
      <WeatherDashboard
        current={{
          city: currentLocation?.displayName || current.CityLocalized,
          State: current.State,
          date: formatDate(currentDate, timezone, dateFormat),
          time: formatTime(currentDate, timezone, timeFormat),
          temp: current.Temp,
          feelsLike: current.FeelsLike,
          condition: current.WeatherText,
          code: current.WeatherCode,
          WindSpeed: current.WindSpeed,
          WindDirection: current.WindDirection,
          Pressure: current.Pressure,
          Precip: current.Precip,
          PrecipChance: current.PrecipChance,
          Humidity: current.RelativeHumidity,
        }}
        view={view}
        setView={setView}
        forecast={visibleForecast.map((item: any) => ({
          day:
            forecastRange === '24H'
              ? getHourFromDate(item.Datetime, timeFormat)
              : getDayFromDate(item.Datetime),
          condition: item.Label,
          max: item.MaxTemp ?? item.Temp,
          min: item.MinTemp ?? item.Temp,
          code: item.WeatherCode,
          temp: item.Temp,
        }))}
        backgroundType={backgroundType}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        backgroundOpacity={backgroundOpacity}
        fontColor={fontColor}
        temperatureUnit={temperatureUnit}
      />
    </div>
  );
};
