import React, { Component } from 'react'
import { Treebeard } from 'react-treebeard'

import decorators from './decorators'
import apis from 'apis'
import FileUploader from './FileUploader'


const assignIdArrayRecursive = (array, lastId) => {
  for (let childIndex in array) {
    const child = array[childIndex]
    child.id = ++lastId
    if (child.children)
      lastId = assignIdArrayRecursive(child.children, lastId)
  }
  return lastId
}

const assignIdArray = array => {
  array = Object.assign([], array)
  assignIdArrayRecursive(array, 0)
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

  toggleDirectory = (node, toggled) => {
    const {fileTree} = this.state
    if (node.children)
      node.toggled = toggled
    this.setState({
      fileTree: Object.assign([], fileTree),
    })
  }

  downloadFile = node => {
    const { groupId } = this.props
    apis.fetchGetUrl({
      filepath: node.filepath,
      groupId
    }).then(data => window.location.href = data.data)
  }

  onToggle = (node, toggled) => {
    if (node.children)
      this.toggleDirectory(node, toggled)
    else
      this.downloadFile(node)
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
