import React, { Component } from 'react'
import queryString from 'query-string'
import {Link} from "react-router-dom";
import {_loadMeetings, _readGroup} from "../store/actions"

class GroupDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: null,
      meetings: [],
    }
  }

  componentDidMount() {
    const { location } = this.props
    const groupId = queryString.parse(location.search).id
    _readGroup({ groupId }).then(value => this.setState({
      group: value.data
    }))

    _loadMeetings({ groupId }).then(value => this.setState({
      meetings: value.data,
    }))
  }

  render() {
    const { group, meetings } = this.state
    console.log(meetings)

    return group &&
        <>
          <div>{group.name}</div>
          {meetings.map((meeting, index) => <div key={index}>meeting time: {meeting.time}</div>)}
          {group && <Link to={`meeting-form?id=${group.id}`}>미팅 만들기</Link>}
        </>
  }
}

export default GroupDetail
