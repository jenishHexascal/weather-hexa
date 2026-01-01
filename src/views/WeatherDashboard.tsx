import React, { useState, useEffect } from "react";
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
  backgroundType?: "solid" | "weather" | "image" | "video";
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundOpacity?: number;
  fontColor?: string;
  temperatureUnit?: "C" | "F";
}

const convertTemp = (temp: number, unit: "C" | "F"): number => {
  if (unit === "F") return Math.round((temp * 9) / 5 + 32);
  return Math.round(temp);
};

const getWeatherBackground = (
  code: string,
  type: "solid" | "weather" | "image"
): string => {
  if (type !== "weather") return "";
  const weatherGradients: Record<string, string> = {
    "4": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", // Broken clouds
    "8": "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)", // Overcast clouds
    "18": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Light rain
    "19": "linear-gradient(135deg, #5c7cfa 0%, #3b5bdb 100%)", // Moderate rain
    "20": "linear-gradient(135deg, #364fc7 0%, #1e3a8a 100%)", // Heavy rain
    "11": "linear-gradient(135deg, #434343 0%, #000000 100%)", // Thunderstorm
    "13": "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)", // Snow
    default: "linear-gradient(135deg, #2b6cb0, #63b3ed)", // Default sky blue
  };
  return weatherGradients[code] || weatherGradients["default"];
};

export const GLASS_GRADIENT = `
  radial-gradient(circle at 50% 50%, rgba(79, 172, 254, 0.18) 0%, transparent 75%),
  radial-gradient(at 0% 0%, rgba(79, 172, 254, 0.12) 0px, transparent 50%),
  radial-gradient(at 100% 100%, rgba(255, 0, 128, 0.08) 0px, transparent 50%)
  `;

