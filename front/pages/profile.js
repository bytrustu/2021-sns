import React from 'react';
import HeadComponent from "../components/HeadComponent";
import AppLayout from "../components/AppLayout";

const Profile = () => {
    return (
        <AppLayout>
            <HeadComponent title="내 프로필 | Blog"/>
            <div>내 프로필</div>
        </AppLayout>
)
};

export default Profile;