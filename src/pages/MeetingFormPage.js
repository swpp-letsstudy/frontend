import React from 'react'

import MeetingForm from 'component/Meeting/MeetingForm'

const MeetingFormPage = props => {
  const { groupId } = props.location.state
  return (
    <div>
      <MeetingForm groupId={groupId} history = {props.history} />
    </div>
  )
}

export default MeetingFormPage