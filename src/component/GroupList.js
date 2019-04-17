import React from 'react'
import GroupItem from 'component/GroupItem'

const GroupList = props => {
  console.log('aa', props.groups)
  return (
    <>
      {props.groups && props.groups.map((group, index) => (
        <GroupItem key={index} group={group} />
      ))}
    </>
  )
}

export default GroupList
