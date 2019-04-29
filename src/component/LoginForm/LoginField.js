import { Field } from 'formik/dist/index'

import styled from 'styled-components'

const LoginField = styled(Field)`
height: 2.5rem;
border: 1px solid $oc-gray-5;
border-radius: 8px;

margin: auto;
outline: none;

font-size: 1.5rem;


background: $oc-gray-5;

color: white;
font-weight: 600;
`

export default LoginField