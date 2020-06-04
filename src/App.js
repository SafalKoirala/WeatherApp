import React from "react";
import "./App.css";
import WeatherEngine from "./components/WeatherEngine";

function App() {
  return (
    <div className="App">
      <h1>Weather APP</h1>
      <WeatherEngine location="Kathmandu, Nep" />
      {/* <WeatherEngine location="Sydney, AU" />
      <WeatherEngine location="New York, US" /> */}
    </div>
  );
}

export default App;
