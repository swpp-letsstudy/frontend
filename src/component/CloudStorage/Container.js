import React from 'react'
import styled from 'styled-components'

import FileUploader from './FileUploader'
import DownloadButton from './DownloadButton'
import DeleteButton from './DeleteButton'


const Container = props => {
  const isDirectory = !props.terminal
  return isDirectory ? <DirectoryContainer {...props} /> : <FileContainer {...props}/>
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
        <br/>
        <FileUploader groupId={groupId} dirpath={dirpath}/>
      </ContainerStyle>
  )
}

const FileContainer = props => {
  const { groupId } = props.decorators.params
  const filepath = props.node.filepath
  return (
      <ContainerStyle>
        <div>
        <props.decorators.Header node={props.node}/>
        </div>
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

export default Container