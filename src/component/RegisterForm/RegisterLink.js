import { Link } from 'react-router-dom'

import styled from 'styled-components'

const RegisterLink = styled(Link)`
	&&&{
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: row-reverse;
    font-size: 1.2rem;
    color: $oc-blue-7;
    &:hover {
      color: #297fffc7;
    }
	}
`

export default RegisterLink