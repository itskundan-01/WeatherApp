import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("New Delhi");

  const handleFetch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data. " + err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather Data</h1>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="city-input"
        />
        <button onClick={handleFetch} className="fetch-button">
          Fetch Data
        </button>
      </div>
      {error && <p className="error-message">Error: {error}</p>}
      {weather && (
        <div className="weather-container">
          <h2 className="location-heading">
            {weather.location.name}, {weather.location.region}
          </h2>
          <p className="location-country">{weather.location.country}</p>
          <p className="location-time">Local Time: {weather.location.localtime}</p>
          <div className="weather-display">
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="weather-icon"
            />
            <div>
              <p className="temperature">{weather.current.temp_c}°C</p>
              <p className="condition-text">{weather.current.condition.text}</p>
            </div>
          </div>
          <div className="weather-details">
            <p className="location-info">Humidity: {weather.current.humidity}%</p>
            <p className="location-info">
              Wind: {weather.current.wind_kph} kph {weather.current.wind_dir}
            </p>
            <p className="location-info">UV Index: {weather.current.uv}</p>
          </div>
          <div className="additional-weather-info">
            <div className="info-item">
              <span className="info-label">Feels Like:</span>
              <span className="info-value">{weather.current.feelslike_c}°C</span>
            </div>
            <div className="info-item">
              <span className="info-label">Pressure:</span>
              <span className="info-value">{weather.current.pressure_mb} mb</span>
            </div>
            <div className="info-item">
              <span className="info-label">Visibility:</span>
              <span className="info-value">{weather.current.vis_km} km</span>
            </div>
            <div className="info-item">
              <span className="info-label">Precipitation:</span>
              <span className="info-value">{weather.current.precip_mm} mm</span>
            </div>
            <div className="info-item">
              <span className="info-label">Cloud Cover:</span>
              <span className="info-value">{weather.current.cloud}%</span>
            </div>
            <div className="info-item">
              <span className="info-label">Wind Gusts:</span>
              <span className="info-value">{weather.current.gust_kph} kph</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}