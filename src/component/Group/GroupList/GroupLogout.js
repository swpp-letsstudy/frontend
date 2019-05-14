import { Button } from 'semantic-ui-react'

import styled from 'styled-components'

const GroupLogout = styled(Button)`
	&&&{
		margin-top: 2rem;
		width: 25rem;
		height: 3rem;
		font-size: 1.5rem;
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

export default GroupLogout