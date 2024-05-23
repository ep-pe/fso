const Filter = ({ current, changeFn }) => {
    return (
      <div>
        Filter shown with <input value={current} onChange={changeFn}/>
      </div>
    )
  }
  
  const PersonForm = ({ currentName, currentNumber, changeName, changeNumber, addPerson }) => {
    return (
      <form onSubmit={addPerson}>
        <div>name: <input value={currentName} onChange={changeName}/></div>
        <div>number: <input value={currentNumber} onChange={changeNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
  }
  
  const PersonsList = ({ persons, filter, deletePerson }) => {
    const personsToShow = persons.filter(
      person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
    return (
      <div>
        {personsToShow.map(person => 
          <PersonListItem 
            key={person.name}
            person={person}
            deletePerson={() => deletePerson(person)}
            />
          )}
      </div>
    )
  }
  
  const PersonListItem = ({ person, deletePerson }) => {
    return (
      <div>
        {person.name} {person.number} {' '}
        <button onClick={deletePerson}>{'Delete'}</button>
      </div>
    )
  }

  export { Filter, PersonForm, PersonsList }