import React from "react";

interface WeatherCardProps {
  temp?: number;
  condition: string;
  icon: React.ReactNode;
  day?: string;
  MaxTemp?: number;
  MinTemp?: number;
}
export const getDayFromDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ temp, condition, icon ,day,MaxTemp,MinTemp}) => {
  return (
    <div className="card weather-card">
      {day && <div className="weather-day">{day}</div>}
      <div className="weather-icon">{icon}</div>
     {temp && <h1 className="weather-temp">{temp}°C</h1>}
      {MaxTemp && <h1 className="weather-temp">{MaxTemp}°C</h1>}
      {MinTemp && <h1 className="weather-temp">{MinTemp}°C</h1>}
      <p className="weather-condition">{condition}</p>
    </div>
  );
};