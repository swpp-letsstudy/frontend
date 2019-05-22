import React from 'react'
import { Formik, Field, Form } from "formik";
import styled from 'styled-components'

import Messages from './Messages'

import Button from './MessageSendButton'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

const ChattingWindow = props => {
  const {messages, onSendMessage} = props
  return (
    
    <Wrapper>
      <Title>Chatting</Title>
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
                  <Button type='submit'>보내기</Button>
                </Form>
            }
        />
      </Window>
      </Wrapper>
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
