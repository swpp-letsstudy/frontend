import React, { Component } from 'react'
import queryString from 'query-string/index'
import { connect } from 'react-redux'

import Button from './MeetingCreateButton'
import Link from './GroupLink'
import Div from './GroupDivDetail'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'
import { HOST } from 'config'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

class GroupDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: null,
    }
  }

  componentDidMount() {
    const { match, loadMeetings } = this.props
    const groupId = match.params.id
    apis.readGroup({ groupId }).then(value => this.setState({
      group: value.data
    }))
    loadMeetings({ groupId }).then(value => this.setState({
      meetings: value.data,
    }))
  }

  exitGroup = () => {
    apis.exitGroup({ groupId: this.state.group.id }).then(() => {
      this.props.history.push(routes.GROUP_LIST)
    })
  }

  render() {
    const { group } = this.state
    const { meetings } = this.props
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
            <Link to={`/chatting/${group.id}`} style={{ color: "white" }}>
              채팅하기
            </Link>
          </Button>
          <Button>
            <Link to={`${routes.MEETING_FORM}?${queryString.stringify({ groupId: group.id })}`} style={{ color: "white" }}>
              미팅만들기
            </Link>
          </Button>
          <Button onClick={this.exitGroup}>탈퇴</Button>
          <Button>
            <Link to={{
              pathname: routes.GROUP_NOTICE_LIST,
              state: { groupId: group.id },
            }}
            style={{ color: "white" }}>그룹 공지
            </Link>
          </Button>
        </Wrapper>
      </>
  }
}

const mapStateToProps = state => ({
  meetings: state.groupReducer.meetings,
})

const mapDispatchToProps = dispatch => ({
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
