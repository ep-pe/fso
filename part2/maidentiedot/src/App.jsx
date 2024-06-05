import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ countryList }) => {
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
      <div>
        <h1>{c.name["common"]}</h1>
        <div>
          capital {c.capital}<br/>
          area {c.area}
        </div>
        <b>languages:</b>
        <ul>
        </ul>
      </div>
    )
  } else {
    return (
      <>
        {countryList.map(c => c.name["common"])
          .map(name => <div>{name}</div>)
        }
      </>
    )
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
          response.data.filter(c => c.name["common"].toLowerCase().startsWith(value.toLowerCase()))
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
        <Display countryList={countries}/>
      </div>
    </div>
  )
}

export default App