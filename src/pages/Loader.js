import React from 'react';

const Loader = ({hide}) => {
  return <div className='container  m-auto p-5 text-center' hidden={hide}><h1>Loading ...</h1></div>;
};

export default Loader;
