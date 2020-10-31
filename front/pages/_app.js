import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import withReduxSaga from 'next-redux-saga';
import HeadComponent from '../components/HeadComponent';
import wrapper from '../store/configureStore';

const Sns = ({ Component }) => {
  return (
    <>
      <HeadComponent charSet="utf-8" />
      <Component />
    </>
  );
};

Sns.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(withReduxSaga(Sns));