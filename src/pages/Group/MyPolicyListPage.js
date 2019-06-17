import React from 'react'

import MyPolicyList from 'component/Group/Policy/MyPolicyList'

const MyPolicyListPage = props => {
  const { groupId } = props.location.state
  return <MyPolicyList groupId={groupId}/>
}

export default MyPolicyListPage
