import React from 'react'

import PolicyList from 'component/Group/Policy/PolicyList'

const PolicyListPage = props => {
  const { groupId } = props.location.state
  return <PolicyList groupId={groupId}/>
}

export default PolicyListPage
