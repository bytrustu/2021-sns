import React from 'react';
import AppLayout from "../components/AppLayout";
import HeadComponent from "../components/HeadComponent";

const Home = () => {
    return (
        <>
            <HeadComponent title="메인 | Blog"/>
            <AppLayout>
                <div>Hello, Next!</div>
            </AppLayout>
        </>
    )
}

export default Home;