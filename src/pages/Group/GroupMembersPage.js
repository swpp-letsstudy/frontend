import React from 'react'

import GroupMembers from 'component/Group/GroupMembers'

const GroupMembersPage = props => {
  const { members, groupId } = props.location.state
  return <GroupMembers members={members} groupId={groupId} />
}

export default GroupMembersPage
