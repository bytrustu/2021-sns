import React, {useCallback, useState} from 'react';
import AppLayout from "../components/AppLayout";
import HeadComponent from "../components/HeadComponent";
import {Form, Input, Checkbox, Button} from "antd";
import styled from 'styled-components';
import useInput from "../hooks/useInput";

const Signup = () => {

    const ErrorMessage = styled.div`
        color: red;
    `;

    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onPassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    const onSubmit = useCallback((e) => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
    }, [password, passwordCheck, term]);

    return (
            <AppLayout>
                <HeadComponent title="회원가입 | Blog"/>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user-id">아이디</label>
                        <br />
                        <Input name="user-id" value={id} required onChange={onChangeId}/>
                    </div>
                    <div>
                        <label htmlFor="user-nickname">닉네임</label>
                        <br />
                        <Input name="user-nickname" value={nickname} required onChange={onChangeNickname}/>
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br />
                        <Input name="user-password" value={password} required onChange={onPassword}/>
                    </div>
                    <div>
                        <label htmlFor="user-passwordCheck">비밀번호체크</label>
                        <br />
                        <Input name="user-passwordCheck" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>"bytrustu" 말을 잘 들을 것을 동의합니다.</Checkbox>
                        {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>

                </Form>
            </AppLayout>
    )
};

export default Signup;