import React from "react";
import { weatherIcons } from "./weatherIcons";
import { LocationIcon } from "../icons/LocationIcon";

interface CurrentWeather {
  city: string;
  date: string;
  time: string;
  temp: number;
  feelsLike?: number;
  condition: string;
  code: string;
  WindSpeed: number;
  WindDirection?: number;
  Pressure: number;
  Precip: number;
  PrecipChance?: number;
  Humidity?: number;
  State: string;
}

interface ForecastDay {
  day: string;
  max: number;
  min: number;
  code: string;
  condition: string;
  temp: number;
}

interface Props {
  current: CurrentWeather;
  forecast: ForecastDay[];
  view: "24H" | "3D" | "1W";
  setView: React.Dispatch<React.SetStateAction<"24H" | "3D" | "1W">>;
  backgroundType?: 'solid' | 'weather' | 'image';
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundOpacity?: number;
  fontColor?: string;
  temperatureUnit?: 'C' | 'F';
}

const convertTemp = (temp: number, unit: 'C' | 'F'): number => {
  if (unit === 'F') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

const getWindDirection = (degrees?: number): string => {
  if (degrees === undefined) return '';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const getWeatherBackground = (code: string, type: 'solid' | 'weather' | 'image'): string => {
  if (type !== 'weather') return '';
  
  // Weather-based background gradients
  const weatherGradients: Record<string, string> = {
    '4': 'linear-gradient(180deg, #87CEEB, #B0C4DE)', // Broken clouds
    '8': 'linear-gradient(180deg, #708090, #778899)', // Overcast
    '18': 'linear-gradient(180deg, #4682B4, #5F9EA0)', // Light rain
    '19': 'linear-gradient(180deg, #4169E1, #6495ED)', // Moderate rain
    '20': 'linear-gradient(180deg, #191970, #000080)', // Heavy rain
    '11': 'linear-gradient(180deg, #2F4F4F, #1C1C1C)', // Thunderstorm
    '13': 'linear-gradient(180deg, #E0E0E0, #F5F5F5)', // Snow
  };
  
  return weatherGradients[code] || 'linear-gradient(180deg, #2b6cb0, #63b3ed)';
};

export const WeatherDashboard: React.FC<Props> = ({ 
  current, 
  forecast, 
  view, 
  setView,
  backgroundType = 'weather',
  backgroundColor = '#2b6cb0',
  backgroundImage = '',
  backgroundOpacity = 100,
  fontColor = '#ffffff',
  temperatureUnit = 'C',
}) => {
  const getBackgroundStyle = () => {
    let bg = '';
    
    if (backgroundType === 'image' && backgroundImage) {
      bg = `url(${backgroundImage})`;
    } else if (backgroundType === 'weather') {
      bg = getWeatherBackground(current.code, 'weather');
    } else {
      bg = backgroundColor;
    }
    
    return {
      background: bg,
      backgroundSize: backgroundType === 'image' ? 'cover' : 'auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: fontColor,
      position: 'relative' as const,
    };
  };

  const getBackgroundOverlayStyle = () => {
    // Overlay to control opacity - darker overlay = less visible background
    const opacity = (100 - backgroundOpacity) / 100;
    return {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${Math.max(0, Math.min(1, opacity))})`,
      pointerEvents: 'none' as const,
      zIndex: 0,
    };
  };

  const displayTemp = convertTemp(current.temp, temperatureUnit);
  const displayFeelsLike = current.feelsLike ? convertTemp(current.feelsLike, temperatureUnit) : undefined;

  return (
    <div className="weather-dashboard" style={getBackgroundStyle()}>
      <div style={getBackgroundOverlayStyle()}></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Top Section */}
      <div className="current-weather">
        <div className="current-left">
          <p className="city ">
            {<LocationIcon size={28} />}
            {current.city}
          </p>
          <p className="date">{current.date}</p>
          <p className="time">{current.time}</p>
          <p className="condition">{current.condition}</p>
        </div>

        <div className="current-center">
          <div className="main-icon">
            {weatherIcons[current.code]?.({ size: 300 })}
          </div>
        </div>

        <div className="current-right">
          <div className="metric main-temp">
            <span className="value">{displayTemp}°{temperatureUnit}</span>
          </div>

          {displayFeelsLike !== undefined && (
            <div className="metric">
              <span className="label">Feels Like</span>
              <span className="value">
                {displayFeelsLike}°{temperatureUnit}
              </span>
            </div>
          )}

          {current.Humidity !== undefined && (
            <div className="metric">
              <span className="label">Humidity</span>
              <span className="value">
                {current.Humidity}
                <small>%</small>
              </span>
            </div>
          )}

          <div className="metric">
            <span className="label">Wind</span>
            <span className="value">
              {current.WindSpeed}
              <small>km/h</small>
              {current.WindDirection !== undefined && (
                <small style={{ marginLeft: '4px' }}>{getWindDirection(current.WindDirection)}</small>
              )}
            </span>
          </div>

          <div className="metric">
            <span className="label">Pressure</span>
            <span className="value">
              {current.Pressure}
              <small>hPa</small>
            </span>
          </div>

          <div className="metric">
            <span className="label">Precipitation</span>
            <span className="value">
              {current.Precip}
              <small>mm</small>
              {current.PrecipChance !== undefined && (
                <small style={{ marginLeft: '4px' }}>({current.PrecipChance}%)</small>
              )}
            </span>
          </div>
        </div>
      </div>


<div className="forecast-header">
  {["1W", "3D", "24H"].map((v) => (
    <button
      key={v}
      className={`forecast-toggle ${view === v ? "active" : ""}`}
      onClick={() => setView(v as "24H" | "3D" | "1W")}
    >
      {v}
    </button>
  ))}
</div>
      
      <div className="forecast-row">
        {forecast.map((day, i) => (
          <div key={i} className="forecast-card">
            <p className="day">{day.day}</p>
            <p className="forecast-condition">{day.condition}</p>
            <div className="icon">
              {weatherIcons[day.code]?.({ size: 100 })}
            </div>
            {
              view === "24H" && <p className="temp-max">{convertTemp(day.temp, temperatureUnit)}°{temperatureUnit}</p>
            }
            {view !== "24H" && <>
            <p className="temp-max">{convertTemp(day.max, temperatureUnit)}°{temperatureUnit}</p>
            <p className="temp-min">{convertTemp(day.min, temperatureUnit)}°{temperatureUnit}</p>
            </>}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};