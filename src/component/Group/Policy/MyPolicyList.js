import React from 'react'
import { Link } from 'react-router-dom'

import routes from 'routes'

const MyPolicyForm = props => {
  const { groupId } = props
  return (
    <>
      <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
        GroupDetail
      </Link>
      <div>MyPolicyForm</div>
    </>
  )
}

export default MyPolicyForm
