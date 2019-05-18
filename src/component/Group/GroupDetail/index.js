import React, { Component } from 'react'
import queryString from 'query-string/index'
import { connect } from 'react-redux'

import Button from './MeetingCreateButton'
import Link from './GroupLink'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'
import { HOST } from 'config'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

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
    const { exitGroup, history } = this.props
    exitGroup({groupId: this.state.group.id}).then(() => {
      history.push(routes.GROUP_LIST)
    })
  }

  render() {
    const { group, meetings } = this.state
    return group &&
      <>
      <Wrapper>
        <Title>{group.name}</Title>
        <br />
        <div>URL: {`${HOST}join_group?token=${group.id}`}</div>
        <br />
        {meetings.map((meeting, index) =>
          <Link key={index} to={`${routes.MEETING_DETAIL.replace(':id', meeting.id)}`}>
            meeting time: {meeting.time}<br />
          </Link>
        )}
        <Link to={`${routes.MEETING_FORM}?${queryString.stringify({ groupId: group.id })}`}>
          미팅 만들기
        </Link>
        <Button onClick={this.exitGroup}>탈퇴</Button>
      </Wrapper>
      </>
  }
}

const mapStateToProps = state => ({ })

const mapDispatchToProps = dispatch => ({
  exitGroup: payload => dispatch(actionCreators.exitGroup(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
