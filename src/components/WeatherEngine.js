import React, { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  //init for state variables
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  }); //this can also be done like query for each objects

  //fetching funtion definition
  const getWeather = async (q) => {
    setQuery("");
    setLoading(true);
    try {
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q},gb&units=metric&APPID=eb068d9e3db93e6eb3beacc03f404add`
      );
      const resJSON = await apiRes.json();
      setWeather({
        temp: resJSON.main.temp,
        city: resJSON.name,
        condition: resJSON.weather[0].main,
        country: resJSON.sys.country,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(query);
  };
  //this runs once i.e at first instead of a blank card
  useEffect(() => {
    getWeather(location);
  }, [location]);

  return (
    <div>
      {!loading && !error ? (
        <div>
          <WeatherCard
            temp={weather.temp}
            condition={weather.condition}
            city={weather.city}
            country={weather.country}
          />

          <form className="search-box">
            <input
              placeholder="Enter a city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={(e) => handleSearch(e)}>SEARCH</button>
          </form>
        </div>
      ) : loading ? (
        <div style={{ color: "black" }}>loading...</div>
      ) : !loading && error ? (
        <div style={{ color: "black" }}>
          There has been an error!
          <br />
          <button onClick={() => setError(false)}>RESET</button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;
