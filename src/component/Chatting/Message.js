import React from 'react'

const Message = props => {
  const { nickname, message } = props
  return <div style={{margin:"0.5rem", textDecoration:"box"}}>
    <div style={{marginLeft:"0.5rem", fontSize:"1rem", fontWeight:"bolder", textDecoration:"underline"}}>
    {nickname}
    </div>

    <div style={{marginLeft:"0.5rem", fontSize:"1.3rem"}}>
    {message}
    </div>
  </div>
  
}


export default Message