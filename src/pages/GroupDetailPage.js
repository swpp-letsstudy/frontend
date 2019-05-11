import React from 'react'

import GroupDetail from 'component/Group/GroupDetail'

const GroupDetailPage = props => (
  <div>
    <GroupDetail match={props.match} history={props.history}/>
  </div>
)

export default GroupDetailPage
