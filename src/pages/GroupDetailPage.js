import React from 'react'

import GroupDetail from 'component/Group/GroupDetail'

const GroupDetailPage = props => (
  <div>
    <GroupDetail match = {props.match}/>
  </div>
)

export default GroupDetailPage