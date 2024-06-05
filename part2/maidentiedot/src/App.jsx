import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from "./components/Country"
import CountryList from "./components/CountryList"

const Display = ({ countryList, setCountries, setValue }) => {
  console.log(countryList)
  if(countryList.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if(countryList.length == 0) {
    return (
      <div>
        No matches found
      </div>
    )
  } else if(countryList.length == 1) {
    const c = countryList[0]
    return (
      <Country country={c}/>
    )
  } else {
    return <CountryList countries={countryList} setCountries={setCountries} setValue={setValue}/>
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const[countries, setCountries] = useState([])

  useEffect(() => {
    console.log('Fetching new countries')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(
          response.data.filter(c => c.name["common"].toLowerCase().includes(value.toLowerCase()))
        )
      })
  }, [value])

  console.log('Current countries', countries.length)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <form>
        Find countries <input value={value} onChange={handleChange} />
      </form>
      <div>
        <Display countryList={countries} setCountries={setCountries} setValue={setValue}/>
      </div>
    </div>
  )
}

export default App