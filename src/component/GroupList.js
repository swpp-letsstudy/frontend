import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'

const GroupList = props => {
  console.log('aa', props.groups)
  return (
    <>
      {props.groups.map((group, index) => (
          <Fragment key={index}>
            <Link to={`group-detail?id=${group.id}`}>{group.name}</Link>
            <br />
          </Fragment>
      ))}
      <Link to='group-form/'>그룹 생성</Link>
    </>
  )
}

export default GroupList
