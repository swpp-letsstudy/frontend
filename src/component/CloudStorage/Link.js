import { Link } from 'react-router-dom'

import styled from 'styled-components'

const CloudLink = styled(Link)`
	&&&{
    color: black;
    margin: auto;
    &:hover {
      color: #297fffc7;
    }
	}
`

export default CloudLink