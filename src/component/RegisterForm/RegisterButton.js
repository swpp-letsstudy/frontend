import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const RegisterButton = styled(Button)`
	&&&{
		width: 25rem;
		font-size: 2rem;
		color: white;
		padding: 0.5rem;
		border-radius: 8px;
		background: #72d2ff;
		&:hover {
			background: #297fffc7;
			color: white;
		}
		&:active {
			background: #197fffc7;
			color: white;
    }
	}
`

export default RegisterButton

