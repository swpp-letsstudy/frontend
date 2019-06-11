import React from 'react'
import styled from 'styled-components'

import FileUploader from './FileUploader'
import DownloadButton from './DownloadButton'
import DeleteButton from './DeleteButton'


const ToggleStyle = styled.div`
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
font-size: 20px;
margin-left: 8px;
margin-right: 8px;
`

const Header = props => <HeaderStyle>{props.node.name}</HeaderStyle>

const Container = props => {
  const isDirectory = !props.terminal
  return isDirectory ? <DirectoryContainer{...props} /> : <FileContainer {...props}/>
}

const DirectoryContainer = props => {
  const isToggled = props.node.toggled
  const { groupId } = props.decorators.params
  const dirpath = props.node.filepath
  const { onClick } = props
  return (
      <ContainerStyle>
        <props.decorators.Toggle onClick={onClick} isToggled={isToggled}/>
        <props.decorators.Header node={props.node}/>
        <FileUploader groupId={groupId} dirpath={dirpath}/>
      </ContainerStyle>
  )
}

const FileContainer = props => {
  const { groupId } = props.decorators.params
  const filepath = props.node.filepath
  return (
      <ContainerStyle>
        <props.decorators.Header node={props.node}/>
        <DownloadButton groupId={groupId} filepath={filepath}/>
        {/*<RenameButton/>*/}
        <DeleteButton groupId={groupId} filepath={filepath}/>
      </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
background-color: white;
padding: 6px;
border-bottom: 1px solid lightgray;
color: black;
* { display: inline-block; }
`

const decorators = {
  Container,
  Toggle,
  Header,
}

export default decorators