import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

import apis from 'apis'


class DeleteButton extends Component {

  deleteFile = () => {
    const { groupId, filepath } = this.props
    apis.deleteFile({ groupId, filepath })
  }

  render() {
    return <Icon name='trash alternate' onClick={this.deleteFile}/>
  }
}

export default DeleteButton