import React from 'react'
import { Icon } from 'semantic-ui-react'

const Toggle = props => {
  const { isToggled, onClick } = props
  return (
        isToggled
        ?
          <div style={{fontSize:"1.5rem"}}>
            <Icon onClick={onClick} name="angle right" />
          </div>
          :
          <div style={{fontSize:"1.5rem"}}>
            <Icon onClick={onClick}name="angle down" />
          </div>
  )
}


export default Toggle