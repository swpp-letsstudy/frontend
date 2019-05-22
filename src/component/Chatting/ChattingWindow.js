import React from 'react'
import { Formik, Field, Form } from "formik";
import styled from 'styled-components'

import Messages from './Messages'


const ChattingWindow = props => {
  const {messages, onSendMessage} = props
  return (
      <Window>
        <Messages messages={messages} />
        <Formik
            initialValues={{ message: '' }}
            onSubmit={(values, formActions) => {
              const { message } = values
              onSendMessage(message)
              formActions.setFieldValue('message', '')
            }}
            render={() =>
                <Form>
                  <Field name='message'/>
                  <button type='submit'>보내기</button>
                </Form>
            }
        />
      </Window>
  )
}

const Window = styled.div`
height: 500px;
border: 1px solid black;
font-size: 20px;
display: flex;
justify-content: space-between;
flex-direction: column;
`

export default ChattingWindow
