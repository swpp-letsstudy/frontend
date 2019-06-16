import React from 'react'
import styled from 'styled-components'


const Toggle = props => {
  const { isToggled, onClick } = props
  const length = 20
  const halfLength = length / 2
  const rotateAngle = isToggled ? '90' : '0'
  return (
      <ToggleStyle onClick={onClick}>
        <svg width={length} height={length}>
          <polygon
              points={`0 0,${length} ${halfLength},0 ${length}`}
              transform={`rotate(${rotateAngle},${halfLength},${halfLength})`}
          />
        </svg>
      </ToggleStyle>
  )
}

const ToggleStyle = styled.div`
margin-left: 8px;
`

export default Toggle