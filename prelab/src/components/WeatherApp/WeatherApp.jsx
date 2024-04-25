import React from "react";
import './WeatherApp.css'
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import cloud_image from "../assets/cloud.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faWind} from '@fortawesome/free-solid-svg-icons'
import {faTint} from '@fortawesome/free-solid-svg-icons'



function WeatherApp(){

    let api_key ="227b1bbfa8adafd9c87f4ce405a3278b";

    const search= async()=>{
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === "")
        {
            return 0;
        }
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        
        let response = await fetch(url);
        let data = await response.json();
        const humidity= document.getElementsByClassName("humidity-percent");
        const wind= document.getElementsByClassName("wind-rate");
        const temperature= document.getElementsByClassName("weather-temp");
        const location= document.getElementsByClassName("weather-location")

        humidity[0].innerHTML= data.main.humidity +" %";
        wind[0].innerHTML= data.wind.speed + "km/h";
        temperature[0].innerHTML=data.main.temp + "°c";
        location[0].innerHTML = data.name;
    }
    const logout = async()=>{
        try{
            await signOut(auth)
            } catch (err){
                console.error(err);
            }
      };


    return(
        <div className="container">
            <div className="top">
                <input type="text" className="cityInput" placeholder="search city"/>
                <div className="search-icon" onClick={()=>{search()}}>
                <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="weather-image">
                <img src={cloud_image} alt="" />
            </div>
            <div className="weather-temp">24c</div>
            <div className="weather-location">Buea</div>
            <div className="data-container">
                <div className="element">
                  <div className="data">
                 <div className="icon"> <FontAwesomeIcon icon={faTint} /></div>
                    <div className="humidity-percent">
                        64%
                    </div>
                    <div className="text">Humidity</div>
                  </div>
                </div>
                <div className="element">
                  <div className="data">
                <div className="icon">  <FontAwesomeIcon icon={faWind} /></div>
                    <div className="wind-rate">
                        18 km/h
                    </div>
                    <div className="text">Wind Speed</div>
                  </div>
                </div>
                <button onClick={logout}>logout</button>
            </div>
        </div>
    )
}
export default WeatherApp