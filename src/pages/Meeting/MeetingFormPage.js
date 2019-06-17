import React from 'react'

import MeetingForm from 'component/Meeting/MeetingForm'

const MeetingFormPage = props => {
  const { groupId } = props.location.state
  const { history } = props
  return (
    <div>
      <MeetingForm groupId={groupId} history={history} />
    </div>
  )
}

export default MeetingFormPage