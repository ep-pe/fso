const Course = ({ course }) => {
    const Header = (props) => {
        return (
            <h2>{props.course.name}</h2>
        )
    }

    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
  }

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </>
    )
}

const Part = ({ part }) => {
    return (
        <>
            <p>
            {part.name} {part.exercises}
            </p>
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce( (sum, part) => {
        console.log('what is happening', sum, part.exercises)
        return sum + part.exercises
    }, 0)
    return (
        <p style={{fontWeight: "bold"}}>Total of {total} exercises</p>
    )
}

export default Course