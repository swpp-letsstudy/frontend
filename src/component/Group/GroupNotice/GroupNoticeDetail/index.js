import React, { Component } from 'react'
import Link from './GroupLink'

import routes from 'routes'
import apis from 'apis'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

import Div from './GroupNoticeDiv'
import Writer from './GroupNoticeWriter'

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

                    <Writer>
                    Writer: {notice.writer && notice.writer.username}
                    </Writer>
                    <Title>Title</Title>
                    <Div>{notice.title}</Div>
                    <Title>Contents</Title>
                    <Div>{notice.contents}</Div>
                </Wrapper>
            </>
        )
    }
}


export default GroupNoticeDetail
