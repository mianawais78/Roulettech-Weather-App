import React, { useEffect, useState } from "react";
import Weather from "../Weather/Weather.js";
import { FaRedo } from "react-icons/fa";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../Config";

function Home({ username, handleLogout, token }) {
  const locations = useSelector((state) => state.locations);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/locations/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved locations");
        }

        const data = await response.json();
        dispatch({ type: "SET_LOCATIONS", payload: data });
      } catch (error) {
        console.error("Error fetching saved locations:", error);
      }
    };

    fetchSavedLocations();
  }, [dispatch, token, username]);

  const addLocation = async () => {
    if (
      locations.some((loc) => loc.name.toLowerCase() === location.toLowerCase())
    ) {
      setErrorMessage("Location already added!");
      setTimeout(() => setErrorMessage(""), 3000); 
      return;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fetch-weather/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      dispatch({ type: "ADD_LOCATION", payload: data });
      setLocation("");
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Error fetching weather data. Please try again.");
    }
  };

  const removeLocation = async (locationName) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/delete-location/${locationName}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete location");
      }

      dispatch({ type: "REMOVE_LOCATION", payload: locationName });
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const refreshWeather = async () => {
    try {
      const updatedLocations = await Promise.all(
        locations.map(async (location) => {
          const response = await fetch(`${config.apiBaseUrl}/fetch-weather/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ location: location.name }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }

          return response.json();
        })
      );

      const uniqueUpdatedLocations = updatedLocations.filter(
        (data) => !locations.some((loc) => loc.name === data.name)
      );

      dispatch({
        type: "SET_LOCATIONS",
        payload: [...locations, ...uniqueUpdatedLocations],
      });
    } catch (error) {
      console.error("Error refreshing weather data:", error);
    }
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <button className="refresh-button" onClick={refreshWeather}>
          <FaRedo /> Refresh
        </button>
      </div>
      <div className="weather-cards">
        {locations.map((loc) => (
          <Weather
            key={loc.name}
            data={loc}
            onRemove={() => removeLocation(loc.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
