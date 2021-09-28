import React, { useState, useRef } from "react";

import './assets/style/App.css';

import { api, APIkey } from "./server/server";

import Compass from './assets/icons/bussola.png';

function App() {

  const questionValue = useRef();

  const [user, setUser] = useState();
  console.log(user)

  function getData() {
    const cityName = questionValue.current.value;
    api.get(`weather?q=${cityName}&appid=${APIkey}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  const icon = user?.weather[0].icon;

  const Temp = user?.main.temp - 273.15;

  const TempFeelsLike = user?.main.feels_like - 273.15;

  const Visibility = user?.visibility / 1000;

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="titlte">How's the <span> Weather? </span></div>
        </div>
        <div className="content">
          <div className="inputContainer">
            <input placeholder="Pesquise por uma cidade..." ref={questionValue} />
            <button onClick={getData}> Search </button>
          </div>
          <div className="weatherContainer">
            <div className="name">
              <p> {user?.name}, {user?.sys.country}</p>
            </div>
            <div className="weather">
              <img src={`http://openweathermap.org/img/wn/${icon}.png`} />
              <p> {Math.round(Temp)}ºC</p>
            </div>
            <div className="weatherDescription">
              <p>Feels like {Math.round(TempFeelsLike)}ºC, {user?.weather[0].main}, {user?.weather[0].description}</p>
            </div>
            <div className="weatherInfos">
              <p> <img src={Compass} /> {user?.wind.speed}m/s SSW</p>
              <p>Humidity: {user?.main.humidity}%</p>
              <p>Visibility: {Visibility}km</p>
            </div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
}

export default App;
