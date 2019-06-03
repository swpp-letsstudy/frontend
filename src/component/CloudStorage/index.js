import React, { Component } from 'react'
import { Treebeard } from 'react-treebeard'

import decorators from './decorators'
import apis from 'apis'


const assignIdArrayRecursive = (array, lastId) => {
  const assignedArray = Object.assign([], array)
  for (let childIndex in assignedArray) {
    const child = assignedArray[childIndex]
    child.id = ++lastId
    if (child.children)
      lastId = assignIdArrayRecursive(child.children, lastId).lastId
  }
  return { assignedArray, lastId }
}

const assignIdArray = array => {
  return assignIdArrayRecursive(array, 0).assignedArray
}

class CloudStorage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fileTree: [],
    }
  }

  componentDidMount() {
    const { groupId } = this.props
    apis.loadFileTree({ groupId }).then(data => this.setState({
      fileTree: data.data,
    }))
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
    const idAssignedFileTree = assignIdArray(fileTree)
    return (
        // Style Treebeard with decorators
        <Treebeard data={idAssignedFileTree} onToggle={this.onToggle} decorator={decorators}/>
    )
  }
}

export default CloudStorage
