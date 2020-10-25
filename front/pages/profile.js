import React from 'react';
import HeadComponent from "../components/HeadComponent";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
    const followingList = [{nickname: 'bytrustu'},{nickname: 'bytrustu2'},{nickname: 'bytrustu3'}];
    const followerList = [{nickname: 'bytrustu'},{nickname: 'bytrustu2'},{nickname: 'bytrustu3'}];

    return (
        <AppLayout>
            <HeadComponent title="내 프로필 | Blog"/>
            <NicknameEditForm />
            <FollowList header="팔로잉 목록" data={followingList}/>
            <FollowList header="팔로워 목록" data={followerList}/>
        </AppLayout>
)
};

export default Profile;