const CountryList = ({countries, setCountries, setValue}) => {
    return (
        <div>
            {countries.map(
                c => <div key={c.name["common"]}>
                                {c.name["common"]} <button onClick={() => setCountries([c])}>show</button>
                            </div>
            )}
        </div>
      )
}

export default CountryList