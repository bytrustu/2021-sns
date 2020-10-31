import React from 'react';
import Head from 'next/head';

const HeadComponent = (props) => (
  <Head>
    {props?.title && <title>{props.title}</title>}
    {props?.charSet && <meta charSet={props.charSet} />}
  </Head>
);

export default HeadComponent;
