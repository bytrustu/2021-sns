import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import HeadComponent from "../components/HeadComponent";
import wrapper from "../store/configureStore";

const Blog = ({Component}) => {
    return (
        <>
            <HeadComponent charSet="utf-8"/>
            <Component/>
        </>
    )
}

Blog.propTypes = {
    Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(Blog);