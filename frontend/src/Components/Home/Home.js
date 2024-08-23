import React, { useEffect, useState } from "react";
import Weather from "../Weather/Weather.js";
import { FaRedo } from "react-icons/fa";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";

function Home({ username, handleLogout, token }) {
  const locations = useSelector((state) => state.locations);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/locations/", {
          method: "POST", // Change to POST if username is needed in the request body
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }), // Include the username in the request body
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
    try {
      const response = await fetch("http://localhost:8000/api/fetch-weather/", {
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
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const removeLocation = async (locationName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delete-location/${locationName}/`,
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
          const response = await fetch(
            "http://localhost:8000/api/fetch-weather/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ location: location.name }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }

          return response.json();
        })
      );

      dispatch({ type: "SET_LOCATIONS", payload: updatedLocations });
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
        </div>
        <button className="refresh-button" onClick={refreshWeather}>
          <FaRedo /> Refresh
        </button>
      </div>
      <div className="weather-cards">
        {locations.map((location) => (
          <Weather
            key={location.name}
            data={location}
            onRemove={() => removeLocation(location.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
