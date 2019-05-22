import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const MeetingCreateButton = styled(Button)`
	&&&{
		width: 6rem;
		height: 3rem;
		text-align: center;
		color: white;
		font-size: 0.7rem;
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

