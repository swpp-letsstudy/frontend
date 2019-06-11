import React from 'react'
import styled from 'styled-components'

const HeaderStyle = styled.div`
font-size: 20px;
margin-left: 8px;
margin-right: 8px;
`

const Header = props => <HeaderStyle>{props.node.name}</HeaderStyle>

export default Header