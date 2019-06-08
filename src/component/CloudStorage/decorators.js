import React from 'react'
import styled from 'styled-components'


const ToggleStyle = styled.div`
display: inline-block;
margin-left: 8px;
`

const Toggle = props => {
  const { isToggled } = props
  const length = 20
  const halfLength = length / 2
  const rotateAngle = isToggled ? '90' : '0'
  return (
      <ToggleStyle>
        <svg width={length} height={length}>
          <polygon
              points={`0 0,${length} ${halfLength},0 ${length}`}
              transform={`rotate(${rotateAngle},${halfLength},${halfLength})`}
          />
        </svg>
      </ToggleStyle>
  )
}

const HeaderStyle = styled.div`
display: inline-block;
font-size: 20px;
color: black;
margin-left: 8px;
`

const Header = props => <HeaderStyle>{props.node.name}</HeaderStyle>

const Container = props => {
  const isDirectory = !props.terminal
  const isToggled = props.node.toggled
  return (
      <ContainerStyle onClick={props.onClick}>
        {isDirectory
          && <props.decorators.Toggle isToggled={isToggled}/>}
        <props.decorators.Header node={props.node}/>
      </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
background-color: white;
padding: 6px;
border-bottom: 1px solid lightgray;
`

const decorators = {
  Container,
  Toggle,
  Header,
}

export default decorators