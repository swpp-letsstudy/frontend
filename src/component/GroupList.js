import React from 'react'
import GroupItem from './GroupItem'

const GroupList = props => {
  console.log(props)
  return (
    <>
      {props.groups.map((group, index) => (
        <GroupItem key={index} group={group} />
      ))}
    </>
  )
}

export default GroupList
