import React from 'react'
import { Formik, Field, Form } from "formik";

const ChattingWindow = props => {
  const {messages, onSendMessage} = props
  return (
      <div>
        {messages.map(({message, username}, index) =>
            <div key={index}>{username}: {message}</div>)}
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
      </div>
  )
}

export default ChattingWindow