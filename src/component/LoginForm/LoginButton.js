import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const LoginButton = styled(Button)`
	&&&{
		text-align: center;
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
	}
`

export default LoginButton