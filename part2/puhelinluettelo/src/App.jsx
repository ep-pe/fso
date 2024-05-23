import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, PersonForm, PersonsList } from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      updateNumber(persons.find(p => p.name === newName))
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      personService
      .add(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteSpecifiedPerson = person => {
    if (window.confirm(`Delete ${person.name} permanently?`)) {
      personService
      .deletePerson(person.id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
      .catch(error => {
        console.log(error)
        alert("Something went wrong with deleting a person")
      })
    }
  }

  const updateNumber = person => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      const changedPerson = {...person, number: newNumber}
      personService
      .updateNumber(changedPerson)
      .then(updatedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
      })
      .catch(error => {
        console.log(error)
        alert("Something went wrong with updating a number")
      })
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
        updateNumber={updateNumber}
        />
      <h2>Numbers</h2>
      <PersonsList 
        persons={persons}
        filter={currentFilter}
        deletePerson={deleteSpecifiedPerson}
      />
    </div>
  )

}

export default App