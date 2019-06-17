import React from 'react'

import RegisterForm from 'component/RegisterForm'

const RegisterPage = props => {
  const { history } = props
  return <RegisterForm history={history}/>
}

export default RegisterPage
