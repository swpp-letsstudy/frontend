import React, { Component } from 'react'
import queryString from 'query-string'
import {Link} from "react-router-dom";

class GroupDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { groups, location } = this.props
    const queryId = queryString.parse(location.search).id
    const group = groups.filter(group => group.id == queryId)[0]

    return group ?
        <Link to={`meeting-form?id=${group.id}`}>미팅 만들기</Link>
        : null
  }
}

export default GroupDetail
