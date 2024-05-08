import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad==0) {
    return (
      <div>
        <h1>Feedback statistics</h1>
        No feedback given.
      </div>
    )
  }
  
  return (
    <div>
      <h1>Feedback statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/>
          <StatisticLine text="All" value={good+neutral+bad}/>
          <StatisticLine text="Average" value={((good-bad)/(good+neutral+bad)).toFixed(1)}/>
          <StatisticLine text="Positive" value={(100*good/(good+neutral+bad)).toFixed(1)} unit={"%"}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value, unit}) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value} {unit}</td>
    </tr>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)


  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App