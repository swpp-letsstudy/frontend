import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import GroupItem from 'component/GroupItem'

const GroupList = props => {
  console.log('aa', props.groups)
  return (
    <>
      {props.groups && props.groups.map((group, index) => (
        <GroupItem key={index} group={group.name} />
      ))}
      <Link to='group-form/'>그룹 생성</Link>
    </>
  )
}

export default GroupList
