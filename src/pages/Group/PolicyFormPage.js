import React from 'react'

import PolicyForm from 'component/Group/Policy/PolicyForm'

const PolicyFormPage = props => {
  const { groupId } = props.location.state
  const { history } = props
  return <PolicyForm groupId={groupId} history={history}/>
}

export default PolicyFormPage
