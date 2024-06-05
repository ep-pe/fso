import { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherReport = ({ country }) => {
    const [weather, setWeather] = useState([])


    useEffect(() => {
        const api_key = import.meta.env.VITE_SOME_KEY
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)
        })
    }, [])

    return (
        <>
        <h1>Weather in {country.capital}</h1>
        temperature {weather.main.temp} Celcius<br/>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/><br/>
        wind {weather.wind.speed} m/s
        </>
    )
}

export default WeatherReport