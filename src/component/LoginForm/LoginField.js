
import { Field } from 'formik/dist/index'

import styled from 'styled-components'

const LoginField = styled(Field)`
margin-top: 0.75rem;
height: 2.5rem;
border: 1px solid $oc-gray-5;
border-radius: 8px;
outline: none;
font-size: 1.5rem;
padding: 0.25rem;
background: $oc-gray-5;
font-weight: 600;
flex: 1;
`

export default LoginField