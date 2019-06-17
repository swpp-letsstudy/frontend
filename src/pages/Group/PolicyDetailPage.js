import React from 'react'

import PolicyDetail from 'component/Group/Policy/PolicyDetail'

const PolicyDetailPage = props => {
  const { history } = props
  const { policyId } = props.match.params
  const { groupId } = props.location.state
  return <PolicyDetail policyId={policyId} groupId={groupId} history={history}/>
}

export default PolicyDetailPage