export const WeatherDashboard: React.FC<Props> = ({
  current,
  forecast,
  view,
  setView,
  backgroundType = "weather",
  backgroundColor = "#2b6cb0",
  backgroundImage = "",
  backgroundOpacity = 100,
  fontColor = "#ffffff",
  temperatureUnit = "C",
}) => {
  // Calculate dynamic icon size based on window width
  const [iconSize, setIconSize] = useState(150);
  const [forecastIconSize, setForecastIconSize] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      // Logic: If screen is small (mobile), make icon smaller. If Projector/Desktop, huge.
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      setIconSize(Math.max(100, minDimension * 0.25)); // 25% of screen minimum dimension
      setForecastIconSize(Math.max(40, minDimension * 0.08)); // 8% for forecast icons
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Init
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getBackgroundStyle = () => {
    let bg = "";
    if (backgroundType === "image" && backgroundImage) {
      bg = `url(${backgroundImage})`;
    } else if (backgroundType === "weather") {
      bg = getWeatherBackground(current.code, "weather");
    } else if (backgroundType === "solid") {
      bg = backgroundColor;
    }
    return {
      background: bg || "transparent",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: fontColor,
      position: "relative" as const,
    };
  };

  const getGreeting = (time: string): string => {
    const hour = parseInt(time.split(":")[0], 10);
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  const overlayStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: `rgba(0,0,0, ${1 - backgroundOpacity / 100})`,
    zIndex: 1,
  };

  const displayTemp = convertTemp(current.temp, temperatureUnit);
  const displayFeelsLike = current.feelsLike
    ? convertTemp(current.feelsLike, temperatureUnit)
    : null;
    const displayForecast = view === "24H" ? [...forecast, ...forecast] : forecast;
    const marqueeDuration = `${forecast.length * 3}s`;

  const backgroundStyle = getBackgroundStyle();

  return (
    <div className="weather-dashboard" style={backgroundStyle}>
      {/* BACKGROUND MEDIA LAYER */}
      <div className="bg-media-container">
        {backgroundType === "image" && backgroundImage && (
          <img src={backgroundImage} className="bg-image" alt="bg" />
        )}
        {backgroundType === "video" && backgroundImage && (
          <video autoPlay loop muted playsInline className="bg-video">
            <source src={backgroundImage} type="video/mp4" />
          </video>
        )}
        {/* OPACITY OVERLAY - Show for all background types when opacity < 100 */}
        {backgroundOpacity < 100 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: `rgba(0,0,0, ${1 - backgroundOpacity / 100})`,
              zIndex: 1,
            }}
          />
        )}
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER SECTION */}
        <header className="weather-top-bar glass-panel">
          <div className="location-group">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "0.938rem",
              }}
            >
              <span className="city-name">{current.city}</span>
              <span
                className="current-date-text"
                style={{ marginBottom: "0.5rem" }}
              >
                | {current.date}
              </span>
            </div>
          </div>

          <div className="time-group">
            <div className="time">{current.time}</div>
          </div>
        </header>

        {/* MAIN HERO SECTION */}
        <main
          className="hero-section"
          style={{
            background: "transparent",
            border: "none",
            backdropFilter: "none",
            boxShadow: "none",
          }}
        >
          {/* Left Stats */}
          <div className="hero-left">
            <div className="metric-card glass-panel">
              <span className="metric-label">Wind Velocity</span>
              <p className="metric-value">
                {current.WindSpeed}
                <span className="metric-unit">KM/H</span>
              </p>
            </div>

            <div className="metric-card glass-panel">
              <span className="metric-label">Humidity</span>
              <p className="metric-value">{current.Humidity}
                 <span className="metric-unit">%</span></p>
            </div>
          </div>

          {/* Temperature Centerpiece */}
          <div className="main-display">
            <div className="weather-icon-main" style={{ marginBottom: "1vh" }}>
              {weatherIcons[current.code]?.({ size: 120 })}
            </div>
            <h1 className="main-temp-value">
              {displayTemp}°{temperatureUnit}
            </h1>
            <p className="condition-text">{current.condition}</p>
          </div>

          {/* Right Stats */}
          <div className="hero-right">
            <div className="metric-card glass-panel">
              <span className="metric-label">Real Feel</span>
              <p className="metric-value">{displayFeelsLike}°</p>
            </div>
            <div className="metric-card glass-panel">
              <span className="metric-label">Precipitation</span>
              <p className="metric-value">
                {current.Precip} <small style={{ fontSize: "0.5em" }}>
                  <span className="metric-unit">MM</span></small>
              </p>
            </div>
          </div>
        </main>

        {/* SCROLLABLE FORECAST SECTION */}
        <footer className="forecast-section glass-panel">
          <div className="forecast-header">
            <span>
              {view === "24H" ? "HOURLY FORECAST" : "EXTENDED OUTLOOK"}
            </span>
            <div
              className="toggle-group"
              style={{ display: "flex", gap: "0.9375rem" }}
            >
              {["24H", "3D", "1W"].map((v) => (
                <button
                  key={v}
                  className={`forecast-toggle ${view === v ? "active" : ""}`}
                  style={{
                    background: view === v ? "rgba(255,255,255,0.1)" : "none",
                    border: "none",
                    color: "#fff",
                    padding: "0.3125rem 0.9375rem",
                    borderRadius: "1.25rem",
                    cursor: "pointer",
                    fontSize: "2vmin",
                    fontWeight: "bold",
                    transition: "0.3s",
                  }}
                  onClick={() => setView(v as any)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* Apply marquee classes conditionally */}
          <div className="forecast-row" style={{ overflow: view === "24H" ? 'hidden' : 'auto' }}>
            <div 
              className={`marquee-container ${view === "24H" ? "marquee-active" : ""}`}
              style={{ 
                // @ts-ignore (Passing dynamic duration to CSS variable)
                "--MarqueeDuration": marqueeDuration 
              }}
            >
              {displayForecast.map((day, i) => (
                <div key={`${day.day}-${i}`} className="forecast-card">
                  <span className="forecast-day">{day.day}</span>
                  <span className="forecast-condition" style={{fontSize: '2.3vmin'}}>
                    {day.condition}
                  </span>
                  {weatherIcons[day.code]?.({ size: 70 })}
                  <div className="forecast-temps">
                    <span>{convertTemp(view === "24H" ? day.temp : day.max, temperatureUnit)}°{temperatureUnit}</span>
                    {view !== "24H" && (
                      <span style={{ opacity: 0.4, fontSize: '0.8em', marginLeft: '0.375rem' }}>
                        {convertTemp(day.min, temperatureUnit)}°{temperatureUnit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>          
        </footer>
      </div>
    </div>
  );
};
