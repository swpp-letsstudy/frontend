import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const MeetingCreateButton = styled(Button)`
	&&&{
		width: 8.05rem;
		height: 3rem;
		font-size: 1rem;
		color: white;
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

export default MeetingCreateButton

