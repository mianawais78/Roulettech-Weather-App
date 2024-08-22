// src/components/Home.js

import React, { useState } from "react";
import axios from "axios";
import Weather from "../Weather/Weather.js";
import { FaRedo } from "react-icons/fa";
import "./Home.css";

function Home({ username, handleLogout, token }) {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState("");

  const addLocation = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

    try {
      const response = await axios.get(url);
      setCities([...cities, response.data]);
      setLocation("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const removeCity = (cityName) => {
    setCities(cities.filter((city) => city.name !== cityName));
  };

  const refreshWeather = async () => {
    const updatedCities = await Promise.all(
      cities.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
        const response = await axios.get(url);
        return response.data;
      })
    );
    setCities(updatedCities);
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <p className="welcome-message">Welcome, {username}</p>
        <button className="logButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="weather-controls">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") addLocation();
            }}
            placeholder="Enter Location"
            type="text"
          />
          <button onClick={addLocation}>Add Location</button>
        </div>
        <button className="refresh-button" onClick={refreshWeather}>
          <FaRedo /> Refresh
        </button>
      </div>
      <div className="weather-cards">
        {cities.map((city) => (
          <Weather
            key={city.name}
            data={city}
            onRemove={() => removeCity(city.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
