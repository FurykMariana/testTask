import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlogItemView from './BlogItemView';

export default class BlogItem extends Component {
  render() {
    const {
      user, title, photo, selectBlog, content, id, url
    } = this.props;
    return (
      <BlogItemView
        user={user}
        title={title}
        photo={photo}
        selectBlog={selectBlog}
        content={content}
        id={id}
        url={url}
      />
    );
  }
}

BlogItem.propTypes = {
  user: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  selectBlog: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
