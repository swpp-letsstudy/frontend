import React from 'react'

import CloudStorage from 'component/CloudStorage'

const CloudStoragePage = props => {
  const { match } = props
  const groupId = match.params.groupId
  return <CloudStorage groupId={groupId}/>
}

export default CloudStoragePage
