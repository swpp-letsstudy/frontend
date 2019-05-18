import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const MeetingFormButton = styled(Button)`
	&&&{
		width: 25rem;
		height: 4rem;
		font-size: 1.5rem;
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

export default MeetingFormButton

