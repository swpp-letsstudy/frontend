import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const Chevron = styled(Icon)`
&&&{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    display: flex;
    font-size: 1.5rem;
    color: $oc-blue-7;
    &:hover {
      color: #297fffc7;
    }
	}
`

export default Chevron