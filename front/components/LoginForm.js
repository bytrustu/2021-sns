import React, {useCallback, useState, useMemo} from 'react';
import {Button, Form, Input} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const FormWarpper = styled(Form)`
    padding: 10px;
`

const LoginForm = ({setIsLoggedIn}) => {
    const [form, setForm] = useState({
        id: '',
        password: ''
    });
    const onChange = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }, [form]);

    const {id, password} = form;

    const onSubmitForm = useCallback((e) => {
        setIsLoggedIn(true);
    }, [id, password]);

    return (
        <FormWarpper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input type="text" name="id" value={id} onChange={onChange} required/>
            </div>

            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input type="password" name="password" value={password} onChange={onChange} required/>
            </div>

            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWarpper>
    )
}

export default LoginForm;