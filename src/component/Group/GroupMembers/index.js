import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Icon from 'component/Styles/Chevron'

const GroupMembers = props => {
  const { groupId, members } = props
  return (
    <Wrapper>
      <Icon name='chevron left'>
        <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
          GroupList
        </Link>
      </Icon>
      <br />
      {members.map((member, index) => (
        <Fragment key={member}>
          {member}
          <br />
        </Fragment>
      ))}
    </Wrapper>
  )
}

export default GroupMembers