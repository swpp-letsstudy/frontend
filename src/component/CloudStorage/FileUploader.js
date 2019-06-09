import React, { Component } from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'

import apis from 'apis'


class FileUploader extends Component {

  uploadFile = file => {
    const {groupId} = this.props
    apis.fetchUploadUrl({
      filepath: file.name,
      groupId: groupId,
    }).then(data => {
      const uploadUrl = data.data
      const authorization = axios.defaults.headers.common["Authorization"]
      delete axios.defaults.headers.common["Authorization"]
      axios.put(uploadUrl, file)
      axios.defaults.headers.common['Authorization'] = authorization
    })
  }

  render() {
    return (
        <Formik
            onSubmit={(values, formActions) => {
              const {file} = values
              this.uploadFile(file)
            }}
            render={({setFieldValue}) =>
                <Form>
                  <input type='file' name='file'
                      onChange={event =>
                          setFieldValue('file', event.currentTarget.files[0])}/>
                  <button type='submit'>Submit</button>
                </Form>
            }
        />
    )
  }
}

export default FileUploader
