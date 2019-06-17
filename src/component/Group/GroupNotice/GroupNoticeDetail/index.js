import React, { Component } from 'react'
import { connect } from 'react-redux'

import Link from './GroupLink'
import actionCreators from 'store/actions'

import routes from 'routes'
import apis from 'apis'

import { Button } from 'semantic-ui-react'
import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

import Div from './GroupNoticeDiv'
import Writer from './GroupNoticeWriter'

import Icon from 'component/Styles/Chevron'

class GroupNoticeDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notice: {},
    }
  }

  componentDidMount() {
    const { groupNoticeId, groupId } = this.props
    apis.readGroupNotice({ groupNoticeId, groupId })
      .then(response => {
        this.setState({
          notice: response.data,
        })
      })
  }

  deleteGroupNotice = () => {
    const { groupId, groupNoticeId, loadGroupNotices, history } = this.props
    apis.deleteGroupNotice({groupNoticeId, groupId})
    .then(loadGroupNotices({ groupId }))
    .then(history.push({
      pathname: routes.GROUP_NOTICE_LIST,
      state: { groupId },
    }))
  }

  render() {
    const { groupId } = this.props
    const { notice } = this.state
    return (
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={{
              pathname: routes.GROUP_NOTICE_LIST,
              state: { groupId },
            }}>GroupNoticeList
            </Link>
          </Icon>

          <Writer>
          Writer: {notice.writer && notice.writer.nickname}
          </Writer>
          <Title>Title</Title>
          <Div>{notice.title}</Div>
          <Title>Contents</Title>
          <Div>{notice.contents}</Div>
          <Button onClick={this.deleteGroupNotice}>
            삭제
          </Button>
        </Wrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  loadGroupNotices: payload => dispatch(actionCreators.loadGroupNotices(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupNoticeDetail)
