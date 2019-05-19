import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const GroupEnrollButton = styled(Button)`
	&&&{
		width: 5rem;
		height: 3rem;
		text-align: center;
		color: white;
		font-size: 1rem;
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

export default GroupEnrollButton

