import React, { Component } from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { Input, Button } from 'semantic-ui-react'
import styled from 'styled-components'

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
                  <Form>
                    <ContainerStyle>
                      <FileInput id={inputId} type='file' name='file'
                           style={{display: 'hidden'}}
                           onChange={event =>
                               setFieldValue('file', event.currentTarget.files[0])}/>
                      <Button
                        basic
                        style={{width: "5rem"}}
                        type='submit'>
                        저장
                      </Button>
                    </ContainerStyle>
                  </Form>
              )
            }}
        />
    )
  }
}

const FileInput = styled(Input)`
height: 3rem;
width: 15rem;
color: black;
`

const ContainerStyle = styled.div`
background-color: white;
border-bottom: 1px solid lightgray;
color: black;
* { display: inline-block; }
`

export default FileUploader
