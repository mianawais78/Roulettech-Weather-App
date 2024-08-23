import React from "react";
import { FaTimes } from "react-icons/fa";
import "./Weather.css";

function Weather({ data, onRemove }) {
  return (
    <div className="weather-card">
      <button className="close-button" onClick={onRemove}>
        <FaTimes />
      </button>
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {/* Display temperature if available */}
          {data.temperature ? <h1>{data.temperature.toFixed()}°F</h1> : null}
        </div>
        <div className="description">
          {/* Display weather description if available */}
          {data.weather_description ? <p>{data.weather_description}</p> : null}
        </div>
      </div>
      {data.name && (
        <div className="bottom">
          <div className="feels">
            {/* Display feels like temperature if available */}
            {data.feels_like ? (
              <p className="bold">{data.feels_like.toFixed()}°F</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {/* Display humidity if available */}
            {data.humidity ? <p className="bold">{data.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {/* Display wind speed if available */}
            {data.wind_speed ? (
              <p className="bold">{data.wind_speed.toFixed()} MPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
