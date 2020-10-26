import React from 'react';
import AppLayout from "../components/AppLayout";
import HeadComponent from "../components/HeadComponent";
import {useSelector} from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    return (
        <AppLayout>
            <HeadComponent title="메인 | Blog"/>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/>)}

        </AppLayout>
    )
}

export default Home;