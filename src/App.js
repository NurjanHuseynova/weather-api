import { useState } from "react";

import axios from "axios";
import { Button, Input, Label } from "reactstrap";
import "./assets/style.css";
function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const getWeatherApi = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cad7ec124945dcfff04e457e76760d90`
      );
      if (res?.data) {
        setWeatherData(res.data);
      }
    } catch (error) {
      if (error?.response?.data?.cod === "404") {
        setCity("");
        alert(error?.response?.data?.message);
      }
      console.log("error", error);
    }
  };

  const icon = weatherData?.weather?.[0]?.icon;
  const desc = weatherData?.weather?.[0]?.description;

  return (
    <>
      <div className="container">
        <Label>City name:</Label>
        <div className="main">
          <Input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <Button
            style={{ background: "wheat", color: "black" }}
            onClick={getWeatherApi}
          >
            Search
          </Button>
        </div>

        {!city ? (
          <h1>City not found</h1>
        ) : (
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <img
                style={{ width: "250px" }}
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              />
              <p className="desc">{desc}</p>
            </div>
            <div
              style={{ marginTop: "90px", color: "wheat", marginLeft: "20px" }}
            >
              <p className="name">{weatherData.name}</p>
              <hr />
              {weatherData.main ? (
                <div>
                  <p>
                    Feels like:
                    {Math.ceil(weatherData?.main?.feels_like - 273.15)}
                  </p>
                  <p>Humidity: {weatherData?.main?.humidity}%</p>
                  <p>Wind: {weatherData?.wind?.speed} km/h</p>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
