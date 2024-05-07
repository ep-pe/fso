const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1}
                part2={part2} exercises2={exercises2}
                  part3={part3} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {
  return (
    <>
      <Part name={props.part1} length={props.exercises1} />
      <Part name={props.part2} length={props.exercises2} />
      <Part name={props.part3} length={props.exercises3} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.length}
      </p>
    </>
  )
}

const Total = (props) => (
  <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
)


export default App