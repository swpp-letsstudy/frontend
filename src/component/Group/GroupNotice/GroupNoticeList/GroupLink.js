import { Link } from 'react-router-dom'

import styled from 'styled-components'

const GroupLink = styled(Link)`
	&&&{
    padding-bottom: 1rem;
    font-size: 1.5rem;
    color: black;
    margin: auto;
    display: flex;
    height: 2.5rem;
    width: 25rem;
    &:hover {
      color: #297fffc7;
    }
	}
`

export default GroupLink