import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../scss/elements/button/button.scss';

export default class Button extends Component {
  render() {
    const { title, buttonClass, handleClick } = this.props;
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`${buttonClass} button`}
      >
        { title }
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
