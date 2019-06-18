import React from 'react'

import RegisterForm from 'component/RegisterForm'

const RegisterFormPage = props => {
  const { history } = props
  return <RegisterForm history={history}/>
}

export default RegisterFormPage
