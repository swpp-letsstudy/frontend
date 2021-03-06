import React, { Component } from 'react'
import { connect } from 'react-redux'

import actionCreators from 'store/actions'

import routes from 'routes'
import apis from 'apis'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'

import Writer from './GroupNoticeWriter'

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
    const { groupId, groupNoticeId, loadFewGroupNotices, history } = this.props
    apis.deleteGroupNotice({groupNoticeId, groupId})
    .then(loadFewGroupNotices({ groupId, num: 0 }))
    .then(history.push({
      pathname: routes.GROUP_NOTICE_LIST,
      state: { groupId },
    }))
  }

  render() {
    const { groupId, backurl } = this.props
    const { notice } = this.state
    return (
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={{
              pathname: backurl,
              state: { groupId },
            }}>
              {backurl===routes.GROUP_NOTICE_LIST ?
              'GroupNoticeList' :
              'GroupDetail'}
            </Link>
          </Icon>

          <div style={{textAlign: 'right'}}>
          <Icon name='trash alternate outline' onClick={this.deleteGroupNotice} style={{fontSize: '1.5rem'}}/>
          </div>

          <Title style={{marginTop: "0rem"}}>{notice.title}</Title>
          
          <Writer>
          Writer: {notice.writer && notice.writer.nickname}
          </Writer>

          <hr />

          <div
            style={{fontSize: "1.2rem"}}
          >{notice.contents}</div>
        </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  backurl: state.groupReducer.backurl,
})

const mapDispatchToProps = dispatch => ({
  loadFewGroupNotices: payload => dispatch(actionCreators.loadFewGroupNotices(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupNoticeDetail)
