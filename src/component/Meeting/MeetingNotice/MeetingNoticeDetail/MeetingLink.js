import { Link } from 'react-router-dom'

import styled from 'styled-components'

const MeetingLink = styled(Link)`
	&&&{
    color: black;
    margin: auto;
    &:hover {
      color: #297fffc7;
    }
	}
`

export default MeetingLink