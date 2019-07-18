import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageView from './PageView';

export default class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <PageView>
        {children}
      </PageView>
    );
  }
}

Page.propTypes = {
  children: PropTypes.element.isRequired
};
