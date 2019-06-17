import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import apis from 'apis'
import routes from 'routes'

class MyMeetingFineList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fines: [],
      policies: [],
    }
  }

  componentDidMount() {
    const { meetingId, groupId } = this.props
    apis.loadMeetingFines({ meetingId })
    .then(value => this.setState({
      fines: value.date,
    }))
    apis.loadPolicies({ groupId })
    .then(value => console.log(value))
  }

  render() {
    const { meetingId } = this.props
    const { fines, policies } = this.state
    console.log(fines)
    return (
      <>
        <Link to={routes.MEETING_DETAIL.replace(':meetingId', meetingId)}>
          MeetingDetail
        </Link>
        {fines ? fines.map((fine, index) => (
          <Fragment key={fine.id}>
            <h1></h1>
          </Fragment>
        )): <h1>No Fine</h1> }
      </>
    )
  }
}

export default MyMeetingFineList
