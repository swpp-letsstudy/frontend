import React, { Component } from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { Input, Button } from 'semantic-ui-react'

import apis from 'apis'


class FileUploader extends Component {

  uploadFile = file => {
    const { groupId, dirpath } = this.props
    apis.fetchUploadUrl({
      filepath: `${dirpath}${file.name}`,
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
            render={({setFieldValue}) => {
              const inputId = 'file'
              return (
                  <Form 
                    style={{width: '25rem'}}
                  >
                    <div>
                      <Input id={inputId} type='file' name='file'
                           style={{display: 'hidden', width:'70%'}}
                           onChange={event =>
                               setFieldValue('file', event.currentTarget.files[0])}/>
                      <Button 
                        style={{width: '25%'}}
                        type='submit'>
                      
                        Submit
                      </Button>
                    </div>
                  </Form>
              )
            }}
        />
    )
  }
}

export default FileUploader
