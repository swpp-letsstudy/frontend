import React from 'react'
import { Icon } from 'semantic-ui-react'

const Toggle = props => {
  const { isToggled, onClick } = props
  return (
        isToggled
        ?
          <Icon onClick={onClick} name="angle right" />
        :
          <Icon onClick={onClick}name="angle down" />
  )
}


export default Toggle