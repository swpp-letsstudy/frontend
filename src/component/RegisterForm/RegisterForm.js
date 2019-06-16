import { Form } from 'formik/dist/index'

import styled from 'styled-components'

const RegisterForm = styled(Form)`
	&&&{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 1rem;
	}
`

export default RegisterForm