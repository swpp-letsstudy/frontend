import React, { Component, Fragment } from 'react'
import Link from './GroupLink'

import apis from 'apis'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

import Icon from 'component/Styles/Chevron'

class GroupNoticeList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notices: []
        }
    }

    componentDidMount() {
        const { groupId } = this.props
        apis.loadGroupNotices({ groupId })
            .then(response => {
                this.setState({
                    notices: response.data,
                })
            })
    }

    render() {
        const { notices } = this.state
        const { groupId } = this.props
        return (
            <>

                <Wrapper>
                    <Icon name='chevron left'>
                        <Link to={routes.GROUP_DETAIL.replace(':id', groupId)}>GroupDetail</Link>
                    </Icon>

                    <Title>
                        Group Notice List
                    </Title>
                    {notices.map((notice, index) => (
                        <Fragment key={notice.id}>
                            <Link to={{
                                pathname: routes.GROUP_NOTICE_DETAIL.replace(':id', notice.id),
                                state: { groupId },
                            }}>
                                {notice.title}
                            </Link>
                            <br />
                        </Fragment>
                    ))}
                </Wrapper>
            </>
        )
    }
}

export default GroupNoticeList
