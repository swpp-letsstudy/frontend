import React, { Component } from 'react'

import { Treebeard } from 'react-treebeard'

const data = [{
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'loading parent',
      loading: true,
      children: [],
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
}]


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
  return assignIdArrayRecursive(array, 0)
}

assignIdArray(data)

class CloudStorage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: data,
    }
  }

  onToggle = (node, toggled) => {
    const {cursor, data} = this.state;
    if (cursor) {
      this.setState(() => ({cursor, active: false}));
    }
    // node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({
      cursor: node,
      data: Object.assign([], data),
    });
  }

  render() {
    const { data } = this.state
    return (
        <Treebeard data={data} onToggle={this.onToggle}/>
    )
  }
}

export default CloudStorage
