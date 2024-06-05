import WeatherReport from "./WeatherReport"

const Country = ({ country }) => {
    
    return (
        <div>
            <h1>{country.name["common"]}</h1>
            <div>
                capital {country.capital}<br/>
                area {country.area}
            </div>
            <br/>
            <b>languages:</b>
            <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <div>
                <img src={country.flags.png}></img>
            </div>
            <div>
                <WeatherReport country={country}/>W
            </div>
        </div>
      )
  
}

export default Country