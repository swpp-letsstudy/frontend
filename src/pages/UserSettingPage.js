import React from 'react'
import UserSetting from 'component/UserSetting'

const UserSettingPage = props => {
  const { history } = props
  return <UserSetting history={history}/>
}

export default UserSettingPage
