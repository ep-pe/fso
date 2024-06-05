const Notification = ({ message, success }) => {
    if (message === null) {
      return null
    }
    const style = {
        color: 'red',
        background: 'lightgrey',
        fontWize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    if(success) {
        style.color = 'green'
    }
  
    return (
      <div style={style}>
        {message}
      </div>
    )
  }

  export default Notification