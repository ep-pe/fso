import { useState } from 'react'

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

const PersonsList = ({ persons, filter }) => {
  const personsToShow = persons.filter(
    person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {personsToShow.map(person => <PersonListItem key={person.name} person={person}/>)}
    </div>
  )
}

const PersonListItem = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter current={currentFilter} changeFn={handleFilterChange}/>
      <h2>Add new:</h2>
      <PersonForm 
        currentName={newName}
        currentNumber={newNumber}
        changeName={handleNameChange}
        changeNumber={handleNumberChange}
        addPerson={addPerson}
        />
      <h2>Numbers</h2>
      <PersonsList persons={persons} filter={currentFilter}/>
    </div>
  )

}

export default App