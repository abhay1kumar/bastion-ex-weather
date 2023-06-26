import axios from "axios";
import React, { useEffect, useState } from "react";
import "./WeatherForecast.css";

  

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const getData = async () => {
    const config = {
      method: "get",
      url: "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await axios(config);
      console.log(response);
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const splitDateTime = (dateTime) => {
    const [date, time] = dateTime.split('T');
    return { date, time };
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="weatherInfo">
        <div className="weatherCard">
          <img
            src="/icons/perfect-day.svg"
            alt="wind"
            width="100px"
            height="100px"
          />
          <p style={{color:"#fff", fontSize:"16px"}}>{weatherData.current_weather.time.split("T")[0]}</p>
        </div>
        <div className="WeaterInformation">
          <div className="weatherCard">
            <img
              src="/icons/temp.svg"
              alt="wind"
              width="100px"
              height="100px"
            />
            <p style={{color:"#fff", fontSize:"16px"}}>{weatherData.current_weather.temperature}°C</p>
            <p style={{color:"#fff", fontSize:"16px"}}>Temperature</p>
          </div>

          <div className="weatherCard">
            <img
              src="/icons/wind.svg"
              alt="wind"
              width="100px"
              height="100px"
            />
            <p style={{color:"#fff", fontSize:"16px"}}>{weatherData.current_weather.windspeed} km/h</p>
            <p style={{color:"#fff", fontSize:"16px"}}>Wind Speed</p>
          </div>
        </div>
      
    {/* Table */}


    <div>
      <h2 style={{color:"#fff"}}>Hourly Weather</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{border:"1px solid #ddd" , color:"#fff"}}>Date</th>
            <th style={{border:"1px solid #ddd" , color:"#fff"}}>Time</th>
            <th style={{border:"1px solid #ddd" , color:"#fff"}}>Temperature (°C)</th>
            <th style={{border:"1px solid #ddd" , color:"#fff"}}>Relative Humidity (%)</th>
            <th style={{border:"1px solid #ddd" , color:"#fff"}}>Wind Speed (m/s)</th>
          </tr>
        </thead>
        <tbody>
        {weatherData.hourly.time.map((time, index) => {
            const { date, time: hour } = splitDateTime(time);
            return (
              <tr key={time}>
                <td className="cellStyles">{date}</td>
                <td className="cellStyles">{hour}</td>
                <td className="cellStyles">{weatherData.hourly.temperature_2m[index]} °C</td>
                <td className="cellStyles">{weatherData.hourly.relativehumidity_2m[index]} %</td>
                <td className="cellStyles">{weatherData.hourly.windspeed_10m[index]} m/s</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    
      </div>
    </>
  );
};

export default Weather;
