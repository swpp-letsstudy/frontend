import React, { Fragment } from 'react'

import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Icon from 'component/Styles/Chevron'
import Title from 'component/Styles/Title'

import Link from 'component/Styles/Link'

const GroupMembers = props => {
  const { groupId, members } = props
  return (
    <Wrapper>
      <Icon name='chevron left'>
        <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
          GroupList
        </Link>
      </Icon>
      <Title>Members</Title>
      <hr />
      {members.map((member, index) => (
        <Fragment key={member}>
          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
          {member}
          </div>
          
        </Fragment>
      ))}
    </Wrapper>
  )
}

export default GroupMembers