import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import apis from 'apis'
import routes from 'routes'

class GroupNoticeList extends Component {
  constructor(props) {
    super(props)

    this.state = {
        notices: []
    }
  }

  componentDidMount() {
    const { groupId } = this.props
    apis.loadGroupNotices({ groupId })
    .then(response => {
        this.setState({
            notices: response.data,
        })
    })
  }

  render() {
    const { notices } = this.state
    const { groupId } = this.props
    return (
      <>
        {notices.map((notice, index) => (
          <Fragment key={notice.id}>
            <Link to={{
                pathname: routes.GROUP_NOTICE_DETAIL.replace(':id', notice.id),
                state: { groupId },
            }}>
            {notice.title}
            </Link>
            <br/>
          </Fragment>
        ))}
      </>
    )
  }
}

export default GroupNoticeList
