import React, { Component } from 'react'

const tree = {
  first: {
    first_first: null,
    first_second: {
      first_second_first: null,
    },
  },
  second: {
    second_first: null,
    second_second: null,
  },
  third: {
    third_first: null,
    third_second: {
      third_second_first: null,
      third_second_second: null,
    }
  }
}

class CloudStorage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tree: tree,
    }
  }

  render() {
    return <div></div>
  }
}

export default CloudStorage
