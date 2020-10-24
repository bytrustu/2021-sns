import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Menu, Input, Row, Col} from 'antd'

const AppLayout = ({children}) => {
    return (
        <div>
            <Menu mode={"horizontal"}>
                <Menu.Item>
                    <Link href="/">
                        <a>메인</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">
                        <a>프로필</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup">
                        <a>회원가입</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle'}}/>
                </Menu.Item>
            </Menu>
            <Row gutter={12}>
                <Col xs={24} md={6}>
                    왼쪽메뉴
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/bytrustu" target="_blank" rel="noreferrer noopener">made by bytrustu</a>
                </Col>
            </Row>
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;