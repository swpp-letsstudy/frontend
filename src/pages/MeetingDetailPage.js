import React from 'react'

import MeetingDetail from 'component/Meeting/MeetingDetail'

const MeetingDetailPage = props => (
  <div>
    <MeetingDetail match = {props.match}/>
  </div>
)

export default MeetingDetailPage