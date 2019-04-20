import React, { Component } from 'react'
import queryString from 'query-string'

class GroupDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { groups, location } = this.props
    const queryId = queryString.parse(location.search).id
    const group = groups.filter(group => group.id == queryId)[0]

    return (
        <>
          {group && <div>{group.name}</div>}
        </>
    )
  }
}

export default GroupDetail
