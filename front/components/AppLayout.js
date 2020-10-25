import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Menu, Input, Row, Col} from 'antd'
import styled from 'styled-components';
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import {useSelector} from "react-redux";

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`

const AppLayout = ({children}) => {
    const {isLogginedIn} = useSelector((state) => state.user);

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
                    <SearchInput enterButton style={{verticalAlign: 'middle'}}/>
                </Menu.Item>
            </Menu>
            <Row gutter={12}>
                <Col xs={24} md={6}>
                    {isLogginedIn ? <UserProfile/> : <LoginForm/>}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/bytrustu" target="_blank" rel="noreferrer noopener">우측배너</a>
                </Col>
            </Row>
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;