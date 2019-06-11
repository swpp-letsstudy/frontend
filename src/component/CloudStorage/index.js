import React, { Component } from 'react'
import { Treebeard } from 'react-treebeard'

import decorators from './decorators'
import apis from 'apis'
import FileUploader from './FileUploader'


const assignIdArrayRecursive = array => {
  for (let childIndex in array) {
    const child = array[childIndex]
    child.id = child.filepath
    if (child.children)
      assignIdArrayRecursive(child.children)
  }
}

const assignIdArray = array => {
  array = Object.assign([], array)
  assignIdArrayRecursive(array)
  return array
}

class CloudStorage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fileTree: [],
    }
  }

  componentDidMount() {
    const {groupId} = this.props
    setInterval(() => {
      apis.loadFileTree({groupId}).then(data => {
        this.setState({fileTree: data.data})
      })
    }, 1000)
  }

  onToggle = (node, toggled) => {
    // fileTree contains node
    const {fileTree} = this.state
    node.toggled = toggled
    this.setState({
      fileTree: Object.assign([], fileTree),
    })
  }

  render() {
    const { fileTree } = this.state
    const { groupId } = this.props
    const idAssignedFileTree = assignIdArray(fileTree)
    return (
        // Style Treebeard with decorators
        <>
          <FileUploader groupId={groupId} dirpath=''/>
          <Treebeard
              groupId={groupId}
              data={idAssignedFileTree}
              onToggle={this.onToggle}
              decorators={{
                ...decorators,
                params: {groupId},
              }}
          />
        </>
    )
  }
}

Treebeard.defaultProps.style.tree.base.backgroundColor = 'white'

export default CloudStorage
