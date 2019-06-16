import { Field } from 'formik/dist/index'
import styled from 'styled-components'
import "styles/utils.scss"

const LoginField = styled(Field)`
border-radius: 8px;
outline: none;
padding: 0.5rem;
font-size: 1.5rem;
font-weight: 400;
width: 25rem;
margin-bottom: 2rem;
`

export default LoginField

