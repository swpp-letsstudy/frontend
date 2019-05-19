import React, { Component } from 'react'
import queryString from 'query-string/index'

import Button from './MeetingCreateButton'
import Link from './GroupLink'
import Div from './GroupDivDetail'

import apis from 'apis'
import routes from 'routes'
import { HOST } from 'config'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

import { withRouter } from 'react-router-dom'

class GroupDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: null,
      meetings: [],
    }
  }

  componentDidMount() {
    const { match } = this.props
    const groupId = match.params.id
    apis.readGroup({ groupId }).then(value => this.setState({
      group: value.data
    }))
    apis.loadMeetings({ groupId }).then(value => this.setState({
      meetings: value.data,
    }))
  }

  exitGroup = () => {
    apis.exitGroup({ groupId: this.state.group.id }).then(() => {

      this.props.history.push(routes.GROUP_LIST)
    })
  }

  render() {
    const { group, meetings } = this.state
    return group &&
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={`/groups`}>
              GroupList
            </Link>
          </Icon>
          <Title>{group.name}</Title>

          {meetings.map((meeting, index) =>
            <Div key={meeting.id}>
              <Link to={`${routes.MEETING_DETAIL.replace(':id', meeting.id)}`}>
                meeting time: {meeting.time}<br />
              </Link>
            </Div>
          )}
          <br />
          <div style={{ fontSize: "1rem" }}>{`${HOST}join_group/?token=${group.id}`}</div>
          <br />
          <Button>
            <Link to={`${routes.MEETING_FORM}?${queryString.stringify({ groupId: group.id })}`} style={{ color: "white" }}>
              미팅 만들기
            </Link>
          </Button>
          <Button onClick={this.exitGroup}>탈퇴</Button>
        </Wrapper>
      </>
  }
}

export default withRouter(GroupDetail)
