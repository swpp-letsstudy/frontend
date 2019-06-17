import React from 'react'

import GroupSetting from 'component/Group/GroupSetting'

const GroupSettingPage = props => {
  const { history } = props
  const { groupId } = props.location.state
  return <GroupSetting groupId={groupId} history={history}/>
}

export default GroupSettingPage
