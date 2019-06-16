import React, { Component } from 'react'
import { Treebeard } from 'react-treebeard'

import decorators from './decorators'
import apis from 'apis'
import FileUploader from './FileUploader'


class CloudStorage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fileTree: [],
      toggleSet: new Set(), // A set of filepaths
    }
  }

  componentDidMount() {
    const {groupId} = this.props
    setInterval(() => {
      apis.loadFileTree({groupId}).then(data => {
        const fileTree = data.data
        this.setState({fileTree})
      })
    }, 300)
  }

  onToggle = (node, toggled) => {
    const { toggleSet } = this.state
    const newToggleSet = new Set(toggleSet)
    const filepath = node.filepath
    if (toggled) newToggleSet.add(filepath)
    else newToggleSet.delete(filepath)
    this.setState({toggleSet: newToggleSet})
  }

  addToggleInfoToFileTree = (fileTree, toggleSet) => {
    const toggledFileTree = Object.assign({}, fileTree)
    this.addToggleInfoToFileTreeRecursive(fileTree, toggleSet)
    return toggledFileTree
  }

  addToggleInfoToFileTreeRecursive = (fileTree, toggleSet) => {
    for (let childIndex in fileTree) {
      const child = fileTree[childIndex]
      if (toggleSet.has(child.filepath))
        child.toggled = true
      if (child.children)
        this.addToggleInfoToFileTreeRecursive(child.children, toggleSet)
    }
  }

  assignIdArrayRecursive = array => {
    for (let childIndex in array) {
      const child = array[childIndex]
      child.id = child.filepath
      if (child.children)
        this.assignIdArrayRecursive(child.children)
    }
  }

  assignIdArray = array => {
    array = Object.assign([], array)
    this.assignIdArrayRecursive(array)
    return array
  }

  render() {
    const { fileTree, toggleSet } = this.state
    const { groupId } = this.props
    const idAssignedFileTree = this.assignIdArray(this.addToggleInfoToFileTree(fileTree, toggleSet))
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
