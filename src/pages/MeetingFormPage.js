import React from 'react'

import MeetingForm from 'component/Meeting/MeetingForm'

const MeetingFormPage = props => (
  <div>
    <MeetingForm location = {props.location} history = {props.history}/>
  </div>
)

export default MeetingFormPage