import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';


export default function PageView({ children }) {
  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
}

PageView.propTypes = {
  children: PropTypes.element.isRequired
};
