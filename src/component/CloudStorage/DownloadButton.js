import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

import apis from 'apis'


class DownloadButton extends Component {

  downloadFile = () => {
    const { groupId, filepath } = this.props
    apis.fetchGetUrl({ groupId, filepath }).then(data => {
      window.open(data.data, '_blank')
    })
  }

  render() {
    return <Icon name='download' onClick={this.downloadFile}/>
  }
}

export default DownloadButton