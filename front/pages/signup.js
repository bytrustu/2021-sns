import React from 'react';
import AppLayout from "../components/AppLayout";
import HeadComponent from "../components/HeadComponent";

const Signup = () => {
    return (
        <>
            <HeadComponent title="회원가입 | Blog"/>
            <AppLayout>
                <div>회원가입</div>
            </AppLayout>
        </>
    )
};

export default Signup;