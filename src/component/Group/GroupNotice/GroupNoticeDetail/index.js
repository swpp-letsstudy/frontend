import React, { Component } from 'react'
import Link from './GroupLink'

import routes from 'routes'
import apis from 'apis'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

import Icon from 'component/Styles/Chevron'

class GroupNoticeDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notice: {},
        }
    }

    componentDidMount() {
        const { noticeId, groupId } = this.props
        apis.readGroupNotice({ noticeId, groupId })
            .then(response => {
                console.log(response)
                this.setState({
                    notice: response.data,
                })
            })
    }

    render() {
        const { groupId } = this.props
        const { notice } = this.state
        return (
            <>
                <Wrapper>
                    <Icon name='chevron left'>
                        <Link to={{
                            pathname: routes.GROUP_NOTICE_LIST,
                            state: { groupId },
                        }}>GroupNoticeList
                        </Link>
                    </Icon>

                    <Title>Title</Title>
                    <p>{notice.writer.username}</p>
                    <p>{notice.title}</p>
                    <Title>Contents</Title>
                    <p>{notice.contents}</p>
                </Wrapper>
            </>
        )
    }
}


export default GroupNoticeDetail
